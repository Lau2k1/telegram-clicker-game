// src/components/UpgradesScreen.tsx
import { useGameStore } from '../store/gameStore';
import './UpgradesScreen.css';

export const UpgradesScreen: React.FC = () => {
  const { gold, goldPerClick, upgradeClickPower } = useGameStore();
  
  const upgradeCost = Math.floor(10 * Math.pow(1.15, goldPerClick));
  const canUpgrade = gold >= upgradeCost;

  return (
    <div className="upgrades-screen">
      <header className="screen-header">
        <h1 className="screen-title">⚡ Улучшения</h1>
        <p className="screen-subtitle">Усиливай свою мощь клика</p>
      </header>
      
      <div className="current-power">
        <div className="power-label">Текущая сила клика:</div>
        <div className="power-value">+{goldPerClick} золота/клик</div>
      </div>
      
      <div className="upgrades-list">
        <div className="upgrade-card">
          <div className="upgrade-header">
            <div className="upgrade-icon">👊</div>
            <div className="upgrade-info">
              <div className="upgrade-name">Сила удара</div>
              <div className="upgrade-description">
                Увеличивает количество золота за каждый клик
              </div>
            </div>
          </div>
          
          <div className="upgrade-stats">
            <div className="stat-item">
              <span>Текущий бонус:</span>
              <span className="stat-value">+{goldPerClick}/клик</span>
            </div>
            <div className="stat-item">
              <span>Следующий уровень:</span>
              <span className="stat-value">+{goldPerClick + 1}/клик</span>
            </div>
          </div>
          
          <button
            className={`upgrade-button ${canUpgrade ? '' : 'disabled'}`}
            onClick={upgradeClickPower}
            disabled={!canUpgrade}
          >
            <div className="upgrade-cost">🪙 {upgradeCost} золота</div>
            <div className="upgrade-action">Улучшить</div>
          </button>
        </div>
      </div>
    </div>
  );
};