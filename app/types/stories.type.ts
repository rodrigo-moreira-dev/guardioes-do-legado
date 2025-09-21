// types/stories.type.ts
export interface StoryState {
  id: number; // 1 a 10
  unlocked: boolean;
  completed: boolean;
  currentStep: number; // 0, 1, 2, ... (depende do número de slides)
}

export const DEFAULT_STORIES_STATE: StoryState[] = [
  { id: 1, unlocked: true, completed: false, currentStep: 0 },
  { id: 2, unlocked: false, completed: false, currentStep: 0 },
  { id: 3, unlocked: false, completed: false, currentStep: 0 },
  { id: 4, unlocked: false, completed: false, currentStep: 0 },
  { id: 5, unlocked: false, completed: false, currentStep: 0 },
  { id: 6, unlocked: false, completed: false, currentStep: 0 },
  { id: 7, unlocked: false, completed: false, currentStep: 0 },
  { id: 8, unlocked: false, completed: false, currentStep: 0 },
  { id: 9, unlocked: false, completed: false, currentStep: 0 },
  { id: 10, unlocked: false, completed: false, currentStep: 0 },
];
