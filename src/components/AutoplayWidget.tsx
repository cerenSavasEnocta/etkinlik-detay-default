import { useState, useEffect } from "react";
import { Play, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { Switch } from "./ui/switch";

interface AutoplayWidgetProps {
  nextContentTitle: string;
  nextContentType: string;
  nextContentDuration?: string;
  nextContentImage?: string;
  onSkip: () => void;
  autoplayDuration?: number; // milliseconds
  autoplayEnabled: boolean;
  onAutoplayToggle: (enabled: boolean) => void;
}

export function AutoplayWidget({
  nextContentTitle,
  nextContentType,
  nextContentDuration = "10 dk",
  nextContentImage,
  onSkip,
  autoplayDuration = 10000,
  autoplayEnabled,
  onAutoplayToggle,
}: AutoplayWidgetProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation
    setIsVisible(true);

    // Progress animation
    const startTime = Date.now();
    let pausedTime = 0;
    let lastPauseStart = 0;

    const interval = setInterval(() => {
      if (!autoplayEnabled) {
        if (lastPauseStart === 0) {
          lastPauseStart = Date.now();
        }
        return;
      }

      if (lastPauseStart > 0) {
        pausedTime += Date.now() - lastPauseStart;
        lastPauseStart = 0;
      }

      const elapsed = Date.now() - startTime - pausedTime;
      const newProgress = Math.min(
        (elapsed / autoplayDuration) * 100,
        100,
      );
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        // Auto navigate after progress completes
        setTimeout(() => {
          onSkip();
        }, 100);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [autoplayDuration, onSkip, autoplayEnabled]);

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(onSkip, 200);
  };

  // Circular progress calculation
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  // Map content type to Turkish
  const getContentTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      video: "Video",
      html: "İçerik",
      "virtual-class": "Sanal Sınıf",
      podcast: "Podcast",
      classroom: "Sınıf İçi Eğitim",
      elearning: "E-Eğitim",
      task: "Görev",
      file: "Dosya",
      exam: "Sınav",
    };
    return typeMap[type] || type;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50"
          style={{
            maxWidth: "480px",
            width: "calc(100vw - 3rem)",
          }}
        >
          <div
            className="shadow-2xl overflow-hidden"
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "2px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom:
                  "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <span className="text-white text-[14px]">
                Sonraki İçerik
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm"
                  style={{
                    color: autoplayEnabled ? "#4ade80" : "#999",
                  }}
                >
                  Otomatik Geç
                </span>
                <Switch
                  checked={autoplayEnabled}
                  onCheckedChange={onAutoplayToggle}
                  style={{
                    backgroundColor: autoplayEnabled
                      ? "#4ade80"
                      : "#4a4a4a",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex items-center gap-4 p-4">
              {/* Thumbnail */}
              <div
                className="flex-shrink-0 rounded overflow-hidden"
                style={{ width: "80px", height: "80px" }}
              >
                <ImageWithFallback
                  src={
                    nextContentImage ||
                    "https://images.unsplash.com/photo-1562939651-9359f291c988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB0aGlua2luZyUyMGlubm92YXRpb258ZW58MXx8fHwxNzYyODk0MjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  }
                  alt={nextContentTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Info */}
              <div className="flex-1 min-w-0">
                <h4
                  className="text-white mb-1"
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {nextContentTitle}
                </h4>
                <div className="flex items-center gap-3 text-sm">
                  <span style={{ color: "#999" }}>
                    {getContentTypeLabel(nextContentType)}
                  </span>
                  <span style={{ color: "#666" }}>•</span>
                  <div
                    className="flex items-center gap-1"
                    style={{ color: "#999" }}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{nextContentDuration}</span>
                  </div>
                </div>
              </div>

              {/* Play Button with Circular Progress */}
              <div className="flex-shrink-0 relative">
                <button
                  onClick={handleSkip}
                  className="relative flex items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    border: "none",
                    outline: "none",
                  }}
                  aria-label="Bir sonraki içeriğe geç"
                >
                  {/* Background Circle */}
                  <svg
                    className="absolute"
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    style={{
                      transform: "rotate(-90deg)",
                      top: 0,
                      left: 0,
                    }}
                  >
                    {/* Background track */}
                    <circle
                      cx="32"
                      cy="32"
                      r={radius}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="3"
                      fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="32"
                      cy="32"
                      r={radius}
                      stroke="#fff"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      style={{
                        transition:
                          "stroke-dashoffset 0.016s linear",
                      }}
                    />
                  </svg>

                  {/* Play Icon */}
                  <Play
                    className="relative z-10"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "#fff",
                      fill: "#fff",
                      marginLeft: "2px",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}