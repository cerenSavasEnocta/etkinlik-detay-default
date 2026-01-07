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
        style={{ maxHeight: "77vh", maxWidth: "1100px", position: "relative" }}
      >
        <div className="prose max-w-none">
          <h2 className="text-gray-900 mb-4">
            Doğru Hedefleri Belirleme ve Uygun Araçları Kullanma
          </h2>

          <p className="mb-4">
          Bu süreç; çalışanlar için ölçülebilir ve sistematik bir güçlendirmeyi amaçlayarak aşağıdaki <strong>yetkinlikleri</strong> hedef alır:
          </p>

          <ul className="list-disc pl-5 mb-4 space-y-1">
            <li>Dikkat</li>
            <li>Algı</li>
            <li>Hafıza</li>
            <li>Analitik Düşünme</li>
            <li>Problem Çözme</li>
            <li>Karar Verme</li>
          </ul>          

          <p className="mb-4">
          Kurumsal öğrenme yaklaşımlarında bilişsel beceriler, yalnızca bireysel gelişimi destekleyen unsurlar olarak değil, aynı zamanda <span className="underline">organizasyonel verimliliği ve rekabet gücünü artıran stratejik bir yatırım</span> alanı olarak ele alınır.
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
              Bilissel_Becerileri_Gelistirme.pdf
            </a>
          </p>

          <p className="mb-4">
            <a href="#" className="text-blue-600">
              Organizasyonel_Verimlilik_ve_Rekabet_Gucu.pdf
            </a>
          </p>
        </div>
      </div>

      {/* TAMAMLA Butonu */}
      <div className="flex justify-end mt-4" style={{ position: "sticky", bottom: "7%", backgroundColor: "#f9f9f9", width: "100%", padding: "16px 0px", justifyContent: "center" }}>
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