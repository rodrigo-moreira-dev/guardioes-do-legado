// types/challenges.ts
export interface Challenge {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  unlocked: boolean;
}

export const DEFAULT_CHALLENGES: Challenge[] = [
  {
    id: "1",
    title: "Desafio Matemático",
    description: "Resolva problemas matemáticos básicos",
    completed: false,
    unlocked: true,
  },
  {
    id: "2",
    title: "Quebra-cabeça Lógico",
    description: "Use sua lógica para resolver enigmas",
    completed: false,
    unlocked: false,
  },
  {
    id: "3",
    title: "Desafio de Memória",
    description: "Teste sua capacidade de memorização",
    completed: false,
    unlocked: false,
  },
  {
    id: "4",
    title: "Teste de Velocidade",
    description: "Responda o mais rápido possível",
    completed: false,
    unlocked: false,
  },
  {
    id: "5",
    title: "Desafio Criativo",
    description: "Use sua criatividade para solucionar",
    completed: false,
    unlocked: false,
  },
  {
    id: "6",
    title: "Desafio Estratégico",
    description: "Planeje sua abordagem cuidadosamente",
    completed: false,
    unlocked: false,
  },
  {
    id: "7",
    title: "Desafio de Observação",
    description: "Encontre detalhes escondidos",
    completed: false,
    unlocked: false,
  },
  {
    id: "8",
    title: "Desafio de Raciocínio",
    description: "Pense fora da caixa",
    completed: false,
    unlocked: false,
  },
  {
    id: "9",
    title: "Desafio Colaborativo",
    description: "Trabalhe em equipe virtual",
    completed: false,
    unlocked: false,
  },
  {
    id: "10",
    title: "Desafio Final",
    description: "O teste supremo de todas as habilidades",
    completed: false,
    unlocked: false,
  },
];
