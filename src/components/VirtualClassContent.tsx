import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Calendar,
  User,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CompletionModal } from "./CompletionModal";

interface Session {
  id: number;
  title: string;
  status: "attended" | "ongoing" | "not-started" | "not-attended";
  statusLabel: string;
  startDate: string;
  endDate: string;
  instructor: string;
  isExpanded: boolean;
}

interface VirtualClassContentProps {
  onComplete?: () => void;
}

export function VirtualClassContent({ onComplete }: VirtualClassContentProps) {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      title: "1. Oturum",
      status: "not-attended",
      statusLabel: "Katılmadın",
      startDate: "21 Mart 2025 14:00",
      endDate: "21 Mart 2025 15:30",
      instructor: "Sinan Sağıroğlu",
      isExpanded: true,
    },
    {
      id: 2,
      title: "2. Oturum",
      status: "not-attended",
      statusLabel: "Katılmadın",
      startDate: "22 Mart 2025 14:00",
      endDate: "22 Mart 2025 15:30",
      instructor: "Sinan Sağıroğlu",
      isExpanded: false,
    },
    {
      id: 3,
      title: "3. Oturum",
      status: "ongoing",
      statusLabel: "Devam ediyor",
      startDate: "23 Mart 2025 14:00",
      endDate: "23 Mart 2025 15:30",
      instructor: "Sinan Sağıroğlu",
      isExpanded: false,
    },
    {
      id: 4,
      title: "4. Oturum",
      status: "not-started",
      statusLabel: "Başlamadı",
      startDate: "24 Mart 2025 14:00",
      endDate: "24 Mart 2025 15:30",
      instructor: "Sinan Sağıroğlu",
      isExpanded: false,
    },
  ]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const toggleSession = (id: number) => {
    setSessions(
      sessions.map((session) =>
        session.id === id
          ? { ...session, isExpanded: !session.isExpanded }
          : session,
      ),
    );
  };

  const handleComplete = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      setShowCompletionModal(true);
      onComplete?.();
    }
  };

  const getStatusColor = (status: Session["status"]) => {
    switch (status) {
      case "attended":
        return "#4CAF50";
      case "ongoing":
        return "#FF9800";
      case "not-started":
        return "#9E9E9E";
      case "not-attended":
        return "#FF4757";
    }
  };

  return (
    <div
      className="relative px-6 py-6 flex flex-col items-center"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      {/* Ana Container */}
      <div className="w-full" style={{ maxWidth: "1100px" }}>
        {/* Banner Görseli */}
        <div className="relative w-full h-[150px] overflow-hidden mb-6">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1608600712992-03e5325d94c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwY2xhc3Nyb29tJTIwb25saW5lJTIwbWVldGluZ3xlbnwxfHx8fDE3NjIyNzQ3Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sanal Sınıf Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Oturumlar Listesi */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded border border-gray-200"
            >
              {/* Oturum Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleSession(session.id)}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      style={{ cursor: "pointer" }}
                      aria-label={
                        session.isExpanded
                          ? "Daralt"
                          : "Genişlet"
                      }
                    >
                      {session.isExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    <span className="text-gray-900" style={{ fontWeight: 600 }}>
                      {session.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: getStatusColor(
                            session.status,
                          ),
                        }}
                      />
                      <span
                        className="text-sm"
                        style={{
                          color: getStatusColor(session.status),
                        }}
                      >
                        {session.statusLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Oturum Detayları */}
                {session.isExpanded && (
                  <div className="mt-4 ml-8 space-y-2">
                    <div className="flex items-baseline gap-2 text-sm">
                      <Calendar
                        className="w-4 h-4 text-gray-600"
                        style={{ marginTop: "4px" }}
                      />
                      <div>
                        <div className="text-gray-600">
                          <span
                            className="text-gray-900 inline-block"
                            style={{
                              fontWeight: 600,
                              width: "150px",
                            }}
                          >
                            Başlangıç
                          </span>
                          <span>{session.startDate}</span>
                        </div>
                        <div className="text-gray-600 mt-1">
                          <span
                            className="text-gray-900 inline-block"
                            style={{
                              fontWeight: 600,
                              width: "150px",
                            }}
                          >
                            Bitiş
                          </span>
                          <span>{session.endDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-600" />
                      <div>
                        <span
                          className="text-gray-900 inline-block"
                          style={{
                            fontWeight: 600,
                            width: "150px",
                          }}
                        >
                          Eğitmen
                        </span>
                        <a
                          href="#"
                          className="text-blue-600 hover:underline"
                        >
                          {session.instructor}
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* TAMAMLA Butonu */}
        <div className="flex items-center justify-center mt-6">
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
      </div>

      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
      />
    </div>
  );
}
