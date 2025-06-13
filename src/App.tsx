import React from 'react';
import Game from './components/Game';
import { GameProvider } from './context/GameContext';
import { Ghost } from 'lucide-react';
import Starfield from './components/Starfield';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-[#1A1A2E] text-white font-orbitron relative overflow-hidden">
        <Starfield />
        <div className="absolute inset-0 pointer-events-none">
          <Ghost 
            className="absolute w-64 h-64 text-purple-500/20 -right-20 -top-20 animate-pulse"
            strokeWidth={1}
          />
          <Ghost 
            className="absolute w-48 h-48 text-blue-500/10 -left-10 bottom-40 animate-pulse"
            strokeWidth={1}
            style={ { animationDelay: '1s' } }
          />
        </div>
        <Game />
      </div>
    </GameProvider>
  );
};

export default App;