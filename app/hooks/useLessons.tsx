// hooks/useLessons.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dados iniciais dos pergaminhos
  const initialLessons: Lesson[] = [
    {
      id: "1",
      title: "Introdução à Jornada",
      description:
        "Conheça os fundamentos da sua aventura e prepare-se para desvendar os mistérios que aguardam.",
      done: false,
    },
    {
      id: "2",
      title: "As Origens Antigas",
      description:
        "Descubra as lendas e histórias que deram origem a este mundo fascinante.",
      done: false,
    },
    {
      id: "3",
      title: "Os Guardiões do Saber",
      description:
        "Aprenda sobre os protetores do conhecimento e suas responsabilidades.",
      done: false,
    },
    {
      id: "4",
      title: "Artefatos Místicos",
      description:
        "Explore os objetos poderosos que podem alterar o curso da história.",
      done: false,
    },
    {
      id: "5",
      title: "Linguagem dos Símbolos",
      description:
        "Decifre os códigos e sinais que guardam segredos milenares.",
      done: false,
    },
    {
      id: "6",
      title: "O Portal Final",
      description:
        "Prepare-se para o desafio supremo que testará todo o seu conhecimento.",
      done: false,
    },
  ];

  // Carregar lições do AsyncStorage
  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      const storedLessons = await AsyncStorage.getItem("lessons");
      if (storedLessons) {
        setLessons(JSON.parse(storedLessons));
      } else {
        setLessons(initialLessons);
        await AsyncStorage.setItem("lessons", JSON.stringify(initialLessons));
      }
    } catch (error) {
      console.error("Erro ao carregar lições:", error);
      setLessons(initialLessons);
    } finally {
      setIsLoading(false);
    }
  };

  // Alternar estado de conclusão da lição
  const toggleLesson = async (id: string) => {
    const updatedLessons = lessons.map((lesson) =>
      lesson.id === id ? { ...lesson, done: !lesson.done } : lesson
    );

    setLessons(updatedLessons);

    try {
      await AsyncStorage.setItem("lessons", JSON.stringify(updatedLessons));
    } catch (error) {
      console.error("Erro ao salvar lições:", error);
    }
  };

  return {
    lessons,
    isLoading,
    toggleLesson,
  };
};

export default useLessons;
