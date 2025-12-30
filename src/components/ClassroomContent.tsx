import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Calendar,
  User,
  MapPin,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CompletionModal } from "./CompletionModal";

interface Session {
  id: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  instructor: string;
  isExpanded: boolean;
}

interface ClassroomContentProps {
  onComplete?: () => void;
}

export function ClassroomContent({ onComplete }: ClassroomContentProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      title: "1. Oturum",
      location: "Titaniyum Blok 17/B, ODTÜ Teknokent",
      startDate: "21 Mart 2025 14:00",
      endDate: "21 Mart 2025 15:30",
      instructor: "Sinan Sağıroğlu",
      isExpanded: true,
    },
  ]);

  // Türkçe tarih parse yardımcıları
  const parseTrDate = (dateStr: string): Date => {
    const months: Record<string, number> = {
      Ocak: 0,
      Şubat: 1,
      Mart: 2,
      Nisan: 3,
      Mayıs: 4,
      Haziran: 5,
      Temmuz: 6,
      Ağustos: 7,
      Eylül: 8,
      Ekim: 9,
      Kasım: 10,
      Aralık: 11,
    };
    const parts = dateStr.split(" ");
    const day = parseInt(parts[0], 10);
    const monthIndex = months[parts[1]];
    const year = parseInt(parts[2], 10);
    const [hourStr, minStr] = (parts[3] || "00:00").split(":");
    const hour = parseInt(hourStr || "0", 10);
    const minute = parseInt(minStr || "0", 10);
    return new Date(year, monthIndex, day, hour, minute);
  };

  // Sıradaki/Devam eden oturumu açık getir
  useEffect(() => {
    if (sessions.length === 0) return;
    const now = new Date();
    const withDates = sessions.map((s) => ({
      s,
      start: parseTrDate(s.startDate),
      end: parseTrDate(s.endDate),
    }));
    const ongoing = withDates.find(
      (x) => x.start <= now && now <= x.end,
    )?.s.id;
    const upcoming = withDates.find((x) => x.start > now)?.s.id;
    const targetId = ongoing ?? upcoming ?? sessions[0].id;
    setSessions((prev) =>
      prev.map((s) => ({ ...s, isExpanded: s.id === targetId })),
    );
  }, []);

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

  return (
    <div
      className="relative px-6 py-6 flex flex-col items-center"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      {/* Ana Container */}
      <div className="w-full" style={{ maxWidth: "1100px", maxHeight: "77vh", minHeight: "77vh", overflowY: "auto"}}>
        {/* Banner Görseli */}
        <div className="relative w-full h-[150px] overflow-hidden mb-6">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjI3NzM4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sınıf İçi Eğitim Banner"
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
                  </div>
                </div>

                {/* Oturum Detayları */}
                {session.isExpanded && (
                  <div className="mt-4 ml-8 space-y-2">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin
                        className="w-4 h-4 text-gray-600 flex-shrink-0"
                        style={{ marginTop: "4px" }}
                      />
                      <div>
                        <span
                          className="text-gray-900 inline-block"
                          style={{
                            fontWeight: 600,
                            width: "150px",
                          }}
                        >
                          Oturum Yeri
                        </span>
                        <span className="text-gray-600">
                          {session.location}
                        </span>
                      </div>
                    </div>

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
