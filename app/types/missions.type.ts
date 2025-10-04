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
    title: "A Visita",
    description:
      "Visitar uma ILP - Instituição de Longa Permanência para Pessoas Idosas.",
    completed: false,
    unlocked: true,
  },
  {
    id: "2",
    title: "A Entrevista",
    description:
      "Entrevistar uma pessoa idosa da própria família ou vizinhança.",
    completed: false,
    unlocked: true,
  },
  {
    id: "3",
    title: "O Mural",
    description: "Criar um mural ou cartaz com frases antietaristas.",
    completed: false,
    unlocked: true,
  },
  {
    id: "4",
    title: "A Ajuda",
    description: "Ajudar uma pessoa idosa com tarefas tecnológicas.",
    completed: false,
    unlocked: true,
  },
  {
    id: "5",
    title: "A Reunião",
    description:
      "Juntar pessoas de diferentes idades para falar sobre respeito, tempo e aprendizado.",
    completed: false,
    unlocked: true,
  },
  {
    id: "6",
    title: "O Presente",
    description:
      "Criar um presente simbólico para uma pessoa idosa da comunidade: algo simples, como uma carta, desenho, poema ou até uma playlist.",
    completed: false,
    unlocked: true,
  },
  {
    id: "7",
    title: "A Vigilância",
    description:
      "Anotar falas ou ações preconceituosas e etaristas que presenciar ou escutar (sem citar nomes).",
    completed: false,
    unlocked: true,
  },
  {
    id: "8",
    title: "A Companhia",
    description:
      "Acompanhar pessoa idosa para uma ida ao mercado, praça ou farmácia, conversando durante o caminho.",
    completed: false,
    unlocked: true,
  },
  {
    id: "9",
    title: "O Respeito",
    description:
      "Criar um “Guia de Respeito” com dicas para conviver com pessoas idosas. Reunir boas práticas em formato simples para família, colegas ou internet.",
    completed: false,
    unlocked: true,
  },
  {
    id: "10",
    title: "A Semente",
    description:
      "Plantar uma semente com o nome de alguém que admira. Associar o cuidado com a natureza ao cuidado com a história e a memória.",
    completed: false,
    unlocked: true,
  },
];
