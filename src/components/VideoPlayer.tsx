import { useState, useRef, useEffect } from "react";

interface VideoPlayerProps {
  onComplete?: () => void;
}

// YouTube Player API türü
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function VideoPlayer({ onComplete }: VideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isAPIReady, setIsAPIReady] = useState(false);

  // YouTube IFrame API'sini yükle
  useEffect(() => {
    // Eğer script zaten yüklüyse
    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
      return;
    }

    // Script'i yükle
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // API hazır olduğunda callback
    window.onYouTubeIframeAPIReady = () => {
      setIsAPIReady(true);
    };
  }, []);

  // Player'ı oluştur
  useEffect(() => {
    if (!isAPIReady || !containerRef.current || playerRef.current) return;

    playerRef.current = new window.YT.Player("youtube-player", {
      videoId: "LypPT2I6xPU",
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: () => {
          setIsReady(true);
          console.log("YouTube player ready");
        },
        onStateChange: (event: any) => {
          // Video bittiğinde (state = 0)
          if (event.data === 0 && !hasCompleted) {
            console.log("Video completed");
            setHasCompleted(true);
            onComplete?.();
          }
        },
        onError: (error: any) => {
          console.error("YouTube player error:", error);
        },
      },
    });

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isAPIReady, hasCompleted, onComplete]);

  return (
    <div
      className="relative bg-black w-full"
      style={{ 
        aspectRatio: "16 / 9",
        maxHeight: "77vh",
        minHeight: "77vh", 
      }}
      ref={containerRef}
    >
      <div
        id="youtube-player"
        className="w-full h-full"
      />

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center text-white p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Video yükleniyor...</p>
          </div>
        </div>
      )}
    </div>
  );
}
