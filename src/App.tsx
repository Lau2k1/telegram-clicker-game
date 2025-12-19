// src/App.tsx
import { useState } from 'react';
import { GameScreen } from './components/GameScreen';
import { GameMenu } from './components/GameMenu';
import { BuildingsScreen } from './components/BuildingsScreen';
import { UpgradesScreen } from './components/UpgradesScreen';
import { StatsScreen } from './components/StatsScreen';
import { QuestsScreen } from './components/QuestsScreen';
import { initTelegram } from './lib/telegram';
import { useEffect } from 'react';
import './App.css';
import { usePassiveIncome } from './hooks/usePassiveIncome';

type Screen = 'main' | 'buildings' | 'upgrades' | 'stats' | 'quests';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   usePassiveIncome()

  useEffect(() => {
    initTelegram().catch(console.error);
  }, []);

  const handleMenuSelect = (screen: Screen) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'buildings':
        return <BuildingsScreen />;
      case 'upgrades':
        return <UpgradesScreen />;
      case 'stats':
        return <StatsScreen />;
      case 'quests':
        return <QuestsScreen />;
      default:
        return <GameScreen />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
      
      {/* Кнопка меню (только на главном экране) */}
      {currentScreen === 'main' && (
        <button 
          className="menu-toggle-button"
          onClick={() => setIsMenuOpen(true)}
        >
          МЕНЮ
        </button>
      )}
      
      {/* Меню */}
      {isMenuOpen && (
        <GameMenu 
          onSelect={handleMenuSelect}
          onClose={() => setIsMenuOpen(false)}
          currentScreen={currentScreen}
        />
      )}
      
      {/* Кнопка назад (на остальных экранах) */}
      {currentScreen !== 'main' && (
        <button 
          className="back-button"
          onClick={() => setCurrentScreen('main')}
        >
          ← Назад
        </button>
      )}
    </div>
  );
}

export default App;