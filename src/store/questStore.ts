// src/store/questStore.ts
import { create } from 'zustand';

interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'click' | 'gold' | 'building' | 'level';
  target: number;
  reward: number;
  completed: boolean;
  claimed: boolean;
  progress: number;
}

interface QuestStore {
  quests: Quest[];
  activeQuests: Quest[];
  completedQuests: Quest[];
  updateQuestProgress: (type: string, amount: number) => void;
  claimReward: (questId: string) => void;
}

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'first_click',
    title: 'Первые шаги',
    description: 'Сделай 10 кликов',
    type: 'click',
    target: 10,
    reward: 50,
    completed: false,
    claimed: false,
    progress: 0,
  },
  {
    id: 'first_gold',
    title: 'Накопитель',
    description: 'Собери 100 золота',
    type: 'gold',
    target: 100,
    reward: 100,
    completed: false,
    claimed: false,
    progress: 0,
  },
  {
    id: 'first_building',
    title: 'Инвестор',
    description: 'Купи свою первую шахту',
    type: 'building',
    target: 1,
    reward: 150,
    completed: false,
    claimed: false,
    progress: 0,
  },
  {
    id: 'click_master',
    title: 'Мастер кликов',
    description: 'Сделай 1000 кликов',
    type: 'click',
    target: 1000,
    reward: 500,
    completed: false,
    claimed: false,
    progress: 0,
  },
];




export const useQuestStore = create<QuestStore>((set) => ({
  quests: INITIAL_QUESTS,
  activeQuests: INITIAL_QUESTS.filter(q => !q.completed),
  completedQuests: INITIAL_QUESTS.filter(q => q.completed),
  
  updateQuestProgress: (type, amount) => {
    set((state) => {
      const updatedQuests = state.quests.map((quest) => {
        if (quest.completed || quest.type !== type) return quest;
        
        const newProgress = quest.progress + amount;
        const completed = newProgress >= quest.target;
        
        return {
          ...quest,
          progress: Math.min(newProgress, quest.target),
          completed,
        };
      });
      
      return {
        quests: updatedQuests,
        activeQuests: updatedQuests.filter(q => !q.completed),
        completedQuests: updatedQuests.filter(q => q.completed),
      };
    });
  },
  
  claimReward: (questId) => {
    set((state) => ({
      quests: state.quests.map((quest) =>
        quest.id === questId ? { ...quest, claimed: true } : quest
      ),
    }));
  },
}));