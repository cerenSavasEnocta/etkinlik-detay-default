import { useState } from "react";
import { Check, Clock, Target, Hash } from "lucide-react";
import { CompletionModal } from "./CompletionModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ExamContentProps {
  onComplete?: () => void;
  onShowResult?: () => void;
}

export function ExamContent({ onComplete, onShowResult }: ExamContentProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] =
    useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  const handleStart = () => {
    setShowCompletionModal(true);
  };

  const handleCompletionClose = () => {
    setShowCompletionModal(false);
    setIsCompleted(true);
    onComplete?.();
  };

  const handleShowResult = () => {
    if (onShowResult) {
      onShowResult();
    } else {
      setShowResultModal(true);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#F9F9F9" }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "1100px",
          width: "100%",
          maxHeight: "77vh",
          minHeight: "77vh",
          overflowY: "auto",
          paddingTop: "24px",
        }}
      >
        {/* Banner */}
        <div
          className="w-full relative overflow-hidden"
          style={{
            height: "200px",
            backgroundImage: `url('https://images.unsplash.com/photo-1758685848208-e108b6af94cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGFtJTIwb25saW5lJTIwdGVzdCUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjI4OTA0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Exam Info */}
        <div
          className="p-6 space-y-4"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            margin: "24px 0",
          }}
        >
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <Clock className="w-5 h-5" />
            <span className="text-gray-700">Sınav Süresi</span>
            <span className="ml-auto font-semibold">10dk</span>
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <Target className="w-5 h-5" />
            <span className="text-gray-700">Geçme Notu</span>
            <span className="ml-auto font-semibold">70</span>
          </div>

          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5" />
            <span className="text-gray-700">Soru Sayısı</span>
            <span className="ml-auto font-semibold">20</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 pb-8">
          {!isCompleted ? (
            <button
              onClick={handleStart}
              className="px-8 transition-colors uppercase"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                cursor: "pointer",
                height: "40px",
                borderRadius: "2px",
              }}
            >
              Başla
            </button>
          ) : (
            <>
              <button
                onClick={handleStart}
                className="px-8 py-3 rounded transition-colors uppercase flex items-center gap-2"
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <Check className="w-5 h-5" />
                Tekrar Al
              </button>
              <button
                onClick={handleShowResult}
                className="px-8 py-3 rounded transition-colors uppercase"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "1px solid #000",
                  cursor: "pointer",
                }}
              >
                Sonuç
              </button>
            </>
          )}
        </div>
      </div>

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showCompletionModal}
        onClose={handleCompletionClose}
      />

      {/* Result Modal */}
      <Dialog
        open={showResultModal}
        onOpenChange={setShowResultModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#68D48D",
                }}
              >
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center">
              Yıldızlı Pekiyi!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Bu kadar detaylı test ettiğin için teşekkür ederiz
              💕
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowResultModal(false)}
              className="px-6 py-2 rounded transition-colors"
              style={{
                backgroundColor: "#000",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Tamam
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}