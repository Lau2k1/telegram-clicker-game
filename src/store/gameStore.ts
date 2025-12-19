// src/store/gameStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  gold: number;
  goldPerClick: number;
  totalClicks: number;
  addGold: (amount: number) => void;
  click: () => void;
  upgradeClickPower: () => void;
  reset: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      gold: 10,
      goldPerClick: 1,
      totalClicks: 0,
      
      addGold: (amount) => {
        set((state) => ({ gold: state.gold + amount }));
      },
      
      click: () => {
        const { goldPerClick } = get();
        set((state) => ({
          gold: state.gold + goldPerClick,
          totalClicks: state.totalClicks + 1,
        }));
      },
      
      upgradeClickPower: () => {
        const { gold, goldPerClick } = get();
        const upgradeCost = Math.floor(10 * Math.pow(1.15, goldPerClick));
        
        if (gold >= upgradeCost) {
          set((state) => ({
            gold: state.gold - upgradeCost,
            goldPerClick: state.goldPerClick + 1,
          }));
        }
      },
      
      reset: () => {
        set({ gold: 10, goldPerClick: 1, totalClicks: 0 });
      },
    }),
    {
      name: 'adventure-game-save',
    }
  )
);