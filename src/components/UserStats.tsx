import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { Plus } from 'lucide-react';
import PaymentModal from './PaymentModal';

const UserStats: React.FC = () => {
  const { gameState, addCoins } = useContext(GameContext);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const totalCurrentBets = gameState.currentBets.reduce((total, bet) => total + bet.amount, 0);

  const handlePaymentSuccess = (coins: number) => {
    addCoins(coins);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <div>
            <h3 className="text-gray-400">Balance</h3>
            <div className="text-2xl font-bold">{gameState.balance} Coins</div>
          </div>
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="ml-2 p-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
            title="Buy Coins"
          >
            <Plus size={20} />
          </button>
        </div>
        <div>
          <h3 className="text-gray-400">Current Bets</h3>
          <div className="text-2xl font-bold">{totalCurrentBets} Coins</div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default UserStats;