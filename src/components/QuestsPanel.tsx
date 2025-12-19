// src/components/QuestsPanel.tsx
import { useQuestStore } from '../store/questStore';
import { useGameStore } from '../store/gameStore';
import './QuestsPanel.css';

export const QuestsPanel: React.FC = () => {
  const { activeQuests, completedQuests, claimReward } = useQuestStore();
  const { addGold } = useGameStore();

  const handleClaim = (questId: string, reward: number) => {
    claimReward(questId);
    addGold(reward);
  };

  return (
    <div className="quests-panel">
      <h3>🎯 Квесты</h3>
      
      <div className="quests-section">
        <h4>Активные ({activeQuests.length})</h4>
        {activeQuests.length === 0 ? (
          <p className="no-quests">Все квесты выполнены! Скоро появятся новые.</p>
        ) : (
          activeQuests.map((quest) => (
            <div key={quest.id} className="quest-card active">
              <div className="quest-header">
                <span className="quest-title">{quest.title}</span>
                <span className="quest-reward">+{quest.reward} 🪙</span>
              </div>
              <p className="quest-description">{quest.description}</p>
              <div className="quest-progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${(quest.progress / quest.target) * 100}%` 
                  }}
                />
                <span className="progress-text">
                  {quest.progress}/{quest.target}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="quests-section">
        <h4>Завершённые ({completedQuests.length})</h4>
        {completedQuests
          .filter(q => !q.claimed)
          .map((quest) => (
            <div key={quest.id} className="quest-card completed">
              <div className="quest-header">
                <span className="quest-title">{quest.title} ✅</span>
                <button
                  className="claim-button"
                  onClick={() => handleClaim(quest.id, quest.reward)}
                >
                  Забрать {quest.reward} 🪙
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};