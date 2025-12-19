// src/components/QuestsScreen.tsx
import { useQuestStore } from '../store/questStore';
import { useGameStore } from '../store/gameStore';
import './QuestsScreen.css';

export const QuestsScreen: React.FC = () => {
  const { activeQuests, completedQuests, claimReward } = useQuestStore();
  const { addGold } = useGameStore();

  const handleClaim = (questId: string, reward: number) => {
    claimReward(questId);
    addGold(reward);
  };

  return (
    <div className="quests-screen">
      <header className="screen-header">
        <h1 className="screen-title">🎯 Квесты</h1>
        <p className="screen-subtitle">Выполняй задания и получай награды!</p>
      </header>
      
      <div className="quests-summary">
        <div className="summary-item">
          <div className="summary-label">Активные</div>
          <div className="summary-value">{activeQuests.length}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Завершённые</div>
          <div className="summary-value">{completedQuests.length}</div>
        </div>
        <div className="summary-item">
          <div className="summary-label">Доступно наград</div>
          <div className="summary-value">
            {completedQuests.filter(q => !q.claimed).length}
          </div>
        </div>
      </div>
      
      {/* Активные квесты */}
      <div className="quests-section">
        <h3 className="section-title">📝 Активные квесты</h3>
        
        {activeQuests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <div className="empty-text">Все квесты выполнены!</div>
            <div className="empty-subtext">Новые появятся скоро</div>
          </div>
        ) : (
          <div className="quests-list">
            {activeQuests.map((quest) => (
              <div key={quest.id} className="quest-card active">
                <div className="quest-header">
                  <div className="quest-title">{quest.title}</div>
                  <div className="quest-reward">+{quest.reward} 🪙</div>
                </div>
                
                <div className="quest-description">{quest.description}</div>
                
                <div className="quest-progress">
                  <div className="progress-info">
                    <span>Прогресс:</span>
                    <span>{quest.progress}/{quest.target}</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Завершённые квесты */}
      {completedQuests.filter(q => !q.claimed).length > 0 && (
        <div className="quests-section">
          <h3 className="section-title">✅ Завершённые квесты</h3>
          
          <div className="quests-list">
            {completedQuests
              .filter(q => !q.claimed)
              .map((quest) => (
                <div key={quest.id} className="quest-card completed">
                  <div className="quest-header">
                    <div className="quest-title">{quest.title}</div>
                    <button
                      className="claim-button"
                      onClick={() => handleClaim(quest.id, quest.reward)}
                    >
                      Забрать {quest.reward} 🪙
                    </button>
                  </div>
                  
                  <div className="quest-description">{quest.description}</div>
                  
                  <div className="quest-status">
                    <span className="status-icon">✅</span>
                    <span className="status-text">Квест выполнен!</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      
      {/* Завершённые и забранные квесты */}
      {completedQuests.filter(q => q.claimed).length > 0 && (
        <div className="quests-section">
          <h3 className="section-title">📚 История квестов</h3>
          
          <div className="quests-list">
            {completedQuests
              .filter(q => q.claimed)
              .map((quest) => (
                <div key={quest.id} className="quest-card claimed">
                  <div className="quest-header">
                    <div className="quest-title">{quest.title}</div>
                    <div className="claimed-badge">✅ Забрано</div>
                  </div>
                  
                  <div className="quest-description">{quest.description}</div>
                  
                  <div className="quest-reward-info">
                    <span>Награда получена:</span>
                    <span className="reward-amount">+{quest.reward} 🪙</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};