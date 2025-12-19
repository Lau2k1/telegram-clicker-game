// src/components/GameScreen.tsx
// Убираем неиспользуемый импорт
// import { useGameStore } from '../store/gameStore'; // УДАЛИТЬ ЭТУ СТРОКУ
import { ResourceBar } from './ResourceBar';
import { ClickerArea } from './ClickerArea';
import { UpgradePanel } from './UpgradePanel';
import { StatsPanel } from './StatsPanel';

export const GameScreen: React.FC = () => {
  return (
    <div className="game-screen">
      <ResourceBar />
      <ClickerArea />
      <UpgradePanel />
      <StatsPanel />
    </div>
  );
};