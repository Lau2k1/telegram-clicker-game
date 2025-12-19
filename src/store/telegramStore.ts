// src/store/telegramStore.ts - УПРОЩЁННАЯ ВЕРСИЯ
import { create } from 'zustand';

// Определяем тип для Telegram
type TelegramWebApp = {
  CloudStorage?: {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
  };
  expand?: () => void;
};

// Получаем Telegram WebApp безопасно
const getTelegramWebApp = (): TelegramWebApp | null => {
  if (typeof window !== 'undefined') {
    return (window as any).Telegram?.WebApp || null;
  }
  return null;
};

interface TelegramStore {
  isTelegram: boolean;
  saveToCloud: (key: string, data: any) => Promise<void>;
  loadFromCloud: (key: string) => Promise<any>;
  initTelegram: () => void;
}

export const useTelegramStore = create<TelegramStore>((set) => ({
  isTelegram: false,
  
  saveToCloud: async (key: string, data: any) => {
    const tg = getTelegramWebApp();
    if (tg?.CloudStorage) {
      try {
        await tg.CloudStorage.setItem(key, JSON.stringify(data));
        console.log('✅ Сохранено в Telegram Cloud');
      } catch (error) {
        console.error('Telegram Cloud ошибка:', error);
        localStorage.setItem(key, JSON.stringify(data));
      }
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  },
  
  loadFromCloud: async (key: string) => {
    const tg = getTelegramWebApp();
    if (tg?.CloudStorage) {
      try {
        const data = await tg.CloudStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (error) {
        console.error('Telegram Cloud ошибка:', error);
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      }
    } else {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  },
  
  initTelegram: () => {
    const tg = getTelegramWebApp();
    if (tg) {
      tg.expand?.();
      set({ isTelegram: true });
      console.log('📱 Telegram обнаружен');
    }
  },
}));