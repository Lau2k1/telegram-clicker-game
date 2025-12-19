// src/components/StatsScreen.tsx
import { useGameStore } from '../store/gameStore';
import './StatsScreen.css';

export const StatsScreen: React.FC = () => {
  const { gold, goldPerClick, totalClicks, buildings } = useGameStore();
  
  const totalBuildings = buildings.reduce((sum, b) => sum + b.owned, 0);
  const totalLevels = buildings.reduce((sum, b) => sum + b.level, 0);
  const totalIncome = buildings.reduce((sum, b) => sum + (b.baseIncome * b.level * b.owned), 0);
  const playerLevel = Math.floor(totalClicks / 100) + 1;

  return (
    <div className="stats-screen">
      <header className="screen-header">
        <h1 className="screen-title">📊 Статистика</h1>
        <p className="screen-subtitle">Твои достижения в игре</p>
      </header>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🪙</div>
          <div className="stat-content">
            <div className="stat-value">{Math.floor(gold)}</div>
            <div className="stat-label">Текущее золото</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👆</div>
          <div className="stat-content">
            <div className="stat-value">{totalClicks}</div>
            <div className="stat-label">Всего кликов</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-value">{goldPerClick}</div>
            <div className="stat-label">Сила клика</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{playerLevel}</div>
            <div className="stat-label">Уровень игрока</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏗️</div>
          <div className="stat-content">
            <div className="stat-value">{totalBuildings}</div>
            <div className="stat-label">Всего зданий</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value">{totalLevels}</div>
            <div className="stat-label">Уровни зданий</div>
          </div>
        </div>
        
        <div className="stat-card wide">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">{totalIncome.toFixed(1)}/сек</div>
            <div className="stat-label">Пассивный доход</div>
          </div>
        </div>
        
        <div className="stat-card wide">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">{totalClicks > 0 ? (gold / totalClicks).toFixed(2) : 0}</div>
            <div className="stat-label">Золота за клик (ср.)</div>
          </div>
        </div>
      </div>
    </div>
  );
};