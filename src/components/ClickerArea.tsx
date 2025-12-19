// src/components/ClickerArea.tsx
import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import './ClickerArea.css';

export const ClickerArea: React.FC = () => {
  const { click, goldPerClick } = useGameStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    click();
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="clicker-area" onClick={handleClick}>
      {/* Анимация клика */}
      {isAnimating && (
        <div
          className="click-animation"
          style={{
            left: `${clickPosition.x}px`,
            top: `${clickPosition.y}px`,
          }}
        >
          +{goldPerClick} 🪙
        </div>
      )}
      
      {/* Основной контент */}
      <div className="clicker-content">
        <div className="clicker-title">Тапай для золота!</div>
        <div className="clicker-instruction">
          Каждый клик: <span className="highlight">+{goldPerClick} золота</span>
        </div>
        <div className="clicker-hint">Нажимай быстро!</div>
      </div>
      
      {/* Декоративные элементы */}
      <div className="decoration coin-1">🪙</div>
      <div className="decoration coin-2">🪙</div>
      <div className="decoration coin-3">🪙</div>
    </div>
  );
};