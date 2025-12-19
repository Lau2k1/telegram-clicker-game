// src/App.tsx
import { useEffect } from 'react';
import { GameScreen } from './components/GameScreen';
import { initTelegram } from './lib/telegram';


function App() {
  useEffect(() => {
    // Инициализируем Telegram WebApp
    initTelegram().catch(console.error);
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>⚔️ Adventure Clicker</h1>
        <p>Собери сокровища и стань легендой!</p>
      </header>
      <GameScreen />
      <footer className="app-footer">
        <p>Тапай быстро, улучшайся, побеждай!</p>
      </footer>
    </div>
  );
}

export default App;