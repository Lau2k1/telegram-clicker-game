// src/components/GameMenu.tsx
import './GameMenu.css';

interface GameMenuProps {
  onSelect: (screen: 'main' | 'buildings' | 'upgrades' | 'stats' | 'quests') => void;
  onClose: () => void;
  currentScreen: string;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onSelect, onClose, currentScreen }) => {
  const menuItems = [
    { id: 'main', icon: '🏠', label: 'Главный экран', disabled: false },
    { id: 'buildings', icon: '🏗️', label: 'Здания', disabled: false },
    { id: 'upgrades', icon: '⚡', label: 'Улучшения', disabled: false },
    { id: 'stats', icon: '📊', label: 'Статистика', disabled: false },
    { id: 'quests', icon: '🎯', label: 'Квесты', disabled: false },
  ];

  return (
    <div className="game-menu-overlay" onClick={onClose}>
      <div className="game-menu" onClick={(e) => e.stopPropagation()}>
        <div className="menu-header">
          <h2 className="menu-title">⚔️ МЕНЮ ИГРЫ</h2>
          <button className="menu-close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="menu-items">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`menu-item ${currentScreen === item.id ? 'active' : ''}`}
              onClick={() => onSelect(item.id as any)}
              disabled={item.disabled}
            >
              <span className="menu-item-icon">{item.icon}</span>
              <span className="menu-item-label">{item.label}</span>
              {currentScreen === item.id && (
                <span className="menu-item-indicator">✓</span>
              )}
            </button>
          ))}
          
          <div className="menu-divider" />
          
          <button className="menu-item">
            <span className="menu-item-icon">⚙️</span>
            <span className="menu-item-label">Настройки</span>
          </button>
          
          <button className="menu-item">
            <span className="menu-item-icon">❓</span>
            <span className="menu-item-label">Помощь</span>
          </button>
        </div>
        
        <div className="menu-footer">
          <button className="menu-close-btn" onClick={onClose}>
            ЗАКРЫТЬ МЕНЮ
          </button>
        </div>
      </div>
    </div>
  );
};