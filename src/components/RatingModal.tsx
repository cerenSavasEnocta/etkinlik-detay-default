import { useState } from 'react';
import { X, Star } from 'lucide-react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function RatingModal({ isOpen, onClose, onSubmit }: RatingModalProps) {
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleEvaluate = () => {
    setShowRating(true);
  };

  const handleSubmit = () => {
    // Handle rating submission
    console.log('Rating:', rating, 'Comment:', comment);
    if (onSubmit) {
      onSubmit();
    }
    onClose();
    setShowRating(false);
    setRating(0);
    setComment('');
  };

  const handleClose = () => {
    onClose();
    setShowRating(false);
    setRating(0);
    setComment('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 overflow-hidden">
        {!showRating ? (
          <>
            {/* Initial Modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-gray-900">Eğitimi Değerlendir</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-[#ffc845] rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-white" fill="white" />
                </div>
                <h3 className="text-gray-900 mb-2">
                  Eğitimi tamamladın!
                </h3>
                <p className="text-gray-600 text-sm">
                  Eğitimi değerlendirerek diğer kullanıcıların doğru içeriği keşfetmesine yardımcı olabilirsin.
                </p>
              </div>

              <div className="flex flex-row justify-between items-center gap-4 mt-[50px]">
                <button
                  onClick={handleClose}
                  className="p-0 text-gray-900 underline hover:no-underline transition-all text-[14px]"
                >
                  Daha Sonra Değerlendireceğim
                </button>
                <button
                  onClick={handleEvaluate}
                  className="py-2.5 px-4 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors text-[14px]"
                >
                  Eğitimi Değerlendir
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Rating Modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-gray-900">Eğitimi Değerlendir</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-gray-900 mb-3">
                  Eğitimi nasıl buldun?
                </label>
                <div className="flex gap-2 justify-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className="w-10 h-10"
                        fill={(hoveredRating || rating) >= star ? '#ffc845' : 'none'}
                        stroke={(hoveredRating || rating) >= star ? '#ffc845' : '#d1d5db'}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-2">
                  <span>Çok Kötü</span>
                  <span>Mükemmel</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-900 mb-2">
                  Yorumun (Opsiyonel)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Eğitim hakkındaki düşüncelerini paylaş..."
                  className="w-full h-24 px-3 py-2 border border-gray-200 rounded-sm resize-none focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="w-full py-2.5 px-4 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
              >
                Değerlendirmeyi Gönder
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
