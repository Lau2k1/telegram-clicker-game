// src/store/gameStore.ts - ИСПРАВЛЕННАЯ ВЕРСИЯ
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useTelegramStore } from './telegramStore';
import { useQuestStore } from './questStore';

interface Building {
  id: string;
  name: string;
  level: number;
  baseCost: number;
  baseIncome: number;
  owned: number;
}

interface GameState {
  gold: number;
  goldPerClick: number;
  totalClicks: number;
  lastUpdate: number;
  buildings: Building[];
  addGold: (amount: number) => void;
  click: () => void;
  upgradeClickPower: () => void;
  buyBuilding: (buildingId: string) => void;
  upgradeBuilding: (buildingId: string) => void;
  calculateOfflineEarnings: () => number;
  reset: () => void;
}

const INITIAL_BUILDINGS: Building[] = [
  { id: 'mine', name: '⛏️ Шахта', level: 1, baseCost: 15, baseIncome: 0.1, owned: 0 },
  { id: 'farm', name: '🌾 Ферма', level: 1, baseCost: 100, baseIncome: 1, owned: 0 },
  { id: 'quarry', name: '🏭 Каменоломня', level: 1, baseCost: 500, baseIncome: 5, owned: 0 },
  { id: 'castle', name: '🏰 Замок', level: 1, baseCost: 3000, baseIncome: 30, owned: 0 },
];



export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      gold: 10,
      goldPerClick: 1,
      totalClicks: 0,
      lastUpdate: Date.now(),
      buildings: INITIAL_BUILDINGS,
      
      addGold: (amount) => {
        const questStore = useQuestStore.getState();
        questStore.updateQuestProgress('gold', amount);
        set((state) => ({ gold: state.gold + amount }));
      },
      
      click: () => {
        const questStore = useQuestStore.getState();
        questStore.updateQuestProgress('click', 1);
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
      
      buyBuilding: (buildingId) => {
        const questStore = useQuestStore.getState();
        questStore.updateQuestProgress('building', 1);
        const state = get();
        const building = state.buildings.find(b => b.id === buildingId);
        
        if (!building) return;
        
        const cost = building.baseCost * Math.pow(1.15, building.owned);
        
        if (state.gold >= cost) {
          set((state) => ({
            gold: state.gold - cost,
            buildings: state.buildings.map(b => 
              b.id === buildingId 
                ? { ...b, owned: b.owned + 1 }
                : b
            ),
          }));
        }
      },
      
      upgradeBuilding: (buildingId) => {
        const state = get();
        const building = state.buildings.find(b => b.id === buildingId);
        
        if (!building) return;
        
        const upgradeCost = building.baseCost * 10 * building.level;
        
        if (state.gold >= upgradeCost) {
          set((state) => ({
            gold: state.gold - upgradeCost,
            buildings: state.buildings.map(b => 
              b.id === buildingId 
                ? { ...b, level: b.level + 1 }
                : b
            ),
          }));
        }
      },
      
      calculateOfflineEarnings: () => {
        const state = get();
        const now = Date.now();
        const secondsPassed = (now - state.lastUpdate) / 1000;
        
        const totalPassiveIncome = state.buildings.reduce((sum, building) => {
          return sum + (building.baseIncome * building.level * building.owned);
        }, 0);
        
        return totalPassiveIncome * secondsPassed;
      },
      
      reset: () => {
        set({ 
          gold: 10, 
          goldPerClick: 1, 
          totalClicks: 0,
          lastUpdate: Date.now(),
          buildings: INITIAL_BUILDINGS 
        });
      },
    }),
    {
      name: 'adventure-game-save',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Рассчитываем оффлайн доход при загрузке
          const offlineEarnings = state.calculateOfflineEarnings();
          state.addGold(offlineEarnings);
          state.lastUpdate = Date.now();
          
          // Инициализируем Telegram
          const telegramStore = useTelegramStore.getState();
          telegramStore.initTelegram();
          
          // Автосохранение каждые 30 секунд
          setInterval(() => {
            if (state) {
              const saveData = {
                gold: state.gold,
                goldPerClick: state.goldPerClick,
                totalClicks: state.totalClicks,
                lastUpdate: Date.now(),
                buildings: state.buildings,
              };
              telegramStore.saveToCloud('adventure-game-save', saveData);
            }
          }, 30000);
        }
      },
    }
  )
);