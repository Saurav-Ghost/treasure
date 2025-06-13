import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import Timer from './Timer';
import NoCoinsModal from './NoCoinsModal';
import { Coins } from 'lucide-react';

const BettingOptions: React.FC = () => {
  const { placeBet, gameState } = useContext(GameContext);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [showNoCoinsModal, setShowNoCoinsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [winningAmount, setWinningAmount] = useState<number | null>(null);

  const bettingOptions = [
    { color: 'Crystal Pink', multiplier: 25, bgColor: 'bg-gradient-to-r from-pink-500 to-purple-500', angle: 0 },
    { color: 'Orange', multiplier: 15, bgColor: 'bg-orange-500', angle: 45 },
    { color: 'Yellow', multiplier: 5, bgColor: 'bg-yellow-500', angle: 90 },
    { color: 'Light Green', multiplier: 5, bgColor: 'bg-green-400', angle: 135 },
    { color: 'Emerald', multiplier: 50, bgColor: 'bg-emerald-500', angle: 180 },
    { color: 'Dark Green', multiplier: 5, bgColor: 'bg-green-800', angle: 225 },
    { color: 'Purple', multiplier: 5, bgColor: 'bg-purple-500', angle: 270 },
    { color: 'Pink', multiplier: 10, bgColor: 'bg-pink-500', angle: 315 },
  ];

  useEffect(() => {
    if (gameState.roundEnded && gameState.currentBets.length > 0) {
      const winningBets = gameState.currentBets.filter(
        bet => bet.color === gameState.winningColor
      );
      
      const totalWin = winningBets.reduce(
        (total, bet) => total + (bet.amount * bet.multiplier),
        0
      );

      if (totalWin > 0) {
        setWinningAmount(totalWin);
        createWinEffects();
        setTimeout(() => setWinningAmount(null), 5000);
      }
    }
  }, [gameState.roundEnded, gameState.winningColor]);

  const createWinEffects = () => {
    const container = document.createElement('div');
    container.className = 'fixed inset-0 pointer-events-none z-50';
    document.body.appendChild(container);

    for (let i = 0; i < 30; i++) {
      const coin = document.createElement('div');
      coin.className = 'absolute';
      coin.innerHTML = `<div class="text-yellow-500 animate-float"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="6" x2="12" y2="12"/><line x1="12" y1="18" x2="12" y2="18"/></svg></div>`;
      
      coin.style.left = `${Math.random() * 100}%`;
      coin.style.top = `${Math.random() * 100}%`;
      coin.style.animationDelay = `${Math.random() * 2}s`;
      
      container.appendChild(coin);
    }

    setTimeout(() => {
      document.body.removeChild(container);
    }, 5000);
  };

  const handleBet = (color: string, multiplier: number) => {
    if (!gameState.isQuickBetPhase && !gameState.roundEnded && betAmount > 0) {
      if (betAmount > gameState.balance) {
        setShowNoCoinsModal(true);
        return;
      }
      placeBet(color, betAmount, multiplier);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {winningAmount && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-winReveal">
          <div className="flex flex-col items-center space-y-2 bg-black/80 rounded-xl p-6 backdrop-blur-sm">
            <Coins className="text-yellow-500 w-12 h-12 animate-bounce" />
            <div className="text-4xl font-bold text-yellow-500">
              +{winningAmount.toLocaleString()} Coins
            </div>
            <div className="text-green-400">Winner!</div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4 mb-12">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Math.max(0, parseInt(e.target.value)))}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg w-32"
          min="0"
          disabled={gameState.isQuickBetPhase || gameState.roundEnded}
        />
        <span className="text-gray-400">Coins</span>
      </div>

      <div className="relative w-[450px] h-[450px]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Timer />
        </div>

        {bettingOptions.map((option, index) => {
          const radius = 180;
          const angle = (index * 360) / bettingOptions.length;
          const angleInRadians = (angle - 90) * (Math.PI / 180);
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);

          const isWinningColor = gameState.isQuickBetPhase && gameState.winningColor === option.color;
          const isCrystalPink = option.color === 'Crystal Pink';
          const hasBet = gameState.currentBets.some(bet => bet.color === option.color);

          return (
            <button
              key={option.color}
              onClick={() => handleBet(option.color, option.multiplier)}
              disabled={gameState.isQuickBetPhase || gameState.roundEnded}
              className={`absolute w-28 h-28 transform -translate-x-1/2 -translate-y-1/2
                ${option.bgColor} text-white rounded-full font-bold transition-all duration-300
                ${isCrystalPink ? 'crystal-pink-glow animate-shine' : ''} 
                ${isWinningColor 
                  ? 'scale-110 animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.5)]' 
                  : gameState.isQuickBetPhase
                  ? 'opacity-40'
                  : 'hover:scale-105 hover:z-10'
                }
                ${hasBet ? 'ring-4 ring-yellow-500 ring-opacity-50' : ''}
              `}
              style={ {
                left: `${x + 225}px`,
                top: `${y + 225}px`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                boxShadow: isWinningColor 
                  ? '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 90px rgba(255, 255, 255, 0.2)'
                  : isCrystalPink
                  ? '0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(236, 72, 153, 0.3)'
                  : '0 0 20px rgba(0, 0, 0, 0.3)',
              } }
            >
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={ { transform: `rotate(-${angle}deg)` } }
              >
                <div className={`text-sm font-bold ${isCrystalPink ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300' : ''}`}>
                  {option.color}
                </div>
                <div className={`text-lg ${isCrystalPink ? 'text-white font-extrabold' : ''}`}>
                  x{option.multiplier}
                </div>
                {hasBet && (
                  <div className="text-xs mt-1 text-yellow-300">
                    Bet Placed
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {gameState.isQuickBetPhase ? (
        <div className="text-center text-red-400 font-bold animate-pulse mt-12">
          Quick Bet Phase! Betting Disabled
        </div>
      ) : gameState.roundEnded ? (
        <div className="text-center text-yellow-400 font-bold mt-12">
          Round Ended - Wait for Next Round
        </div>
      ) : (
        <div className="text-center text-green-400 font-bold mt-12">
          Place Your Bets!
        </div>
      )}

      <NoCoinsModal
        isOpen={showNoCoinsModal}
        onClose={() => setShowNoCoinsModal(false)}
        onBuyCoins={() => {
          setShowNoCoinsModal(false);
          setShowPaymentModal(true);
        } }
      />
    </div>
  );
};

export default BettingOptions;