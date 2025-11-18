import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Check } from "lucide-react";

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export function CompletionModal({ isOpen, onClose, onComplete }: CompletionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            Tebrikler! İçeriği başarıyla tamamladınız.
          </DialogTitle>
          <DialogDescription className="sr-only">
            İçerik tamamlandı onay mesajı
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              onComplete?.();
              onClose();
            }}
            className="px-6 py-2 rounded transition-colors"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Tamamla
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
