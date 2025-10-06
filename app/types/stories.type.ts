// types/stories.type.ts
export interface StoryState {
  id: number; // 1 a 10
  unlocked: boolean;
  completed: boolean;
  currentStep: number; // 0, 1, 2, ... (depende do número de slides)
  title: string;
}

export const DEFAULT_STORIES_STATE: StoryState[] = [
  {
    id: 1,
    unlocked: true,
    completed: false,
    currentStep: 0,
    title: "A Jornada Inicia",
  },
  {
    id: 2,
    unlocked: false,
    completed: false,
    currentStep: 0,
    title: "O nascimento",
  },
  {
    id: 3,
    unlocked: false,
    completed: false,
    currentStep: 0,
    title: "A Tempestade",
  },
  {
    id: 4,
    unlocked: false,
    completed: false,
    currentStep: 0,
    title: "O crescimento",
  },
  {
    id: 5,
    unlocked: false,
    completed: false,
    currentStep: 0,
    title: "Os espinhos da rosa",
  },
  {
    id: 6,
    unlocked: false,
    completed: false,
    currentStep: 0,
    title: "Uma memória",
  },
  {
    id: 7,
    unlocked: false,
    completed: false,
    currentStep: 0,
    title: "Um ipê desflorido",
  },
  {
    id: 8,
    unlocked: false,
    completed: false,
    currentStep: 0,
    title: "Uma nuvem hostil",
  },
  {
    id: 9,
    unlocked: false,
    completed: false,
    currentStep: 0,
    title: "Uma nuvem amiga",
  },
  {
    id: 10,
    unlocked: false,
    completed: false,
    currentStep: 0,
    title: "O brilho que se doa",
  },
];
