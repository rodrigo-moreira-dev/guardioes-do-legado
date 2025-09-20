// types/challenges.ts
export interface Challenge {
  id: string;
  title: string;
  description: string;
  questionText: string;
  answerOptions: string[];
  correctAnswer: number;
  completed: boolean;
  unlocked: boolean;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  unlocked: boolean;
  challengeId: string;
}

export interface StoryScreen {
  id: string;
  content: React.ReactNode;
}

export const DEFAULT_CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "Desafio Matemático",
    description: "Resolva problemas matemáticos básicos",
    questionText: "Quanto é 8 + 5?",
    answerOptions: ["12", "13", "14", "15"],
    correctAnswer: 1,
    completed: false,
    unlocked: true,
  },
  {
    id: "2",
    title: "Quebra-cabeça Lógico",
    description: "Use sua lógica para resolver enigmas",
    questionText:
      "Se todos os homens são mortais e Sócrates é um homem, então:",
    answerOptions: [
      "Sócrates é imortal",
      "Sócrates é mortal",
      "Sócrates não existe",
      "Nenhuma das alternativas",
    ],
    correctAnswer: 1,
    completed: false,
    unlocked: false,
  },
  // Adicione mais 8 desafios...
];

export const DEFAULT_STORIES: Story[] = [
  {
    id: "1",
    title: "A Jornada Inicia",
    content:
      "Esta é a primeira história que se desbloqueia ao completar o primeiro desafio...",
    unlocked: true,
    challengeId: "1",
  },
  {
    id: "2",
    title: "O Primeiro Obstáculo",
    content: "Com o primeiro desafio superado, uma nova história se revela...",
    unlocked: false,
    challengeId: "2",
  },
  // Adicione mais 8 histórias...
];
