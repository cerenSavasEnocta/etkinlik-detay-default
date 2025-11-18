import { useState } from "react";
import bannerImage from "figma:asset/24e9cc97a7b30938d5428ba7d8a8fe3c833f73d8.png";
import { CompletionModal } from "./CompletionModal";
import { Check } from "lucide-react";

interface ELearningContentProps {
  onComplete?: () => void;
}

export function ELearningContent({ onComplete }: ELearningContentProps) {
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleStart = () => {
    setShowCompletionModal(true);
  };

  const handleModalClose = () => {
    setShowCompletionModal(false);
    setIsCompleted(true);
    onComplete?.();
  };

  return (
    <>
      <div
        className="w-full mx-auto px-8 py-8"
        style={{ maxWidth: "1100px", backgroundColor: "#f9f9f9" }}
      >
        {/* Banner */}
        <div
          className="w-full overflow-hidden"
          style={{ height: "150px" }}
        >
          <img
            src="https://images.unsplash.com/photo-1710799885122-428e63eff691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSSUyMFVYJTIwZGVzaWduJTIwaWRlYXRpb258ZW58MXx8fHwxNzYyNzcxMDU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="E-eğitim Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Başla Butonu */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleStart}
            className="px-8 py-2.5 transition-colors flex items-center gap-2"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            {isCompleted && <Check className="w-5 h-5" />}
            {isCompleted ? "TEKRAR AL" : "BAŞLA"}
          </button>
        </div>
      </div>

      <CompletionModal
        isOpen={showCompletionModal}
        onClose={handleModalClose}
      />
    </>
  );
}
