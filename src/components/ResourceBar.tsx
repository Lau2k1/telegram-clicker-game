// src/components/ResourceBar.tsx
import { useGameStore } from '../store/gameStore';

export const ResourceBar: React.FC = () => {
  const { gold } = useGameStore();
  
  return (
    <div className="resource-bar">
      <div className="resource-item">
        <span className="resource-icon">🪙</span>
        <span className="resource-amount">{Math.floor(gold)}</span>
        <span className="resource-name">Золото</span>
      </div>
    </div>
  );
};