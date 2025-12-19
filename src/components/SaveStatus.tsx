// src/components/SaveStatus.tsx
import { useState, useEffect } from 'react';
import { useTelegramStore } from '../store/telegramStore';
import './SaveStatus.css'

export const SaveStatus: React.FC = () => {
  const store = useTelegramStore();
  const { isTelegram } = store; // Теперь правильно
  const [lastSave, setLastSave] = useState<Date>(new Date());
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSave(new Date());
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }, 30000); // Автосохранение каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="save-status">
      <div className="save-info">
        <span className="save-icon">💾</span>
        <span className="save-text">
          {isTelegram ? 'Сохранено в Telegram Cloud' : 'Сохранено локально'}
        </span>
        <span className="save-time">{formatTime(lastSave)}</span>
      </div>
      
      {showNotification && (
        <div className="save-notification">
          ⚡ Игра автосохранена!
        </div>
      )}
      
      <div className="telegram-badge">
        {isTelegram ? '🔗 Telegram' : '🌐 Браузер'}
      </div>
    </div>
  );
};