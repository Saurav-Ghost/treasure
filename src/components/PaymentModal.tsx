import React from 'react';
import { X, CreditCard, Star } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (coins: number) => void;
}

const coinPackages = [
  { coins: 1000, price: 10, tag: 'Starter' },
  { coins: 2500, price: 20, tag: 'Basic' },
  { coins: 5000, price: 35, tag: 'Popular' },
  { coins: 10000, price: 60, tag: 'Pro' },
  { coins: 25000, price: 125, tag: 'Elite', highlight: true },
  { coins: 50000, price: 200, tag: 'Ultimate' },
];

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [selectedPackage, setSelectedPackage] = React.useState(coinPackages[0]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful payment
    onPaymentSuccess(selectedPackage.coins);
    setIsProcessing(false);
    onClose();
    
    // Reset form
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const calculateSavings = (coins: number, price: number) => {
    const baseRate = coinPackages[0].price / coinPackages[0].coins;
    const currentRate = price / coins;
    const savings = ((baseRate - currentRate) / baseRate) * 100;
    return Math.round(savings);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Buy Coins</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {coinPackages.map((pkg) => {
            const savings = calculateSavings(pkg.coins, pkg.price);
            return (
              <button
                key={pkg.coins}
                onClick={() => setSelectedPackage(pkg)}
                className={`p-4 rounded-lg border-2 transition-all relative ${
                  selectedPackage.coins === pkg.coins
                    ? 'border-purple-500 bg-purple-500/20'
                    : pkg.highlight
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : 'border-gray-600 hover:border-purple-400'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} />
                    BEST VALUE
                  </div>
                )}
                <div className="text-sm text-gray-400 mb-1">{pkg.tag}</div>
                <div className="text-xl font-bold">{pkg.coins.toLocaleString()} Coins</div>
                <div className="text-gray-400">${pkg.price}</div>
                {savings > 0 && (
                  <div className="text-green-400 text-sm mt-1">Save {savings}%</div>
                )}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Card Number</label>
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                placeholder="4242 4242 4242 4242"
                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
                required
              />
              <CreditCard className="absolute right-3 top-3 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                maxLength={5}
                placeholder="MM/YY"
                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                maxLength={3}
                placeholder="123"
                className="w-full bg-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
              isProcessing
                ? 'bg-purple-500/50 cursor-not-allowed'
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay $${selectedPackage.price}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;