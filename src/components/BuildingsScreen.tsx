// src/components/BuildingsScreen.tsx
import { useGameStore } from '../store/gameStore';
import './BuildingsScreen.css';

export const BuildingsScreen: React.FC = () => {
  const { gold, buildings, buyBuilding, upgradeBuilding } = useGameStore();
  
  const getBuildingCost = (baseCost: number, owned: number) => {
    return Math.floor(baseCost * Math.pow(1.15, owned));
  };
  
  const getBuildingIncome = (building: any) => {
    return (building.baseIncome * building.level * building.owned).toFixed(1);
  };

  return (
    <div className="buildings-screen">
      <header className="screen-header">
        <h1 className="screen-title">🏗️ Здания</h1>
        <p className="screen-subtitle">Покупай здания для пассивного дохода</p>
      </header>
      
      <div className="total-income">
        <div className="income-label">Общий доход в секунду:</div>
        <div className="income-value">
          +{buildings.reduce((sum, b) => sum + (b.baseIncome * b.level * b.owned), 0).toFixed(1)} 🪙/сек
        </div>
      </div>
      
      <div className="buildings-list">
        {buildings.map((building) => {
          const cost = getBuildingCost(building.baseCost, building.owned);
          const upgradeCost = building.baseCost * 10 * building.level;
          const canBuy = gold >= cost;
          const canUpgrade = gold >= upgradeCost;
          
          return (
            <div key={building.id} className="building-card">
              <div className="building-header">
                <div className="building-icon">{building.name.split(' ')[0]}</div>
                <div className="building-info">
                  <div className="building-name">{building.name.split(' ')[1]}</div>
                  <div className="building-details">
                    Уровень {building.level} × {building.owned} шт.
                  </div>
                </div>
                <div className="building-income">
                  +{getBuildingIncome(building)} 🪙/сек
                </div>
              </div>
              
              <div className="building-actions">
                <button
                  className={`building-action ${canBuy ? '' : 'disabled'}`}
                  onClick={() => buyBuilding(building.id)}
                  disabled={!canBuy}
                >
                  <div className="action-icon">🪙</div>
                  <div className="action-content">
                    <div className="action-title">Купить</div>
                    <div className="action-price">{cost} золота</div>
                  </div>
                </button>
                
                <button
                  className={`building-action upgrade ${canUpgrade ? '' : 'disabled'}`}
                  onClick={() => upgradeBuilding(building.id)}
                  disabled={!canUpgrade}
                >
                  <div className="action-icon">⚡</div>
                  <div className="action-content">
                    <div className="action-title">Улучшить</div>
                    <div className="action-price">{upgradeCost} золота</div>
                  </div>
                </button>
              </div>
              
              <div className="building-progress">
                <div className="progress-label">
                  <span>Прогресс:</span>
                  <span>{building.owned}/10</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${(building.owned / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};