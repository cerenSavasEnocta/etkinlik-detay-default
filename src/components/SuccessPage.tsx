import { useState } from "react";
import {
  Star,
  Bookmark,
  CheckCircle2,
  Linkedin,
  ArrowLeft,
  Clock,
  Users,
  Check,
  CheckCircle,
  Trophy,
  Smile,
} from "lucide-react";
import { MdStar } from "react-icons/md";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RatingModal } from "./RatingModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface SuccessPageProps {
  hasRated: boolean;
  hasBookmarked: boolean;
  onRatingComplete: () => void;
  onClose: () => void;
  totalScore?: number;
  totalTime?: string;
}

export function SuccessPage({
  hasRated,
  hasBookmarked,
  onRatingComplete,
  onClose,
  totalScore = 100,
  totalTime = "2:59:05",
}: SuccessPageProps) {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] =
    useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<
    Set<number>
  >(new Set());

  const toggleBookmark = (courseIndex: number) => {
    const newSet = new Set(bookmarkedCourses);
    if (newSet.has(courseIndex)) {
      newSet.delete(courseIndex);
    } else {
      newSet.add(courseIndex);
    }
    setBookmarkedCourses(newSet);
  };

  const handleRatingClick = () => {
    if (!hasRated) {
      setShowRatingModal(true);
    }
  };

  const handleRatingSubmit = () => {
    setShowRatingModal(false);
    onRatingComplete();
  };

  const recommendedCourses = [
    {
      id: 0,
      title:
        "JavaScript Temelleri: Kopyalarla Yazılım Geliştirme",
      duration: "4 Saat 40 dakika",
      rating: 4.2,
      reviews: 166,
      image:
        "https://images.unsplash.com/photo-1670057046254-3b5095eb4b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 1,
      title: "JavaScript: Kopyalarla Yazılım Geliştirmek",
      duration: "4 Saat 42 dakika",
      rating: 5.0,
      reviews: 12,
      image:
        "https://images.unsplash.com/photo-1670057046254-3b5095eb4b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 2,
      title: "Proje Yönetimi Temelleri",
      duration: "4 Saat 15 dakika",
      rating: 5.0,
      reviews: 60,
      image:
        "https://images.unsplash.com/photo-1649478680984-01586ce84ac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 3,
      title: "Etkili İletişim Becerileri",
      duration: "4 Saat 20 dakika",
      rating: 4.2,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
    {
      id: 4,
      title: "Veri Analizi ve Görselleştirme",
      duration: "4 Saat 5 dakika",
      rating: 4.5,
      reviews: 178,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    },
  ];

  const continueWatchingCourses = [
    {
      id: 0,
      title: "Yapay Zeka 101: Geleceğe Hazır Ol!",
      category: "Zorunlu",
      duration: "2 saat 36 dakika",
      rating: 4.6,
      reviews: 1900,
      progress: 67,
      completedLessons: 47,
      totalPoints: "8.35.282",
      image:
        "https://images.unsplash.com/photo-1538491247542-5da27794bc65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    },
    {
      id: 1,
      title: "Çocuk Gelişimi ve Eğitim",
      category: "Zorunlu",
      duration: "3 saat 15 dakika",
      rating: 4.8,
      reviews: 850,
      progress: 34,
      completedLessons: 12,
      totalPoints: "5.12.450",
      image:
        "https://images.unsplash.com/photo-1753928578920-c3e936415a21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-white overflow-hidden"
      style={{ zIndex: 100 }}
    >
      {/* Geri Dön Butonu */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        style={{ zIndex: 101 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Eğitime Dön</span>
      </button>

      <div className="flex h-full">
        {/* Sol Panel - Ana İçerik (col-9) */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ width: "75%" }}
        >
          <div className="mx-auto">
            {/* Banner Image */}
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{ 
                borderRadius: 0,
                minHeight: "300px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }}
            >
              <div className="text-center text-white">
                <Trophy className="w-24 h-24 mx-auto mb-4" />
                <h1 className="text-5xl mb-2">🎉</h1>
              </div>
            </div>

            {/* Score and Time - 20px below banner */}
            <div
              className="grid grid-cols-2 justify-center gap-4 px-2 mb-4 max-w-[380px] mx-auto"
              style={{ marginTop: "20px" }}
            >
              <div
                className="bg-white rounded px-8 py-4 text-center min-w-[180px]"
                style={{
                  border: "1px solid #68D48D",
                }}
              >
                <p className="text-xs text-gray-500 mb-1 text-[14px]">
                  PUAN
                </p>
                <p
                  className="text-4xl"
                  style={{
                    color: "#68D48D",
                    fontWeight: "600",
                  }}
                >
                  {totalScore}
                </p>
              </div>
              <div
                className="bg-white rounded px-8 py-4 text-center min-w-[180px]"
                style={{
                  border: "1px solid #68D48D",
                }}
              >
                <p className="text-xs text-gray-500 mb-1 text-[14px] font-bold font-normal">
                  SÜRE
                </p>
                <p
                  className="text-4xl"
                  style={{
                    color: "#68D48D",
                    fontWeight: "600",
                  }}
                >
                  {totalTime}
                </p>
              </div>
            </div>

            {/* Congratulations Message */}
            <div className="text-center mb-4">
              <h1 className="text-gray-900 mb-2">
                Tebrikler! Eğitimi başarıyla tamamladın 👏
              </h1>
              <p className="text-gray-600">
                Bu eğitimi seninle birlikte 7 kişi daha bitirdi.
              </p>
            </div>

            {/* LinkedIn Share Button */}
            <div className="flex justify-center mb-12">
              <button
                onClick={() => setShowThankYouModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded transition-colors"
                style={{
                  backgroundColor: "#0A66C2",
                  color: "#fff",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "#004182")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "#0A66C2")
                }
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>Sertifikamı Paylaş</span>
              </button>
            </div>

            {/* Task Cards */}
            <div className="flex flex-col gap-4 max-w-2xl mx-auto mt-2">
              {/* Eğitimi Tamamladın - Always Completed */}
              <div
                className="bg-white rounded-lg p-4 flex items-center gap-4"
                style={{
                  border: "2px solid #68D48D",
                  background:
                    "linear-gradient(135deg, #F0FFF4 0%, #C6F6D5 100%)",
                }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <Smile className="w-7 h-7 text-white" />
                  </div>
                </div>
                <p className="text-sm text-gray-900 flex-1">
                  Eğitimi tamamladın!
                </p>
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>

              {/* Eğitimi Değerlendirdin - Conditional */}
              <div
                className={`rounded-lg p-4 flex items-center gap-4 ${
                  !hasRated ? "cursor-pointer" : ""
                }`}
                style={{
                  border: hasRated
                    ? "2px solid #68D48D"
                    : "2px solid #E5E7EB",
                  background: hasRated
                    ? "linear-gradient(135deg, #F0FFF4 0%, #C6F6D5 100%)"
                    : "#FAFAFA",
                }}
                onClick={handleRatingClick}
              >
                <div className="flex-shrink-0">
                  {hasRated ? (
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <Smile className="w-7 h-7 text-white" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Star className="w-7 h-7 text-yellow-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <p className="text-sm text-gray-900">
                    Eğitimi değerlendirdin!
                  </p>
                  {!hasRated && (
                    <button
                      className="px-6 py-2 bg-white text-gray-700 text-sm rounded border border-black-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRatingClick();
                      }}
                    >
                      <MdStar className="w-5 h-5 text-black-400" />
                      Değerlendir
                    </button>
                  )}
                </div>
                {hasRated && (
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sağ Panel - Öneriler (col-3) */}
        <div
          className="bg-white overflow-y-auto border-l border-gray-200"
          style={{ width: "25%" }}
        >
          <div className="p-6">
            {/* Sana Özel Öneriler */}
            <div className="mb-8">
              <h3
                className="text-gray-900 mb-2"
                style={{ fontWeight: "600" }}
              >
                Sana Özel Öneriler
              </h3>
              <div className="space-y-3">
                {recommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="relative flex gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setShowThankYouModal(true)}
                  >
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-20 h-20 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-gray-900 mb-1 line-clamp-2">
                        {course.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1.5">
                        {course.duration}
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(course.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {course.rating} ({course.reviews})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(course.id);
                      }}
                      className="absolute bottom-2 right-2 p-1.5"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarkedCourses.has(course.id)
                            ? "fill-black text-black"
                            : "text-gray-400"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Kaldığın Yerden Devam Et */}
            <div>
              <h3
                className="text-gray-900 mb-4"
                style={{ fontWeight: "600" }}
              >
                Kaldığın Yerden Devam Et
              </h3>
              <div className="space-y-4">
                {continueWatchingCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white overflow-hidden cursor-pointer group"
                    onClick={() => setShowThankYouModal(true)}
                  >
                    {/* Image with overlays */}
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
                        }}
                      />
                      {/* Progress circle and points */}
                      <div className="absolute bottom-2 left-2 flex items-center gap-2">
                        <div className="relative w-[50px] h-[50px]">
                          <svg
                            className="w-full h-full"
                            viewBox="0 0 50 50"
                          >
                            {/* Background circle */}
                            <circle
                              cx="25"
                              cy="25"
                              r="22"
                              fill="none"
                              stroke="rgba(255,255,255,0.3)"
                              strokeWidth="4"
                            />
                            {/* Progress circle */}
                            <circle
                              cx="25"
                              cy="25"
                              r="22"
                              fill="none"
                              stroke="#68D48D"
                              strokeWidth="4"
                              strokeDasharray={`${2 * Math.PI * 22}`}
                              strokeDashoffset={`${2 * Math.PI * 22 * (1 - course.progress / 100)}`}
                              strokeLinecap="round"
                              transform="rotate(-90 25 25)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-white text-xs">
                            {course.progress}
                          </div>
                        </div>
                        <span className="text-white text-xs bg-black/80 px-2 py-1 rounded">
                          {course.completedLessons} Puan
                        </span>
                      </div>
                    </div>

                    {/* Content info */}
                    <div className="py-3">
                      {/* Zorunlu badge */}
                      <div className="mb-2">
                        <span className="bg-[rgba(231,0,11,0.1)] text-[rgb(231,0,11)] text-xs px-2 py-1 rounded inline-block">
                          {course.category}
                        </span>
                      </div>

                      <h4 className="text-sm text-gray-900 mb-1 line-clamp-2">
                        {course.title}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i <
                                    Math.floor(course.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">
                              {course.rating}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Users className="w-3 h-3" />
                            <span>{course.reviews}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRatingSubmit}
      />

      {/* Thank You Modal */}
      <div style={{ zIndex: 150, position: "relative" }}>
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
                Bu kadar detaylı test ettiğin için teşekkür
                ederiz 💕
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
    </div>
  );
}