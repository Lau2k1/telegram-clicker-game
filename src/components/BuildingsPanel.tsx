// src/components/BuildingsPanel.tsx
import { useGameStore } from '../store/gameStore';
import './BuildingsPanel.css';

export const BuildingsPanel: React.FC = () => {
  const { gold, buildings, buyBuilding, upgradeBuilding } = useGameStore();
  
  const getBuildingCost = (baseCost: number, owned: number) => {
    return Math.floor(baseCost * Math.pow(1.15, owned));
  };
  
  const getBuildingIncome = (building: any) => {
    return (building.baseIncome * building.level * building.owned).toFixed(1);
  };

  return (
    <div className="buildings-panel">
      <h3>🏗️ Здания</h3>
      <div className="buildings-grid">
        {buildings.map((building) => {
          const cost = getBuildingCost(building.baseCost, building.owned);
          const canBuy = gold >= cost;
          const canUpgrade = gold >= building.baseCost * 10 * building.level;
          
          return (
            <div key={building.id} className="building-card">
              <div className="building-header">
                <span className="building-icon">{building.name.split(' ')[0]}</span>
                <div className="building-info">
                  <div className="building-name">{building.name.split(' ')[1]}</div>
                  <div className="building-stats">
                    Ур. {building.level} × {building.owned} шт.
                  </div>
                </div>
              </div>
              
              <div className="building-income">
                💰 Доход: +{getBuildingIncome(building)}/сек
              </div>
              
              <div className="building-actions">
                <button
                  className={`action-button ${canBuy ? '' : 'disabled'}`}
                  onClick={() => buyBuilding(building.id)}
                  disabled={!canBuy}
                >
                  <div className="action-cost">🪙 {cost}</div>
                  <div className="action-text">Купить</div>
                </button>
                
                <button
                  className={`action-button upgrade ${canUpgrade ? '' : 'disabled'}`}
                  onClick={() => upgradeBuilding(building.id)}
                  disabled={!canUpgrade}
                >
                  <div className="action-cost">⚡ {building.baseCost * 10 * building.level}</div>
                  <div className="action-text">Улучшить</div>
                </button>
              </div>
              
              <div className="building-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${Math.min((building.owned / 10) * 100, 100)}%` 
                  }}
                />
                <span className="progress-text">
                  {building.owned}/10 для автодобычи
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};