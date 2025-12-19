import { ResourceBar } from './ResourceBar';
import { ClickerArea } from './ClickerArea';
import { UpgradePanel } from './UpgradePanel';
import { BuildingsPanel } from './BuildingsPanel';
import { QuestsPanel } from './QuestsPanel';
import { ProgressBars } from './ProgressBars';
import { SaveStatus } from './SaveStatus';
import { StatsPanel } from './StatsPanel';
import './GameScreen.css';

export const GameScreen: React.FC = () => {
  return (
    <div className="game-screen">
      <SaveStatus />
      <ResourceBar />
      <ProgressBars />
      <ClickerArea />
      
      <div className="game-columns">
        <div className="left-column">
          <UpgradePanel />
          <BuildingsPanel />
        </div>
        
        <div className="right-column">
          <QuestsPanel />
          <StatsPanel />
        </div>
      </div>
    </div>
  );
};