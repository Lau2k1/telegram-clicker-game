// src/hooks/usePassiveIncome.ts
import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

export const usePassiveIncome = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const state = useGameStore.getState();
      const buildings = state.buildings;
      
      const totalPassiveIncome = buildings.reduce((sum, building) => {
        return sum + (building.baseIncome * building.level * building.owned);
      }, 0);
      
      if (totalPassiveIncome > 0) {
        state.addGold(totalPassiveIncome / 10); // Каждые 0.1 секунды
      }
    }, 100); // 10 раз в секунду
    
    return () => clearInterval(interval);
  }, []);
};