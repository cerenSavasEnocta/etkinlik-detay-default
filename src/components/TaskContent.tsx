import { useState } from "react";
import { Download, Upload, Check, Save } from "lucide-react";
import { CompletionModal } from "./CompletionModal";

interface TaskContentProps {
  onComplete?: () => void;
}

export function TaskContent({ onComplete }: TaskContentProps) {
  const [showCompletionModal, setShowCompletionModal] =
    useState(false);
  const [notes, setNotes] = useState("");
  const [showFullDescription, setShowFullDescription] =
    useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const isNotesValid = notes.trim().length >= 3;

  const handleSave = () => {
    if (isNotesValid) {
      setIsSaved(true);
      // Kaydetme işlemi burada yapılabilir
    }
  };

  const handleComplete = () => {
    if (isNotesValid) {
      setShowCompletionModal(true);
    }
  };

  const handleModalClose = () => {
    setShowCompletionModal(false);
    setIsSent(true);
    onComplete?.();
  };

  const taskDescription =
    "Kendin için belirlediğin 3 temel değeri belirle. Bunların ne kadarını hangi düzeyde çalıştığın şirkette karşılayabiliyorsun, not et. Yeni karşılaştığın birisine 10 üzerinden güven puanı ver. Bu kişi ile olan ilişkin 2 hafta boyunca gözlemle ve yeniden güven puanı ver. Değişimin nedenlerini analiz et. Ekip içinde güven ortamını güçlendirmek için hangi adımları atabilirsin? Kendi liderlik tarzının güven üzerindeki etkisini değerlendir ve geliştirme alanlarını belirle.";

  return (
    <div
      className="flex justify-center"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div
        className="relative w-full overflow-y-auto"
        style={{
          maxWidth: "1100px",
          backgroundColor: "#fff",
          maxHeight: "77vh",
          marginTop: "24px",
        }}
      >
        {/* Banner */}
        <div className="w-full h-[150px] pt-[16px] pb-[0px] pr-[16px] pl-[16px] relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1762339937486-cc0dabb2a2cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYWJzdHJhY3QlMjBkaWdpdGFsfGVufDF8fHx8MTc2Mjc3MjMzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Görev Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="pt-[20px] pr-[16px] pb-[0px] pl-[16px]">
          {/* File Download Section */}
          <div className="mb-6 flex items-center gap-3 p-4 bg-white border border-gray-200 rounded">
            <div
              className="w-10 h-10 flex items-center justify-center rounded"
              style={{ backgroundColor: "#357E3A" }}
            >
              <span className="text-sm text-[rgb(255,255,255)] font-bold text-[16px]">
                X
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-900">
                Gelecek Bilimde – Yeni teknolojiler, uzay keşfi
                ve yapay zeka üzerine
              </div>
              <div className="text-xs text-gray-500 mt-1">
                2.04 MB
              </div>
            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              style={{ cursor: "pointer" }}
              aria-label="İndir"
            >
              <Download className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Task Description */}
          <div className="mb-6">
            <h3 className="mb-1 text-[14px] font-semibold">
              Görev Açıklaması
            </h3>
            <p
              className="text-gray-700 leading-relaxed"
              style={{
                fontSize: "14px",
                fontWeight: "22px",
                display: showFullDescription
                  ? "block"
                  : "-webkit-box",
                WebkitLineClamp: showFullDescription
                  ? "unset"
                  : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {taskDescription}
            </p>
            <button
              className="text-blue-600 hover:underline inline mt-1"
              style={{ cursor: "pointer", fontSize: "14px" }}
              onClick={() =>
                setShowFullDescription(!showFullDescription)
              }
            >
              {showFullDescription
                ? "Daha Az Göster"
                : "Daha Fazla Göster"}
            </button>
          </div>

          {/* Submissions Section */}
          <div className="mb-6">
            <h3 className="mb-1 text-[14px] font-semibold">
              Gönderdiklerim
            </h3>
            <p className="text-sm text-[rgb(0,0,0)] mb-4">
              Görev ile ilgili dosya ve/veya açıklama ekleyip{" "}
              <span className="font-semibold">GÖNDER</span>{" "}
              düğmesi ile gönderebilirsin.
            </p>

            <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Not ekle"
                className="w-full h-24 bg-transparent border-none outline-none resize-none text-sm text-gray-700"
                style={{ cursor: "text" }}
              />
            </div>

            <div className="w-full flex gap-3" style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                style={{ cursor: "pointer", borderRadius: "2px" }}
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm">DOSYA EKLE</span>
              </button>
              <button
                onClick={handleSave}
                disabled={!isNotesValid || isSaved}
                className="flex items-center gap-2 px-4 py-2 border rounded transition-colors"
                style={{
                  cursor: !isNotesValid || isSaved ? "not-allowed" : "pointer",
                  borderColor: isSaved ? "#000" : "#D1D5DB",
                  backgroundColor: isSaved ? "#000" : !isNotesValid ? "#eeeeee" : "#000",
                  color: isSaved ? "#fff" : !isNotesValid ? "#818181" : "#fff",
                  borderRadius: "2px",
                }}
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm">KAYDEDİLDİ</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span className="text-sm">KAYDET</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Complete Button */}
        <div
          className="absolute left-0 right-0 flex justify-center"
          style={{
            position: "sticky",
            bottom: "16px",
          }}
        >
          <button
            onClick={handleComplete}
            disabled={!isNotesValid || isSent}
            className="px-8 py-3 transition-colors flex items-center gap-2"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              cursor: !isNotesValid || isSent ? "not-allowed" : "pointer",
              borderRadius: "2px",
              opacity: !isNotesValid || isSent ? 0.6 : 1,
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isSent && <Check className="w-5 h-5" />}
            {isSent ? "GÖNDERİLDİ" : "GÖNDER"}
          </button>
        </div>
      </div>

      <CompletionModal
        isOpen={showCompletionModal}
        onClose={handleModalClose}
      />
    </div>
  );
}
