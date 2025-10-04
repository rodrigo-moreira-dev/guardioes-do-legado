// hooks/useStories.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { DEFAULT_STORIES_STATE, StoryState } from "../types/stories.type";

const STORIES_STORAGE_KEY = "@stories_state";

export const useStories = () => {
  const [storiesState, setStoriesState] = useState<StoryState[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    loadStoriesState();
  }, []);

  const loadStoriesState = async () => {
    try {
      const storedState = await AsyncStorage.getItem(STORIES_STORAGE_KEY);

      if (storedState) {
        const parsedState = JSON.parse(storedState);

        // ✅ CORREÇÃO: Usar estado armazenado diretamente
        if (Array.isArray(parsedState) && parsedState.length === 10) {
          setStoriesState(parsedState);
        } else {
          setStoriesState(DEFAULT_STORIES_STATE);
          await AsyncStorage.setItem(
            STORIES_STORAGE_KEY,
            JSON.stringify(DEFAULT_STORIES_STATE)
          );
        }
      } else {
        setStoriesState(DEFAULT_STORIES_STATE);
        await AsyncStorage.setItem(
          STORIES_STORAGE_KEY,
          JSON.stringify(DEFAULT_STORIES_STATE)
        );
      }
    } catch (error) {
      console.error("❌ Erro ao carregar estado das histórias:", error);
      setStoriesState(DEFAULT_STORIES_STATE);
      console.log("storiesState", storiesState);
    } finally {
      setLoading(false);
    }
  };

  const updateStoryState = async (
    storyId: number,
    updates: Partial<StoryState>
  ) => {
    try {
      // ✅ SEMPRE ler o estado mais recente do AsyncStorage
      const storedState = await AsyncStorage.getItem(STORIES_STORAGE_KEY);
      let currentState: StoryState[] = DEFAULT_STORIES_STATE;

      if (storedState) {
        const parsed = JSON.parse(storedState);
        if (Array.isArray(parsed) && parsed.length === 10) {
          currentState = parsed;
        }
      }

      // Atualizar a história específica
      const updatedState = currentState.map((story) =>
        story.id === storyId ? { ...story, ...updates } : story
      );

      // Salvar de volta
      await AsyncStorage.setItem(
        STORIES_STORAGE_KEY,
        JSON.stringify(updatedState)
      );

      // Atualizar o estado em memória
      setStoriesState(updatedState);
      setRefreshTrigger((prev) => prev + 1);

      console.log(`✅ História ${storyId} atualizada com sucesso`);
    } catch (error) {
      console.error("❌ Erro ao atualizar estado da história:", error);
    }
  };
  const unlockStory = async (storyId: number) => {
    console.log(`🔓 Desbloqueando história ${storyId}`);

    // ✅ Verificar estado atual antes de desbloquear
    const currentStory = storiesState.find((s) => s.id === storyId);
    console.log(`📊 Estado atual da história ${storyId}:`, currentStory);

    await updateStoryState(storyId, { unlocked: true });

    // ✅ Verificar estado após desbloquear
    const updatedStory = storiesState.find((s) => s.id === storyId);
    console.log(`📊 Estado após desbloquear ${storyId}:`, updatedStory);
  };

  const completeStory = async (storyId: number) => {
    console.log(`✅ Marcando história ${storyId} como concluída`);
    await updateStoryState(storyId, { completed: true });
  };

  const setStoryStep = async (storyId: number, step: number) => {
    console.log(`📖 Definindo passo ${step} para história ${storyId}`);
    await updateStoryState(storyId, { currentStep: step });
  };

  const resetStoriesState = async () => {
    console.log("🔄 Redefinindo estado das histórias");
    setStoriesState(DEFAULT_STORIES_STATE);
    await AsyncStorage.setItem(
      STORIES_STORAGE_KEY,
      JSON.stringify(DEFAULT_STORIES_STATE)
    );
    setRefreshTrigger((prev) => prev + 1);
  };

  const refreshStoriesState = async () => {
    console.log("🔄 Recarregando estado das histórias");
    await loadStoriesState();
    setRefreshTrigger((prev) => prev + 1);
  };

  // ✅ NOVA FUNÇÃO: Verificar integridade do progresso
  const verifyProgressIntegrity = () => {
    console.log("🔍 VERIFICAÇÃO DE INTEGRIDADE DO PROGRESSO:");

    const completedStories = storiesState.filter((s) => s.completed);
    const unlockedStories = storiesState.filter((s) => s.unlocked);

    console.log(
      `📊 ${completedStories.length} histórias concluídas:`,
      completedStories.map((s) => s.id)
    );
    console.log(
      `📊 ${unlockedStories.length} histórias desbloqueadas:`,
      unlockedStories.map((s) => s.id)
    );

    // Verificar se há histórias completed mas não unlocked (inconsistência)
    const inconsistentStories = storiesState.filter(
      (s) => s.completed && !s.unlocked
    );

    if (inconsistentStories.length > 0) {
      console.error(
        "🚨 Histórias inconsistentes (completed mas não unlocked):",
        inconsistentStories
      );
    }

    return {
      total: storiesState.length,
      completed: completedStories.length,
      unlocked: unlockedStories.length,
      inconsistent: inconsistentStories.length,
    };
  };

  const debugState = () => {
    console.log("🐛 DEBUG - Estado atual das histórias:", storiesState);
    storiesState.forEach((story) => {
      console.log(`📖 História ${story.id}:`, {
        unlocked: story.unlocked,
        completed: story.completed,
        currentStep: story.currentStep,
      });
    });
    verifyProgressIntegrity();
  };

  return {
    storiesState,
    loading,
    refreshTrigger,
    unlockStory,
    completeStory,
    setStoryStep,
    resetStoriesState,
    refreshStoriesState,
    debugState,
    verifyProgressIntegrity,
  };
};
