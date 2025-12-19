import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export const usePassiveIncome = () => {
  const lastTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    let animationFrameId: number;
    let lastIncomeTime = Date.now();
    
    const updateIncome = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      
      const now = Date.now();
      const timeSinceLastIncome = (now - lastIncomeTime) / 1000; // В секундах
      
      // Начисляем доход каждые 0.1 секунды
      if (timeSinceLastIncome >= 0.1) {
        const state = useGameStore.getState();
        const buildings = state.buildings;
        
        const totalPassiveIncome = buildings.reduce((sum, building) => {
          return sum + (building.baseIncome * building.level * building.owned);
        }, 0);
        
        if (totalPassiveIncome > 0) {
          // Доход за прошедшее время, но не более чем за 0.5 секунды
          const incomeTime = Math.min(timeSinceLastIncome, 0.5);
          const income = totalPassiveIncome * incomeTime;
          
          // Лимит: не более 1000 золота за раз (защита от багов)
          const limitedIncome = Math.min(income, 1000);
          
          if (limitedIncome > 0) {
            state.addGold(limitedIncome);
          }
        }
        
        lastIncomeTime = now;
      }
      
      animationFrameId = requestAnimationFrame(updateIncome);
    };
    
    animationFrameId = requestAnimationFrame(updateIncome);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
};