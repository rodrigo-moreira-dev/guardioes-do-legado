// hooks/useStories.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { DEFAULT_STORIES_STATE, StoryState } from "../types/stories.type";

const STORIES_STORAGE_KEY = "@stories_state";

export const useStories = () => {
  const [storiesState, setStoriesState] = useState<StoryState[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoriesState();
  }, []);

  const loadStoriesState = async () => {
    try {
      const storedState = await AsyncStorage.getItem(STORIES_STORAGE_KEY);
      console.log("Estado armazenado das histórias:", storedState);

      if (storedState) {
        const parsedState = JSON.parse(storedState);
        console.log("Estado parseado das histórias:", parsedState);

        // Verificar se o estado está completo (10 histórias)
        if (parsedState.length !== 10) {
          console.log("Estado incompleto, redefinindo para padrão");
          setStoriesState(DEFAULT_STORIES_STATE);
          await AsyncStorage.setItem(
            STORIES_STORAGE_KEY,
            JSON.stringify(DEFAULT_STORIES_STATE)
          );
        } else {
          setStoriesState(parsedState);
        }
      } else {
        console.log(
          "Usando estado padrão das histórias:",
          DEFAULT_STORIES_STATE
        );
        setStoriesState(DEFAULT_STORIES_STATE);
        await AsyncStorage.setItem(
          STORIES_STORAGE_KEY,
          JSON.stringify(DEFAULT_STORIES_STATE)
        );
      }
    } catch (error) {
      console.error("Erro ao carregar estado das histórias:", error);
      setStoriesState(DEFAULT_STORIES_STATE);
    } finally {
      setLoading(false);
    }
  };

  const updateStoryState = async (
    storyId: number,
    updates: Partial<StoryState>
  ) => {
    try {
      console.log(`Atualizando estado da história ${storyId} com:`, updates);

      // Garantir que todas as histórias existam no estado
      let updatedState = [...storiesState];

      // Se a história não existir, adicioná-la
      if (!updatedState.some((story) => story.id === storyId)) {
        const defaultStory = DEFAULT_STORIES_STATE.find(
          (story) => story.id === storyId
        );
        if (defaultStory) {
          updatedState.push({ ...defaultStory });
        }
      }

      // Atualizar a história
      updatedState = updatedState.map((story) =>
        story.id === storyId ? { ...story, ...updates } : story
      );

      console.log("Novo estado das histórias:", updatedState);
      setStoriesState(updatedState);
      await AsyncStorage.setItem(
        STORIES_STORAGE_KEY,
        JSON.stringify(updatedState)
      );
    } catch (error) {
      console.error("Erro ao atualizar estado da história:", error);
    }
  };

  const unlockStory = async (storyId: number) => {
    console.log(`Desbloqueando história ${storyId}`);
    await updateStoryState(storyId, { unlocked: true });
  };

  const completeStory = async (storyId: number) => {
    console.log(`Marcando história ${storyId} como concluída`);
    await updateStoryState(storyId, { completed: true });
  };

  const setStoryStep = async (storyId: number, step: number) => {
    console.log(`Definindo passo ${step} para história ${storyId}`);
    await updateStoryState(storyId, { currentStep: step });
  };

  const resetStoriesState = async () => {
    console.log("Redefinindo estado das histórias");
    setStoriesState(DEFAULT_STORIES_STATE);
    await AsyncStorage.setItem(
      STORIES_STORAGE_KEY,
      JSON.stringify(DEFAULT_STORIES_STATE)
    );
  };

  // Função para corrigir o estado das histórias
  const fixStoriesState = async () => {
    console.log("Corrigindo estado das histórias");

    // Garantir que todas as histórias de 1 a 10 existam
    let fixedState = [...DEFAULT_STORIES_STATE];

    // Manter os valores personalizados do estado atual
    storiesState.forEach((story) => {
      const index = fixedState.findIndex((s) => s.id === story.id);
      if (index !== -1) {
        fixedState[index] = { ...fixedState[index], ...story };
      }
    });

    console.log("Estado corrigido:", fixedState);
    setStoriesState(fixedState);
    await AsyncStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(fixedState));
  };

  return {
    storiesState,
    loading,
    unlockStory,
    completeStory,
    setStoryStep,
    resetStoriesState,
    fixStoriesState,
  };
};
