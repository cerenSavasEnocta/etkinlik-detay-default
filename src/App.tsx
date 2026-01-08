import { useState, useMemo, useEffect, useRef } from "react";
import { Header } from "./components/Header";
import { ContentTree, contentData, ContentItem } from "./components/ContentTree";
import { MainContent } from "./components/MainContent";
import { OverviewPanel } from "./components/OverviewPanel";
import { AutoplayWidget } from "./components/AutoplayWidget";
import { SuccessPage } from "./components/SuccessPage";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./components/ui/dialog";

type SidebarState = "content-tree" | "overview" | null;
type ContentType = 'video' | 'html' | 'virtual-class' | 'podcast' | 'classroom' | 'elearning' | 'task' | 'file' | 'exam';

// Flatten the hierarchical content structure
const flattenContent = (items: ContentItem[]): ContentItem[] => {
  const result: ContentItem[] = [];
  const traverse = (items: ContentItem[]) => {
    items.forEach(item => {
      // Skip the first special item (progress tracker)
      if (item.id !== '1') {
        if (item.children && item.children.length > 0) {
          traverse(item.children);
        } else {
          result.push(item);
        }
      }
    });
  };
  traverse(items);
  return result;
};

export default function App() {
  const [activeSidebar, setActiveSidebar] =
    useState<SidebarState>("content-tree");
  const [currentContentId, setCurrentContentId] = useState('2-1');
  const [completedContents, setCompletedContents] = useState<Set<string>>(new Set());
  const [contentProgress, setContentProgress] = useState<Record<string, number>>({});
  // Başarı ekranından geri dönüldüğünde, aynı durumda otomatik tekrar açılmasını bir kez engelle
  const [suppressSuccessOnce, setSuppressSuccessOnce] = useState(false);
  
  const flatContent = useMemo(() => flattenContent(contentData), []);
  
  const currentIndex = flatContent.findIndex(item => item.id === currentContentId);
  const currentItem = flatContent[currentIndex];
  const lastItemId = flatContent.length > 0 ? flatContent[flatContent.length - 1].id : undefined;

  // Tüm içeriklerin tamamlanıp tamamlanmadığını kontrol et
  const isAllCompleted = useMemo(() => {
    return flatContent.length > 0 && flatContent.every(item => completedContents.has(item.id));
  }, [flatContent, completedContents]);
  
  const [currentContent, setCurrentContent] = useState(
    currentItem?.title || "Tasarım Odaklı Düşünmenin Tanımı",
  );
  const [currentContentType, setCurrentContentType] = useState<ContentType>(
    currentItem?.type || 'video'
  );
  const [showAutoplay, setShowAutoplay] = useState(false);
  const [nextContentInfo, setNextContentInfo] = useState<{
    title: string;
    type: string;
    duration: string;
    image?: string;
  } | null>(null);
  // Autoplay widget, kapatılana kadar bastırma (mevcut içerik için)
  const [suppressedAutoplayForContentId, setSuppressedAutoplayForContentId] = useState<string | null>(null);
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [showPrototypeInfo, setShowPrototypeInfo] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Sayfa ilk yüklendiğinde en üste kaydır
  useEffect(() => {
    if (scrollRef.current) {
      try {
        scrollRef.current.scrollTo({ top: 0, behavior: "auto" });
      } catch {
        scrollRef.current.scrollTop = 0;
      }
    }
  }, []);

  // Yeni içeriğe geçildiğinde en üste kaydır
  useEffect(() => {
    if (scrollRef.current) {
      try {
        scrollRef.current.scrollTo({ top: 0, behavior: "auto" });
      } catch {
        scrollRef.current.scrollTop = 0;
      }
    }
  }, [currentContentId, currentContentType]);
  
  // Autoplay ayarını localStorage'dan oku
  const [autoplayEnabled, setAutoplayEnabled] = useState(() => {
    const saved = localStorage.getItem('autoplayEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleContentTree = () => {
    setActiveSidebar((prev) =>
      prev === "content-tree" ? null : "content-tree",
    );
  };

  const toggleOverview = () => {
    setActiveSidebar((prev) =>
      prev === "overview" ? null : "overview",
    );
  };

  const handleContentSelect = (title: string, type: ContentType, id: string) => {
    setCurrentContent(title);
    setCurrentContentType(type);
    setCurrentContentId(id);
    
    // İçeriğe tıklandığında, eğer henüz tamamlanmadıysa progress'i 50% yap
    if (!completedContents.has(id) && !contentProgress[id]) {
      setContentProgress(prev => ({ ...prev, [id]: 50 }));
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevItem = flatContent[currentIndex - 1];
      setCurrentContentId(prevItem.id);
      setCurrentContent(prevItem.title);
      setCurrentContentType(prevItem.type);
    }
  };

  const handleNext = () => {
    if (currentIndex < flatContent.length - 1) {
      const nextItem = flatContent[currentIndex + 1];
      setCurrentContentId(nextItem.id);
      setCurrentContent(nextItem.title);
      setCurrentContentType(nextItem.type);
    }
  };

  const handleContentComplete = (contentId: string) => {
    // Eğer kullanıcı mevcut içerikte autoplay widget'ını kapattıysa,
    // aynı içerik tamamlandığında widget'ı tekrar gösterme
    if (suppressedAutoplayForContentId === contentId) {
      return;
    }
    setCompletedContents(prev => new Set(prev).add(contentId));
    setContentProgress(prev => ({ ...prev, [contentId]: 100 }));
    
    // Otomatik olarak bir sonraki içeriğe geç
    const currentIdx = flatContent.findIndex(item => item.id === contentId);
    if (currentIdx < flatContent.length - 1) {
      const nextItem = flatContent[currentIdx + 1];
      
      // Modal kapandıktan sonra autoplay widget'ı göster
      setTimeout(() => {
        setNextContentInfo({
          title: nextItem.title,
          type: nextItem.type,
          duration: "10 dk", // Varsayılan süre, gerçek süre data'dan gelirse güncellenebilir
        });
        setShowAutoplay(true);
        // Farklı bir içerik için tetiklendi; önceki bastırmayı kaldır
        setSuppressedAutoplayForContentId(null);
      }, 1500);
    }
  };

  const handleAutoplaySkip = () => {
    if (nextContentInfo) {
      setShowAutoplay(false);
      setCurrentContentId(
        flatContent.find((item) => item.title === nextContentInfo.title)?.id ||
          currentContentId,
      );
      setCurrentContent(nextContentInfo.title);
      setCurrentContentType(nextContentInfo.type as ContentType);
      setNextContentInfo(null);
    }
  };

  const handleAutoplayToggle = (enabled: boolean) => {
    setAutoplayEnabled(enabled);
    localStorage.setItem('autoplayEnabled', JSON.stringify(enabled));
  };

  // Başarı ekranı otomatik açılmaz; sadece sınav ekranındaki "Sonuç" ile açılır

  // Başarı ekranından geri dönünce bastırmayı etkinleştir
  const handleCloseSuccess = () => {
    setShowSuccessPage(false);
    setSuppressSuccessOnce(true);
  };

  // suppressSuccessOnce korunuyor; gerekirse gelecekte kullanılabilir

  return (
    <>
      {/* Success Page */}
      {showSuccessPage && (
        <SuccessPage
          hasRated={hasRated}
          hasBookmarked={hasBookmarked}
          onRatingComplete={() => setHasRated(true)}
          onClose={handleCloseSuccess}
          totalScore={100}
          totalTime="2:59:05"
        />
      )}
      {/* Prototype Info Modal (when exam result clicked but all contents not completed) */}
      {showPrototypeInfo && (
        <Dialog open={showPrototypeInfo} onOpenChange={setShowPrototypeInfo}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Merhaba 👋</DialogTitle>
              <DialogDescription className="text-center pt-2">
                <div>
                  <p style={{ marginTop: "8px" }}>
                    Burası prototip'in son aşamasıdır. Tüm içerikleri
                    tamamladığında burada sana bir sürprizimiz olacak 🌟
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowPrototypeInfo(false)}
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
      )}

      <div className="flex flex-col h-screen bg-gray-50 overflow-y-auto" ref={scrollRef as any}>
        <Header
          onToggleContentTree={toggleContentTree}
          onToggleOverview={toggleOverview}
          isOverviewActive={activeSidebar === "overview"}
          isContentTreeActive={activeSidebar === "content-tree"}
          currentContent={currentContent}
          isAllCompleted={isAllCompleted}
        />

      <div className="flex flex-1">
        {/* Sol Sidebar - İçerik Ağacı */}
        <div
          className={`transition-all duration-300 ease-in-out border-r border-gray-200 ${
            activeSidebar === "content-tree" ? "w-[420px]" : "w-0"
          }`}
          style={{ backgroundColor: "#f9f9f9" }}
        >
          {activeSidebar === "content-tree" && (
            <ContentTree 
              onContentSelect={handleContentSelect}
              selectedId={currentContentId}
              completedContents={completedContents}
              contentProgress={contentProgress}
            />
          )}
        </div>

        {/* Ana İçerik Alanı */}
        <div className="flex-1">
          <MainContent
            onToggleContentTree={toggleContentTree}
            currentContent={currentContent}
            contentType={currentContentType}
            isContentTreeOpen={activeSidebar === "content-tree"}
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={currentIndex > 0}
            hasNext={currentIndex < flatContent.length - 1}
            onContentComplete={() => handleContentComplete(currentContentId)}
            currentContentId={currentContentId}
            completedContents={completedContents}
            onExamResult={() => {
              if (isAllCompleted) {
                setShowSuccessPage(true);
              } else {
                setShowPrototypeInfo(true);
              }
            }}
          />
        </div>

        {/* Sağ Sidebar - Genel Bakış */}
        <div
          className={`transition-all duration-300 ease-in-out bg-white border-l border-gray-200 ${
            activeSidebar === "overview" ? "w-[420px]" : "w-0"
          }`}
        >
          {activeSidebar === "overview" && <OverviewPanel />}
        </div>
      </div>

        {/* Autoplay Widget */}
        {showAutoplay && nextContentInfo && (
          <AutoplayWidget
            nextContentTitle={nextContentInfo.title}
            nextContentType={nextContentInfo.type}
            nextContentDuration={nextContentInfo.duration}
            nextContentImage={nextContentInfo.image}
            onSkip={handleAutoplaySkip}
            autoplayDuration={10000}
            autoplayEnabled={autoplayEnabled}
            onAutoplayToggle={handleAutoplayToggle}
            onClose={() => {
              // Widget'ı kapat ve mevcut içerik için autoplay'i bastır
              setShowAutoplay(false);
              setSuppressedAutoplayForContentId(currentContentId);
            }}
          />
        )}
      </div>
    </>
  );
}