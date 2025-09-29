// import { Challenge } from "./challenges.type";

// export const DEFAULT_MISSIONS: Array<Challenge> = [
//   {
//     id: "1",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
//   {
//     id: "2",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
//   {
//     id: "3",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
//   {
//     id: "4",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
//   {
//     id: "5",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
//   {
//     id: "6",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
//   {
//     id: "7",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
//   {
//     id: "8",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
//   {
//     id: "9",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
//   {
//     id: "10",
//     title: "Desafio Exemplo",
//     description: "Resolva problemas matemáticos básicos",
//     questionText: "Quanto é 8 + 5?",
//     answerOptions: ["13"],
//     correctAnswer: 0,
//     completed: false,
//     unlocked: true,
//   },
// ];

export interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  unlocked: boolean;
}

export const DEFAULT_MISSIONS: Mission[] = [
  {
    id: "1",
    title:
      "Visitar uma ILP - Instituição de Longa Permanência para Pessoas Idosas",
    description:
      "Conversar, ouvir histórias e entregar bilhetes com mensagens positivas.",
    completed: false,
    unlocked: true,
  },
  {
    id: "2",
    title: "Entrevistar uma pessoa idosa da própria família ou vizinhança",
    description:
      "Gravar um pequeno vídeo ou escrever sobre sua história, sonhos ou aprendizados.",
    completed: false,
    unlocked: true,
  },
  {
    id: "3",
    title: "Criar um mural ou cartaz com frases antietaristas",
    description:
      "Identificar frases comuns que reforçam o preconceito e reescrevê-las de forma respeitosa.",
    completed: false,
    unlocked: true,
  },
  {
    id: "4",
    title: "Ajudar uma pessoa idosa com tarefas tecnológicas",
    description:
      "Ensinar a usar o celular, mandar um áudio, criar senha ou navegar com segurança.",
    completed: false,
    unlocked: true,
  },
  {
    id: "5",
    title:
      "Juntar pessoas de diferentes idades para falar sobre respeito, tempo e aprendizado.",
    description: "Alimente 10 animais diferentes",
    completed: false,
    unlocked: true,
  },
  {
    id: "6",
    title: "Criar um presente simbólico para uma pessoa idosa da comunidade",
    description:
      "Fazer algo simples, como uma carta, desenho, poema ou até uma playlist.",
    completed: false,
    unlocked: true,
  },
  {
    id: "7",
    title: "Observar e registrar atitudes etaristas no cotidiano",
    description:
      "Anotar falas ou ações preconceituosas que presenciar ou escutar (sem citar nomes).",
    completed: false,
    unlocked: true,
  },
  {
    id: "8",
    title: "Realizar uma caminhada com uma pessoa idosa",
    description:
      "Acompanhar alguém para uma ida ao mercado, praça ou farmácia, conversando durante o caminho.",
    completed: false,
    unlocked: true,
  },
  {
    id: "9",
    title:
      "Criar um “Guia de Respeito” com dicas para conviver com pessoas idosas",
    description:
      "Reunir boas práticas em formato simples para família, colegas ou internet.",
    completed: false,
    unlocked: true,
  },
  {
    id: "10",
    title: "Plantar uma semente com o nome de alguém que admira",
    description:
      "Associar o cuidado com a natureza ao cuidado com a história e a memória.",
    completed: false,
    unlocked: true,
  },
];
