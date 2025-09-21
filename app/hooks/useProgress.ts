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
  const { unlockStory } = useStories();

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
      const updatedChallenges = challenges.map((challenge) =>
        challenge.id === challengeId
          ? { ...challenge, completed: true }
          : challenge
      );

      // Desbloquear próximo desafio
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

      // Persistir no AsyncStorage
      await AsyncStorage.setItem(
        "challenges",
        JSON.stringify(updatedChallenges)
      );

      // Desbloquear a história correspondente ao desafio
      const storyId = parseInt(challengeId);
      console.log(
        `Desbloqueando história ${storyId} após completar desafio ${challengeId}`
      );
      await unlockStory(storyId);

      // Desbloquear a próxima história se existir
      if (storyId < 10) {
        console.log(`Desbloqueando próxima história ${storyId + 1}`);
        await unlockStory(storyId + 1);
      }

      // Garantir que todas as histórias anteriores estejam desbloqueadas
      for (let i = 1; i < storyId; i++) {
        console.log(`Garantindo que história ${i} está desbloqueada`);
        await unlockStory(i);
      }
    } catch (error) {
      console.error("Erro ao completar desafio:", error);
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
