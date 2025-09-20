// hooks/useProgress.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Challenge,
  DEFAULT_CHALLENGES,
  DEFAULT_STORIES,
  Story,
} from "../types/challenges.type";

interface UseProgressReturn {
  challenges: Challenge[];
  stories: Story[];
  loading: boolean;
  completeChallenge: (challengeId: string, isCorrect: boolean) => Promise<void>;
  resetProgress: () => Promise<void>;
  checkAnswer: (challengeId: string, selectedAnswer: number) => boolean;
}

// hooks/useProgress.ts
// hooks/useProgress.ts
export const useProgress = (): UseProgressReturn => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do AsyncStorage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [savedChallenges, savedStories] = await Promise.all([
        AsyncStorage.getItem("challenges"),
        AsyncStorage.getItem("stories"),
      ]);

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

      if (savedStories) {
        const parsedStories = JSON.parse(savedStories);
        setStories(
          Array.isArray(parsedStories) ? parsedStories : DEFAULT_STORIES
        );
      } else {
        setStories(DEFAULT_STORIES);
        await AsyncStorage.setItem("stories", JSON.stringify(DEFAULT_STORIES));
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setChallenges(DEFAULT_CHALLENGES);
      setStories(DEFAULT_STORIES);
    } finally {
      setLoading(false);
    }
  };

  // Verificar resposta
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

  // Completar desafio e desbloquear história
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

      const updatedStories = stories.map((story) =>
        story.challengeId === challengeId ? { ...story, unlocked: true } : story
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
      setStories(updatedStories);

      // Persistir no AsyncStorage
      await Promise.all([
        AsyncStorage.setItem("challenges", JSON.stringify(updatedChallenges)),
        AsyncStorage.setItem("stories", JSON.stringify(updatedStories)),
      ]);
    } catch (error) {
      console.error("Erro ao completar desafio:", error);
    }
  };

  // Resetar progresso
  const resetProgress = async (): Promise<void> => {
    try {
      setChallenges(DEFAULT_CHALLENGES);
      setStories(DEFAULT_STORIES);

      await Promise.all([
        AsyncStorage.setItem("challenges", JSON.stringify(DEFAULT_CHALLENGES)),
        AsyncStorage.setItem("stories", JSON.stringify(DEFAULT_STORIES)),
      ]);
    } catch (error) {
      console.error("Erro ao resetar progresso:", error);
    }
  };

  // ✅ Retorne todos os valores obrigatórios da interface
  return {
    challenges,
    stories,
    loading,
    completeChallenge,
    resetProgress,
    checkAnswer,
  };
};
