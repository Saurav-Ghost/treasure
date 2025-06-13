import React, { createContext, useState, useEffect } from 'react';

interface Bet {
  color: string;
  amount: number;
  multiplier: number;
}

interface BetHistory {
  roundNumber: number;
  winningColor: string;
  winningMultiplier: number;
  userBets: Bet[];
  outcome: number;
}

interface GameState {
  balance: number;
  currentBets: Bet[];
  timeRemaining: number;
  roundNumber: number;
  roundEnded: boolean;
  winningColor: string;
  winningMultiplier: number;
  betHistory: BetHistory[];
  isQuickBetPhase: boolean;
}

interface GameContextType {
  gameState: GameState;
  placeBet: (color: string, amount: number, multiplier: number) => void;
  addCoins: (amount: number) => void;
}

export const GameContext = createContext<GameContextType>({
  gameState: {
    balance: 1000,
    currentBets: [],
    timeRemaining: 30,
    roundNumber: 1,
    roundEnded: false,
    winningColor: '',
    winningMultiplier: 0,
    betHistory: [],
    isQuickBetPhase: false,
  },
  placeBet: () => {},
  addCoins: () => {},
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    balance: 1000,
    currentBets: [],
    timeRemaining: 30,
    roundNumber: 1,
    roundEnded: false,
    winningColor: '',
    winningMultiplier: 0,
    betHistory: [],
    isQuickBetPhase: false,
  });

  const startNewRound = () => {
    setGameState((prev) => ({
      ...prev,
      currentBets: [],
      timeRemaining: 30,
      roundNumber: prev.roundNumber + 1,
      roundEnded: false,
      winningColor: '',
      winningMultiplier: 0,
      isQuickBetPhase: false,
    }));
  };

  const placeBet = (color: string, amount: number, multiplier: number) => {
    if (amount <= gameState.balance && !gameState.roundEnded) {
      setGameState((prev) => ({
        ...prev,
        balance: prev.balance - amount,
        currentBets: [...prev.currentBets, { color, amount, multiplier }],
      }));
    }
  };

  const addCoins = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameState.timeRemaining > 0) {
      timer = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    } else {
      if (!gameState.roundEnded) {
        const colors = [
          'Crystal Pink',
          'Orange',
          'Yellow',
          'Light Green',
          'Emerald',
          'Dark Green',
          'Purple',
          'Pink'
        ];
        const multipliers = [25, 15, 5, 5, 50, 5, 5, 10];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const winningColor = colors[randomIndex];
        const winningMultiplier = multipliers[randomIndex];
        
        let totalWinnings = 0;
        let totalBets = 0;

        gameState.currentBets.forEach(bet => {
          totalBets += bet.amount;
          if (bet.color === winningColor) {
            totalWinnings += bet.amount * bet.multiplier;
          }
        });

        const outcome = totalWinnings - totalBets;

        const newHistory: BetHistory = {
          roundNumber: gameState.roundNumber,
          winningColor,
          winningMultiplier,
          userBets: gameState.currentBets,
          outcome: totalWinnings
        };

        setGameState((prev) => ({
          ...prev,
          roundEnded: true,
          winningColor,
          winningMultiplier,
          balance: prev.balance + totalWinnings,
          betHistory: [newHistory, ...prev.betHistory].slice(0, 10),
          isQuickBetPhase: true,
          timeRemaining: 5,
        }));
      } else if (gameState.isQuickBetPhase) {
        setTimeout(() => {
          startNewRound();
        }, 0);
      }
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [gameState.timeRemaining]);

  return (
    <GameContext.Provider value={ { gameState, placeBet, addCoins } }>
      {children}
    </GameContext.Provider>
  );
};
  
