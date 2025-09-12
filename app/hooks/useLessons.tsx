// hooks/useLessons.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

// Chave única para identificar nossa lista no storage
const LESSONS_STORAGE_KEY = "@scrolls_lessons";

export type Lesson = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

// Lista padrão com a estrutura dos seus pergaminhos
const defaultLessons: Array<Lesson> = [
  {
    id: "1",
    title: "Introdução à Alquimia",
    description: "Descubra os segredos da transmutação...",
    done: false,
  },
  {
    id: "2",
    title: "Poções Básicas",
    description: "Aprenda a preparar poções de cura...",
    done: false,
  },
  {
    id: "3",
    title: "Runas Antigas",
    description: "Decifre a linguagem dos antigos...",
    done: false,
  },
];

// Função para salvar lições no AsyncStorage
export const saveLessons = async (lessons: Array<Lesson>) => {
  try {
    const jsonValue = JSON.stringify(lessons);
    await AsyncStorage.setItem(LESSONS_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error("Erro ao salvar lições:", error);
    throw error;
  }
};

// Função para carregar lições do AsyncStorage
export const loadLessons = async (): Promise<Array<Lesson> | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(LESSONS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Erro ao carregar lições:", error);
    throw error;
  }
};

// Hook personalizado para gerenciar o estado das lições
const useLessons = () => {
  const [lessons, setLessons] = useState<Array<Lesson>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega as lições do AsyncStorage quando o hook é inicializado
  useEffect(() => {
    const initializeLessons = async () => {
      try {
        setIsLoading(true);
        const storedLessons = await loadLessons();

        if (storedLessons === null) {
          // Se não houver lições salvas, usa a lista padrão
          setLessons(defaultLessons);
          // Salva a lista padrão no storage para usar da próxima vez
          await saveLessons(defaultLessons);
        } else {
          // Usa as lições salvas
          setLessons(storedLessons);
        }
      } catch (error) {
        console.error("Falha ao carregar lições:", error);
        // Fallback para a lista padrão em caso de erro
        setLessons(defaultLessons);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLessons();
  }, []);

  // Função para toggle do estado "done" de uma lição
  const toggleLesson = async (lessonId: string) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, done: !lesson.done } : lesson
    );

    // Atualiza o estado local imediatamente para resposta rápida da UI
    setLessons(updatedLessons);

    // Persiste a alteração no AsyncStorage (em segundo plano)
    try {
      await saveLessons(updatedLessons);
    } catch (error) {
      console.error("Falha ao salvar alteração:", error);
      // Reverte o estado em caso de erro
      setLessons(lessons);
    }
  };

  // Função para resetar todas as lições para o estado padrão
  const resetLessons = async () => {
    try {
      setLessons(defaultLessons);
      await saveLessons(defaultLessons);
    } catch (error) {
      console.error("Falha ao resetar lições:", error);
    }
  };

  // Retorna o estado e as funções para modificar
  return {
    lessons,
    isLoading,
    toggleLesson,
    resetLessons,
    totalLessons: lessons.length,
    completedLessons: lessons.filter((lesson) => lesson.done).length,
  };
};

export default useLessons;
