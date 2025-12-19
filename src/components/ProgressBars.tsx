// src/components/ProgressBars.tsx
import { useGameStore } from '../store/gameStore';
import './ProgressBars.css';

export const ProgressBars: React.FC = () => {
  const { totalClicks, gold, buildings } = useGameStore();
  
  const totalBuildings = buildings.reduce((sum, b) => sum + b.owned, 0);
  const totalLevels = buildings.reduce((sum, b) => sum + b.level, 0);
  
  const playerLevel = Math.floor(totalClicks / 100 + totalBuildings + totalLevels / 10);
  const levelProgress = ((totalClicks % 100) / 100) * 100;
  
  const nextLevelClicks = 100 - (totalClicks % 100);
  
  return (
    <div className="progress-container">
      <div className="level-display">
        <span className="level-label">Уровень игрока:</span>
        <span className="level-value">🌟 {playerLevel}</span>
      </div>
      
      <div className="progress-item">
        <div className="progress-label">
          <span>До следующего уровня:</span>
          <span>{nextLevelClicks} кликов</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar level" 
            style={{ width: `${levelProgress}%` }}
          >
            <span className="progress-text">{levelProgress.toFixed(0)}%</span>
          </div>
        </div>
      </div>
      
      <div className="progress-item">
        <div className="progress-label">
          <span>Прогресс по зданиям:</span>
          <span>{totalBuildings}/40</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar buildings" 
            style={{ width: `${(totalBuildings / 40) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🪙</div>
          <div className="stat-info">
            <div className="stat-value">{Math.floor(gold)}</div>
            <div className="stat-label">Всего золота</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👆</div>
          <div className="stat-info">
            <div className="stat-value">{totalClicks}</div>
            <div className="stat-label">Всего кликов</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏗️</div>
          <div className="stat-info">
            <div className="stat-value">{totalBuildings}</div>
            <div className="stat-label">Здания</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <div className="stat-value">{totalLevels}</div>
            <div className="stat-label">Уровни</div>
          </div>
        </div>
      </div>
    </div>
  );
};