// src/components/StatsPanel.tsx
import { useGameStore } from '../store/gameStore';

export const StatsPanel: React.FC = () => {
  const { totalClicks, gold, goldPerClick } = useGameStore();
  
  return (
    <div className="stats-panel">
      <h3>📊 Статистика</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Всего кликов:</div>
          <div className="stat-value">{totalClicks}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Золота добыто:</div>
          <div className="stat-value">{Math.floor(gold)}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Сила клика:</div>
          <div className="stat-value">{goldPerClick}/клик</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">КПД:</div>
          <div className="stat-value">
            {totalClicks > 0 
              ? ((gold / totalClicks) * goldPerClick).toFixed(1)
              : '0'
            }
          </div>
        </div>
      </div>
    </div>
  );
};