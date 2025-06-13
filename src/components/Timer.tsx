import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { Clock, Zap } from 'lucide-react';

const Timer: React.FC = () => {
  const { gameState } = useContext(GameContext);

  return (
    <div className={`relative w-36 h-36 transform transition-all duration-500 ${
      gameState.isQuickBetPhase ? 'scale-110' : 'hover:scale-105'
    }`}>
      {/* Background circle with gradient border */}
      <div className={`absolute inset-0 rounded-full ${
        gameState.isQuickBetPhase 
          ? 'bg-gradient-to-r from-red-500 to-orange-500' 
          : 'bg-gradient-to-r from-purple-500 to-blue-500'
      } p-[2px]`}>
        <div className="w-full h-full rounded-full bg-gray-800/90 backdrop-blur-sm flex flex-col items-center justify-center">
          {/* Icon */}
          <div className={`mb-1 ${gameState.isQuickBetPhase ? 'text-red-400' : 'text-purple-400'}`}>
            {gameState.isQuickBetPhase ? (
              <Zap className="w-6 h-6 animate-pulse" />
            ) : (
              <Clock className="w-6 h-6" />
            )}
          </div>

          {/* Timer text */}
          <h2 className={`text-sm font-bold mb-1 transition-colors ${
            gameState.isQuickBetPhase ? 'text-red-400' : 'text-purple-400'
          }`}>
            {gameState.isQuickBetPhase ? 'Quick Bet!' : 'Time Left'}
          </h2>

          {/* Countdown number */}
          <div className={`text-4xl font-bold transition-all ${
            gameState.isQuickBetPhase 
              ? 'text-red-400 scale-110 animate-pulse' 
              : 'text-yellow-400'
          }`}>
            {gameState.timeRemaining}s
          </div>
        </div>
      </div>

      {/* Animated ring for quick bet phase */}
      {gameState.isQuickBetPhase && (
        <div className="absolute -inset-2 rounded-full border-2 border-red-500/30 animate-ping" />
      )}
    </div>
  );
};

export default Timer;