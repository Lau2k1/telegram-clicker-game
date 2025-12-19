// src/components/UpgradePanel.tsx
import { useGameStore } from '../store/gameStore';

export const UpgradePanel: React.FC = () => {
  const { gold, goldPerClick, upgradeClickPower } = useGameStore();
  
  const calculateUpgradeCost = () => {
    return Math.floor(10 * Math.pow(1.15, goldPerClick));
  };
  
  const upgradeCost = calculateUpgradeCost();
  const canUpgrade = gold >= upgradeCost;
  
  return (
    <div className="upgrade-panel">
      <h3>Улучшения</h3>
      <div className="upgrade-item">
        <div className="upgrade-info">
          <div className="upgrade-title">Сила удара</div>
          <div className="upgrade-description">
            Увеличивает золото за клик
          </div>
          <div className="upgrade-stats">
            Текущая: <span className="highlight">+{goldPerClick}</span> за клик
          </div>
        </div>
        <button
          className={`upgrade-button ${canUpgrade ? '' : 'disabled'}`}
          onClick={upgradeClickPower}
          disabled={!canUpgrade}
        >
          <div className="upgrade-cost">
            🪙 {upgradeCost} золота
          </div>
          <div className="upgrade-action">
            Улучшить → {goldPerClick + 1}/клик
          </div>
        </button>
      </div>
    </div>
  );
};