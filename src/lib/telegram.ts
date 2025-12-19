// src/lib/telegram.ts
import { init, backButton, viewport } from '@tma.js/sdk';

export const initTelegram = async () => {
  try {
    await init();
    
    // Исправляем работу с backButton
    backButton.onClick( () => {
      window.history.back();
    });
    
    // Показываем/скрываем кнопку в зависимости от истории
    if (window.history.length > 1) {
      backButton.show();
    } else {
      backButton.hide();
    }
    
    // Слушаем изменения истории
    window.addEventListener('popstate', () => {
      if (window.history.length > 1) {
        backButton.show();
      } else {
        backButton.hide();
      }
    });
    
    // Расширяем на весь экран
    viewport.expand();
    
    console.log('Telegram WebApp инициализирован');
  } catch (error) {
    console.error('Ошибка инициализации Telegram:', error);
    // В браузере просто продолжаем работу
  }
};