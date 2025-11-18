import { useState } from "react";
import { Check } from "lucide-react";
import { CompletionModal } from "./CompletionModal";

interface HtmlContentProps {
  onComplete?: () => void;
}

export function HtmlContent({ onComplete }: HtmlContentProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] =
    useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setShowCompletionModal(true);
    onComplete?.();
  };

  return (
    <div
      className="relative px-6 py-6 flex flex-col items-center"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      {/* HTML İçerik Alanı */}
      <div
        className="overflow-y-scroll bg-white rounded-sm border border-gray-200 p-6"
        style={{ maxHeight: "77vh", maxWidth: "1100px" }}
      >
        <div className="prose max-w-none">
          <h2 className="text-gray-900 mb-4">
            Html başlık stili
          </h2>

          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>Html unordered list stili</li>
            <li>Html unordered list stili</li>
          </ul>

          <ol className="list-decimal pl-5 mb-4 space-y-1">
            <li>Html ordered list stili</li>
            <li>Html ordered list stili</li>
          </ol>

          <p className="mb-4">
            Soldan sağa regular yazı. Soldan sağa regular yazı.
            Soldan sağa regular yazı. Soldan sağa regular yazı.
            Soldan sağa regular yazı. Soldan sağa regular yazı.
            Soldan sağa regular yazı. Soldan sağa regular yazı.
          </p>

          <p className="mb-4">
            <strong>Bold yazı:</strong> Underline yazı
            <br />
            <span className="line-through">
              Line-through yazı
            </span>
          </p>

          <p className="mb-4 uppercase">UPPERCASE YAZI</p>

          <p
            className="mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Yazının font stilini farklı seçilebilir olabilir
          </p>

          <p className="mb-4">
            <span className="bg-gray-200 px-1">
              Çok eğitiyordu
            </span>{" "}
            <span className="text-blue-600">
              farklı bir renk seçili
            </span>
          </p>

          <p className="mb-4">
            <a href="#" className="text-blue-600 underline">
              Bağlı link eklenmiştir
            </a>
          </p>

          <p className="mb-4">
            <a href="#" className="text-blue-600 underline">
              İsteğimize bağlı link underline da yapılabilir
            </a>
          </p>

          <div className="mb-4">
            <img
              src="https://images.unsplash.com/photo-1565665681743-6ff01c5181e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzJTIwdGVhbXdvcmt8ZW58MXx8fHwxNzYyMzUxODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Örnek resim"
              className="w-full max-w-2xl rounded"
            />
          </div>

          <p className="mb-4">
            <a href="#" className="text-blue-600">
              like_.._okuturma.pdf
            </a>
          </p>

          <p className="mb-4">
            <a href="#" className="text-blue-600">
              tasarim_.._odakli_.._dusunmenin_.._asamalari.pdf
            </a>
          </p>

          <p className="mb-4">
            <a href="#" className="text-blue-600">
              amaclar_.._ve_.._araclar.pdf
            </a>
          </p>
        </div>
      </div>

      {/* TAMAMLA Butonu */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleComplete}
          className="bg-black text-white px-6 hover:bg-gray-800 transition-colors flex items-center gap-2"
          style={{
            cursor: "pointer",
            height: "40px",
            borderRadius: "2px",
          }}
        >
          {isCompleted && <Check size={18} />}
          {isCompleted ? "TAMAMLANDI" : "TAMAMLA"}
        </button>
      </div>

      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
      />
    </div>
  );
}