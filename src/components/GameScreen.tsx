// src/components/GameScreen.tsx
import { useGameStore } from "../store/gameStore";
import { ClickerArea } from "./ClickerArea";
import "./GameScreen.css";

export const GameScreen: React.FC = () => {
  const { gold, goldPerClick, totalClicks } = useGameStore();

  const playerLevel = Math.floor(totalClicks / 100) + 1;
  const levelProgress = ((totalClicks % 100) / 100) * 100;

  return (
    <div className="game-screen">
      {/* Заголовок по центру */}
      <header className="game-header">
        <h1 className="game-title">⚔️ Adventure Clicker</h1>
        <p className="game-subtitle">Собери сокровища и стань легендой!</p>
      </header>
      {/* Ресурсы */}
      <div className="resources-panel">
        <div className="resource-item">
          <span className="resource-icon">🪙</span>
          <div className="resource-info">
            <div className="resource-amount">{Math.floor(gold)}</div>
            <div className="resource-name">Золото</div>
          </div>
        </div>

        <div className="resource-item">
          <span className="resource-icon">⭐</span>
          <div className="resource-info">
            <div className="resource-amount">{playerLevel}</div>
            <div className="resource-name">Уровень</div>
          </div>
        </div>
      </div>
      {/* Прогресс-бар уровня */}
      <div className="level-progress">
        <div className="progress-info">
          <span>До следующего уровня:</span>
          <span>{100 - (totalClicks % 100)} кликов</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${levelProgress}%` }}>
            <span className="progress-text">{Math.floor(levelProgress)}%</span>
          </div>
        </div>
      </div>
      {/* Кликер */}
      // В GameScreen.tsx внутри return
      <div className="clicker-container">
        <ClickerArea />
      </div>
      {/* Быстрая статистика */}
      <div className="quick-stats">
        <div className="quick-stat">
          <div className="quick-stat-icon">👆</div>
          <div className="quick-stat-value">{totalClicks}</div>
          <div className="quick-stat-label">Кликов</div>
        </div>
        <div className="quick-stat">
          <div className="quick-stat-icon">🏗️</div>
          <div className="quick-stat-value">
            {useGameStore
              .getState()
              .buildings.reduce((sum, b) => sum + b.owned, 0)}
          </div>
          <div className="quick-stat-label">Зданий</div>
        </div>
      </div>
    </div>
  );
};
