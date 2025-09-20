// hooks/useChallenges.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Challenge, DEFAULT_CHALLENGES } from "../types/challenges.type";

interface UseChallengesReturn {
  challenges: Challenge[];
  loading: boolean;
  toggleChallenge: (id: string) => Promise<void>;
  unlockNextChallenge: () => void;
  resetProgress: () => Promise<void>;
}

export const useChallenges = (): UseChallengesReturn => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar desafios do AsyncStorage
  useEffect(() => {
    loadChallenges();
  }, []);

  const loadChallenges = async () => {
    try {
      const storedChallenges = await AsyncStorage.getItem("challenges");

      if (storedChallenges) {
        setChallenges(JSON.parse(storedChallenges));
      } else {
        // Se não existir, usar os desafios padrão
        setChallenges(DEFAULT_CHALLENGES);
        await AsyncStorage.setItem(
          "challenges",
          JSON.stringify(DEFAULT_CHALLENGES)
        );
      }
    } catch (error) {
      console.error("Erro ao carregar desafios:", error);
      setChallenges(DEFAULT_CHALLENGES);
    } finally {
      setLoading(false);
    }
  };

  // Alternar estado de conclusão do desafio
  const toggleChallenge = async (id: string) => {
    const updatedChallenges = challenges.map((challenge) =>
      challenge.id === id
        ? { ...challenge, completed: !challenge.completed }
        : challenge
    );

    setChallenges(updatedChallenges);

    try {
      await AsyncStorage.setItem(
        "challenges",
        JSON.stringify(updatedChallenges)
      );
    } catch (error) {
      console.error("Erro ao salvar desafios:", error);
    }
  };

  // Desbloquear próximo desafio
  const unlockNextChallenge = () => {
    const nextChallengeIndex = challenges.findIndex(
      (challenge) => !challenge.unlocked && !challenge.completed
    );

    if (nextChallengeIndex !== -1) {
      const updatedChallenges = challenges.map((challenge, index) =>
        index === nextChallengeIndex
          ? { ...challenge, unlocked: true }
          : challenge
      );

      setChallenges(updatedChallenges);

      // Salvar no AsyncStorage
      AsyncStorage.setItem("challenges", JSON.stringify(updatedChallenges));
    }
  };

  // Resetar progresso
  const resetProgress = async () => {
    setChallenges(DEFAULT_CHALLENGES);
    try {
      await AsyncStorage.setItem(
        "challenges",
        JSON.stringify(DEFAULT_CHALLENGES)
      );
    } catch (error) {
      console.error("Erro ao resetar progresso:", error);
    }
  };

  return {
    challenges,
    loading,
    toggleChallenge,
    unlockNextChallenge,
    resetProgress,
  };
};
