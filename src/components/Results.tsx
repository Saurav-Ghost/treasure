import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { Trophy, History, TrendingUp, TrendingDown } from 'lucide-react';

const getBgColorClass = (color: string) => {
  const colorMap: { [key: string]: string } = {
    'Emerald': 'bg-emerald-500',
    'Orange': 'bg-orange-500',
    'Yellow': 'bg-yellow-500',
    'Light Green': 'bg-green-400',
    'Crystal Pink': 'bg-gradient-to-r from-pink-500 to-purple-500',
    'Dark Green': 'bg-green-800',
    'Purple': 'bg-purple-500',
    'Pink': 'bg-pink-500',
  };
  return colorMap[color] || 'bg-gray-500';
};

const Results: React.FC = () => {
  const { gameState } = useContext(GameContext);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="text-yellow-500" />
          <h2 className="text-xl font-bold">Current Round</h2>
        </div>

        {gameState.roundEnded ? (
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getBgColorClass(gameState.winningColor)} mb-4 winner-highlight`}>
              <div className="text-center">
                <div className="text-sm font-bold">{gameState.winningColor}</div>
                <div className="text-2xl font-bold">x{gameState.winningMultiplier}</div>
              </div>
            </div>
            <div className="text-xl font-bold mb-2">Winner!</div>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            Waiting for round to end...
          </div>
        )}
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <History className="text-purple-400" />
          <h2 className="text-xl font-bold">History</h2>
        </div>

        <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
          {gameState.betHistory.map((history, index) => (
            <div
              key={index}
              className="bg-gray-700/50 rounded-lg p-4 animate-fadeIn"
              style={ { animationDelay: `${index * 0.1}s` } }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full ${getBgColorClass(history.winningColor)} flex items-center justify-center text-xs font-bold`}>
                    x{history.winningMultiplier}
                  </div>
                  <span className="font-bold">{history.winningColor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {history.outcome > 0 ? (
                    <>
                      <TrendingUp className="text-green-400 w-4 h-4" />
                      <span className="text-green-400 font-bold">+{history.outcome.toLocaleString()}</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="text-red-400 w-4 h-4" />
                      <span className="text-red-400 font-bold">{history.outcome.toLocaleString()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {gameState.betHistory.length === 0 && (
            <div className="text-center text-gray-400">
              No betting history yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;