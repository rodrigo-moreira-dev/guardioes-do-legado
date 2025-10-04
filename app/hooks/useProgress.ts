// hooks/useProgress.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Challenge, DEFAULT_CHALLENGES } from "../types/challenges.type";
import { useStories } from "./useStories";

interface UseProgressReturn {
  challenges: Challenge[];
  loading: boolean;
  completeChallenge: (challengeId: string, isCorrect: boolean) => Promise<void>;
  resetProgress: () => Promise<void>;
  checkAnswer: (challengeId: string, selectedAnswer: number) => boolean;
}

export const useProgress = (): UseProgressReturn => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const { unlockStory, debugState } = useStories(); // Adicione debugState para verificação

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedChallenges = await AsyncStorage.getItem("challenges");

      if (savedChallenges) {
        const parsedChallenges = JSON.parse(savedChallenges);
        setChallenges(
          Array.isArray(parsedChallenges)
            ? parsedChallenges
            : DEFAULT_CHALLENGES
        );
      } else {
        setChallenges(DEFAULT_CHALLENGES);
        await AsyncStorage.setItem(
          "challenges",
          JSON.stringify(DEFAULT_CHALLENGES)
        );
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setChallenges(DEFAULT_CHALLENGES);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (
    challengeId: string,
    selectedAnswer: number
  ): boolean => {
    if (!challenges || !Array.isArray(challenges)) return false;

    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return false;

    if (typeof challenge.correctAnswer !== "number") return false;

    if (
      !challenge.answerOptions ||
      selectedAnswer < 0 ||
      selectedAnswer >= challenge.answerOptions.length
    ) {
      return false;
    }

    return selectedAnswer === challenge.correctAnswer;
  };

  const completeChallenge = async (
    challengeId: string,
    isCorrect: boolean
  ): Promise<void> => {
    if (!isCorrect) return;

    try {
      // ✅ PRIMEIRO: Atualizar apenas o desafio atual
      const updatedChallenges = challenges.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, completed: true }
          : challenge
      );

      // ✅ SEGUNDO: Desbloquear próximo desafio (se existir)
      const nextChallengeIndex = updatedChallenges.findIndex(
        (challenge) => !challenge.unlocked && !challenge.completed
      );

      if (nextChallengeIndex !== -1) {
        updatedChallenges[nextChallengeIndex] = {
          ...updatedChallenges[nextChallengeIndex],
          unlocked: true,
        };
      }

      setChallenges(updatedChallenges);

      // ✅ TERCEIRO: Persistir desafios
      await AsyncStorage.setItem(
        "challenges",
        JSON.stringify(updatedChallenges)
      );

      // ✅ QUARTO: Desbloquear a história correspondente
      const storyId = parseInt(challengeId);

      // ✅ VERIFICAÇÃO DE SEGURANÇA: Debug antes de desbloquear
      debugState?.();

      // ✅ Desbloquear APENAS a história correspondente
      await unlockStory(storyId);
    } catch (error) {
      console.error("❌ Erro ao completar desafio:", error);
    }
  };

  const resetProgress = async (): Promise<void> => {
    try {
      setChallenges(DEFAULT_CHALLENGES);
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
    completeChallenge,
    resetProgress,
    checkAnswer,
  };
};
