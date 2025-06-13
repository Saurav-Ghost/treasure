import React from 'react';
import { X, Coins } from 'lucide-react';

interface NoCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyCoins: () => void;
}

const NoCoinsModal: React.FC<NoCoinsModalProps> = ({ isOpen, onClose, onBuyCoins }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="mb-4 inline-block p-3 bg-yellow-500/20 rounded-full">
            <Coins size={32} className="text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Insufficient Coins</h2>
          <p className="text-gray-400 mb-6">
            You don't have enough coins to place this bet. Add more coins to continue playing!
          </p>
          <button
            onClick={onBuyCoins}
            className="w-full py-4 rounded-lg font-bold text-lg bg-purple-500 hover:bg-purple-600 transition-all"
          >
            Buy Coins
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoCoinsModal;