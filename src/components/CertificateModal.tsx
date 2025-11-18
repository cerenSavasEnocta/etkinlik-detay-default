import { X } from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ isOpen, onClose }: CertificateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-12">
          {/* Certificate Container */}
          <div className="border-8 border-double border-[#6C42B4] p-12 relative">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#08C472]"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#08C472]"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#08C472]"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#08C472]"></div>

            {/* Certificate Content */}
            <div className="text-center space-y-6">
              {/* Badge Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-[#6C42B4] rounded-full flex items-center justify-center">
                  <span
                    className="material-symbols-rounded text-white"
                    style={{
                      fontSize: "48px",
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    workspace_premium
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl text-[#6C42B4] mb-2">
                  Başarı Sertifikası
                </h1>
                <div className="w-32 h-1 bg-[#08C472] mx-auto"></div>
              </div>

              {/* Presented to */}
              <div className="space-y-4 py-6">
                <p className="text-lg text-gray-600">Bu sertifika</p>
                <h2 className="text-5xl text-gray-900">
                  Dwight Schrute
                </h2>
                <p className="text-lg text-gray-600">adına verilmiştir</p>
              </div>

              {/* Course Details */}
              <div className="space-y-3 py-4">
                <p className="text-xl text-gray-700">
                  <span className="font-semibold">Design Thinking</span> eğitimini
                </p>
                <p className="text-xl text-gray-700">
                  başarıyla tamamladığı için
                </p>
              </div>

              {/* Achievement Stats */}
              <div className="flex justify-center gap-12 py-6">
                <div className="text-center">
                  <div className="text-3xl text-[#6C42B4] mb-1">
                    100
                  </div>
                  <div className="text-sm text-gray-600">Puan</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl text-[#08C472] mb-1">
                    %100
                  </div>
                  <div className="text-sm text-gray-600">Tamamlanma</div>
                </div>
              </div>

              {/* Date */}
              <div className="pt-6">
                <p className="text-gray-600">
                  {new Date().toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>

              {/* Signature Line */}
              <div className="pt-8 flex justify-center gap-24">
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
                  <p className="text-sm text-gray-600">Eğitmen İmzası</p>
                </div>
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
                  <p className="text-sm text-gray-600">Kurum İmzası</p>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="pt-6">
                <p className="text-xs text-gray-400">
                  Sertifika No: DT-2024-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-12 pb-8 flex justify-center gap-4">
          <button className="px-6 py-2.5 bg-[#6C42B4] text-white rounded-sm hover:bg-[#5a3596] transition-colors">
            Sertifikayı İndir
          </button>
          <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors">
            Paylaş
          </button>
        </div>
      </div>
    </div>
  );
}
