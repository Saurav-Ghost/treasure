import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import BettingOptions from './BettingOptions';
import Results from './Results';
import UserStats from './UserStats';

const Game: React.FC = () => {
  const { gameState } = useContext(GameContext);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-8 relative">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient">
          Ghost Treasure
        </span>
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg opacity-30 blur-xl -z-10"></div>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <UserStats />
          <div className="relative h-[600px] glass-panel rounded-xl backdrop-blur-sm">
            <div className="absolute inset-0">
              <BettingOptions />
            </div>
          </div>
        </div>
        <Results />
      </div>
    </div>
  );
};

export default Game;
