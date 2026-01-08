import {
  Star,
  Calendar,
  GraduationCap,
  Layers,
  Users,
  Award,
  Plus,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function OverviewPanel() {
  const [selectedCompetencies, setSelectedCompetencies] =
    useState<Set<number>>(new Set([0, 1]));
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const toggleCompetency = (index: number) => {
    const newSet = new Set(selectedCompetencies);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelectedCompetencies(newSet);
  };

  const competencies = [
    "TEKNOLOJİ İLE DEĞER YARATIYORUM",
    "YENİ DÜNYAYI ANLAMA",
    "CANLILIĞIN OLUŞUMU VE EVRİMİ",
  ];

  const fullDescription =
    "Fulya Prof. Dr. Kerem Conkgüzer, Evanston Üniversitesi ve felsefe araştırmalarını gizlendiğin ve İçinde yaşadığımız evrenli artırılmış için tasarım odaklı düşünme metodolojilerini ve uygulamalarını detaylı bir şekilde incelemektedir. Bu kurs, katılımcılara kullanıcı deneyimi tasarımı, inovasyon süreçleri ve problem çözme becerilerini geliştirmelerine yardımcı olmaktadır.";
  const shortDescription =
    "Fulya Prof. Dr. Kerem Conkgüzer, Evanston Üniversitesi ve felsefe araştırmalarını gizlendiğin ve İçinde yaşadığımız evrenli artırılmış için";

  return (
    <div className="p-6 overflow-y-auto max-h-[calc(100vh-60px)] sticky top-0">
      {/* Kurs Başlığı ve Görsel */}
      <div className="mb-6">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop"
          alt="Design Thinking"
          className="w-full h-24 object-cover rounded-lg mb-3"
        />
        <h2 className="text-gray-900 mb-1">
          Kurumlarda Bilişsel Becerileri Geliştirme
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <Star className="w-4 h-4 text-gray-300" />
          </div>
          <span className="text-sm text-gray-600">4.7</span>
          <span className="text-sm text-gray-400">
            (1,932 değerlendirme)
          </span>
        </div>
      </div>

      {/* Açıklama */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-2">
          Açıklama
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {isDescriptionExpanded
            ? fullDescription
            : shortDescription}{" "}
          <button
            onClick={() =>
              setIsDescriptionExpanded(!isDescriptionExpanded)
            }
            className="text-[#cc1f47] hover:underline"
            style={{ cursor: "pointer", fontSize: "14px" }}
          >
            {isDescriptionExpanded
              ? "Daha Az Gör"
              : "Devamını oku"}
          </button>
        </p>
      </div>

      {/* Yetkinlikler */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          Yetkinlikler
        </h3>
        <div className="space-y-3">
          {competencies.map((competency, index) => (
            <div
              key={index}
              className="flex items-center border border-gray-200 rounded-sm bg-white"
              style={{
                height: "fit-content",
                width: "fit-content",
                padding: "6px 10px",
              }}
            >
              <span className="text-gray-900 text-[14px]">
                {competency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Genel Bilgiler */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          Genel Bilgiler
        </h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex items-center gap-2 w-[150px] flex-shrink-0">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-900">
                Başlangıç
              </span>
            </div>
            <div className="flex-1">
              <span className="text-sm text-gray-900">
                3 MAY 2024 12:15
              </span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center gap-2 w-[150px] flex-shrink-0">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-900">
                Bitiş
              </span>
            </div>
            <div className="flex-1">
              <span className="text-sm text-gray-900">
                5 EYL 2025 18:00
              </span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center gap-2 w-[150px] flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-900">
                Eğitim Türü
              </span>
            </div>
            <div className="flex-1">
              <a
                href="#!"
                className="text-sm text-blue-600 hover:underline"
                style={{ cursor: "pointer" }}
              >
                Eğitim
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center gap-2 w-[150px] flex-shrink-0">
              <Layers className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-900">
                Kategori
              </span>
            </div>
            <div className="flex-1">
              <span className="text-sm text-gray-900">
                Yöneticilikte Mükemmellik / Liderlik Becerileri
              </span>
            </div>
          </div>
          {/* Tahmini Süre */}
          <div className="flex items-start">
            <div className="flex items-center gap-2 w-[150px] flex-shrink-0">
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: "20px",
                  color: "#4b5563",
                  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20",
                }}
              >
                schedule
              </span>
              <span className="text-sm text-gray-900">
                Tahmini Süre
              </span>
            </div>
            <div className="flex-1">
              <span className="text-sm text-gray-900">
                2 saat 17 dakika
              </span>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center gap-2 w-[150px] flex-shrink-0">
              <Award className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-900">
                Üretici Firma
              </span>
            </div>
            <div className="flex-1">
              <a
                href="#!"
                className="text-sm text-blue-600 hover:underline"
                style={{ cursor: "pointer" }}
              >
                Enocta
              </a>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center gap-2 w-[150px] flex-shrink-0">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-900">
                Konu Uzmanı
              </span>
            </div>
            <div className="flex-1">
              <span className="text-sm">
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                  style={{ cursor: "pointer" }}
                >
                  Don Norman
                </a>
                {", "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline"
                  style={{ cursor: "pointer" }}
                >
                  Kazım Yaman
                </a>
              </span>
            </div>
          </div>
          {/* Geçirilen süre */}
          <div className="flex items-start">
            <div className="flex items-center gap-2 w-[150px] flex-shrink-0">
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: "20px",
                  color: "#4b5563",
                  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20",
                }}
              >
                timer
              </span>
              <span className="text-sm text-gray-900">
                Geçirilen Süre
              </span>
            </div>
            <div className="flex-1">
              <span className="text-sm text-gray-900">
                0 saat 00 dakika
              </span>
            </div>
          </div>
          {/* İçerik Tipleri */}
          <div className="flex items-start">
            <div className="flex items-center gap-2 w-[150px] flex-shrink-0">
              <Layers className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-900">
                İçerik Tipleri
              </span>
            </div>
            <div className="flex-1">
              <span className="text-sm text-gray-900">
                3 görev, 1 html içerik, 2 sınav
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bunları da beğenebilirsin */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          Bunları da beğenebilirsin
        </h3>
        <div className="space-y-3">
          <div
            onClick={() => setShowThankYouModal(true)}
            className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
            style={{
              cursor: "pointer",
              borderRadius: "2px",
              padding: "10px",
              position: "relative",
            }}
          >
            <div className="flex-shrink-0" style={{ width: "100px", height: "100px" }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1646579886135-068c73800308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Akıllı Reklamcılık Çağı: AdTech ve Programatik"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 ml-3">
              <h4 className="text-sm mb-4">
                Akıllı Reklamcılık Çağı: AdTech ve Programatik
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                2 Saat 40 dakika
              </p>
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <Star
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    style={{ clipPath: "inset(0 10% 0 0)" }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  4.9 (203)
                </span>
                </div>
                <div
                  className="px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(30,144,255,0.1)",
                    color: "#1E90FF",
                    fontSize: "11px",
                  }}
                >
                  E-Eğitim
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setShowThankYouModal(true)}
            className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
            style={{
              cursor: "pointer",
              borderRadius: "2px",
              padding: "10px",
              position: "relative",
            }}
          >
            <div className="flex-shrink-0" style={{ width: "100px", height: "100px" }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="JavaScript: Kopyalarla Yazılım Geliştirmek"
                className="w-full h-full object-cover"
              />
              
            </div>
            <div className="flex-1 ml-3">
              <h4 className="text-sm mb-4">
                JavaScript: Kopyalarla Yazılım Geliştirmek
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                1 Saat 42 dakika
              </p>
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <Star className="w-3 h-3 text-gray-300" />
                </div>
                <span className="text-xs text-gray-600">
                  4.2 (156)
                </span>
                </div>
                <div
                  className="px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(30,144,255,0.1)",
                    color: "#1E90FF",
                    fontSize: "11px",
                  }}
                >
                  Sınıf İçi Eğitim
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setShowThankYouModal(true)}
            className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
            style={{
              cursor: "pointer",
              borderRadius: "2px",
              padding: "10px",
              position: "relative",
            }}
          >
            <div className="flex-shrink-0" style={{ width: "100px", height: "100px" }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Kurumlarda Bilişsel Becerileri Geliştirme"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 ml-3">
              <h4 className="text-sm mb-4">
                Kurumlarda Bilişsel Becerileri Geliştirme
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                3 Saat 15 dakika
              </p>
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">
                  5.0 (89)
                </span>
                </div>
                <div
                  className="px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(30,144,255,0.1)",
                    color: "#1E90FF",
                    fontSize: "11px",
                  }}
                >
                  E-Eğitim
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setShowThankYouModal(true)}
            className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
            style={{
              cursor: "pointer",
              borderRadius: "2px",
              padding: "10px",
              position: "relative",
            }}
          >
            <div className="flex-shrink-0" style={{ width: "100px", height: "100px" }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Geri Bildirim Alma Gelişim Yolculuğu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 ml-3">
              <h4 className="text-sm mb-4">
                Geri Bildirim Alma Gelişim Yolculuğu
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                2 Saat 20 dakika
              </p>
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <Star
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    style={{ clipPath: "inset(0 30% 0 0)" }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  4.7 (312)
                </span>
                </div>
                <div
                  className="px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(30,144,255,0.1)",
                    color: "#1E90FF",
                    fontSize: "11px",
                  }}
                >
                  Sınıf İçi Eğitim
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => setShowThankYouModal(true)}
            className="border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex"
            style={{
              cursor: "pointer",
              borderRadius: "2px",
              padding: "10px",
              position: "relative",
            }}
          >
            <div className="flex-shrink-0" style={{ width: "100px", height: "100px" }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
                alt="Dijital Çağda Yanilikçilik ve Yaratıcılık Gelişim Yolculuğu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 ml-3">
              <h4 className="text-sm mb-4">
                Dijital Çağda Yanilikçilik ve Yaratıcılık Gelişim Yolculuğu
              </h4>
              <p className="text-xs text-gray-500 mb-2">
                4 Saat 5 dakika
              </p>
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <Star
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  4.5 (178)
                </span>
                </div>
                <div
                  className="px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(30,144,255,0.1)",
                    color: "#1E90FF",
                    fontSize: "11px",
                  }}
                >
                  E-Eğitim
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bu eğitimin bağlı olduğu öğrenme yolları */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Bu eğitimin bağlı olduğu öğrenme yolları
        </h3>
        <div className="space-y-3">
          <div
            onClick={() => setShowThankYouModal(true)}
            className="relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            style={{ cursor: "pointer", borderRadius: "8px" }}
          >
            <div className="relative h-40">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1660854088062-c178a98550cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
                alt="Liderlik Öğrenme Yolu"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>

              {/* Duration Badge */}
              <div
                className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded"
                style={{ fontSize: "11px" }}
              >
                ⏱ 1 sa 57 dk
              </div>

              {/* Title Badge */}
              <div
                className="absolute bottom-12 left-2 bg-white text-black text-sm px-3 py-1.5 rounded"
                style={{ fontSize: "13px" }}
              >
                Liderlik Öğrenme Yolu
              </div>

              {/* Progress Info */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-xs">
                    Devam Ediyor
                  </span>
                  <span className="text-white text-xs">
                    0/4
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="flex-1 bg-white/30 rounded-full h-1.5"></div>
                  <div className="flex-1 bg-white/30 rounded-full h-1.5"></div>
                  <div className="flex-1 bg-white/30 rounded-full h-1.5"></div>
                  <div className="flex-1 bg-white/30 rounded-full h-1.5"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => setShowThankYouModal(true)}
            className="relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            style={{ cursor: "pointer", borderRadius: "8px" }}
          >
            <div className="relative h-40">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758691736433-4078b93abd72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600"
                alt="Dijital Dönüşüm Yolu"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60"></div>

              {/* Duration Badge */}
              <div
                className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded"
                style={{ fontSize: "11px" }}
              >
                ⏱ 3 sa 25 dk
              </div>

              {/* Title Badge */}
              <div
                className="absolute bottom-12 left-2 bg-white text-black text-sm px-3 py-1.5 rounded"
                style={{ fontSize: "13px" }}
              >
                Dijital Dönüşüm Yolu
              </div>

              {/* Progress Info */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-xs">
                    Devam Ediyor
                  </span>
                  <span className="text-white text-xs">
                    2/6
                  </span>
                </div>
                <div className="flex gap-1">
                  <div
                    className="flex-1 rounded-full h-1.5"
                    style={{ backgroundColor: "#68D48D" }}
                  ></div>
                  <div
                    className="flex-1 rounded-full h-1.5"
                    style={{ backgroundColor: "#68D48D" }}
                  ></div>
                  <div className="flex-1 bg-white/30 rounded-full h-1.5"></div>
                  <div className="flex-1 bg-white/30 rounded-full h-1.5"></div>
                  <div className="flex-1 bg-white/30 rounded-full h-1.5"></div>
                  <div className="flex-1 bg-white/30 rounded-full h-1.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Modal */}
      <Dialog
        open={showThankYouModal}
        onOpenChange={setShowThankYouModal}
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
              onClick={() => setShowThankYouModal(false)}
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