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

export interface StorySection {
  type: "text" | "image";
  content: string; // URL da imagem ou texto
  style?: {
    fontSize?: number;
    fontWeight?: "normal" | "bold";
    color?: string;
    textAlign?: "left" | "center" | "right";
    marginBottom?: number;
    marginTop?: number;
    width?: string;
    height?: number;
    resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
    lineHeight?: number;
  };
}

export interface Story {
  id: string;
  title: string;
  preview: string; // Texto curto para exibição na lista
  unlocked: boolean;
  challengeId: string;
  order: number; // Para ordenação de 1 a 10
  sections: StorySection[]; // Conteúdo detalhado com textos e imagens
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
    preview:
      "Esta é a primeira história que se desbloqueia ao completar o primeiro desafio...",
    unlocked: true,
    challengeId: "1",
    order: 1,
    sections: [
      {
        type: "text",
        content:
          "Em uma terra distante, onde a magia ainda florescia, um jovem aventureiro recebia sua primeira missão.",
        style: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#333",
        },
      },
      {
        type: "image",
        content: "https://example.com/images/story1_1.jpg",
        style: {
          width: "100%",
          height: 200,
          resizeMode: "cover",
          marginBottom: 15,
        },
      },
      {
        type: "text",
        content:
          "O desafio matemático que ele acabara de resolver era apenas o começo de uma jornada épica que mudaria seu destino para sempre.",
        style: {
          fontSize: 16,
          lineHeight: 24,
          color: "#555",
        },
      },
    ],
  },
  {
    id: "2",
    title: "O Primeiro Obstáculo",
    preview: "Com o primeiro desafio superado, uma nova história se revela...",
    unlocked: false,
    challengeId: "2",
    order: 2,
    sections: [
      {
        type: "text",
        content:
          "Após resolver o enigma lógico, o caminho adiante se revelou, mas não sem perigos.",
        style: {
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          color: "#333",
        },
      },
      {
        type: "image",
        content: "https://example.com/images/story2_1.jpg",
        style: {
          width: "100%",
          height: 200,
          resizeMode: "cover",
          marginBottom: 15,
        },
      },
      {
        type: "text",
        content:
          "O que parecia ser uma simples porta na verdade guardava segredos ancestrais que apenas os mais perspicazes poderiam decifrar.",
        style: {
          fontSize: 16,
          lineHeight: 24,
          color: "#555",
        },
      },
    ],
  },
  // Adicione mais 8 histórias com order de 3 a 10...
];
