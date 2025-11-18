import { useState, useMemo, useEffect } from "react";
import { Header } from "./components/Header";
import { ContentTree, contentData, ContentItem } from "./components/ContentTree";
import { MainContent } from "./components/MainContent";
import { OverviewPanel } from "./components/OverviewPanel";
import { AutoplayWidget } from "./components/AutoplayWidget";
import { SuccessPage } from "./components/SuccessPage";

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
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  
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

  // Tüm içerikler tamamlandığında başarı ekranını göster
  useEffect(() => {
    if (isAllCompleted && !showSuccessPage && !suppressSuccessOnce) {
      setShowSuccessPage(true);
    }
  }, [isAllCompleted, showSuccessPage, suppressSuccessOnce]);

  // Başarı ekranından geri dönünce bastırmayı etkinleştir
  const handleCloseSuccess = () => {
    setShowSuccessPage(false);
    setSuppressSuccessOnce(true);
  };

  // Son içerikten ayrılınca (başka bir içeriğe geçilince) bastırmayı sıfırla
  useEffect(() => {
    if (currentContentId !== lastItemId) {
      setSuppressSuccessOnce(false);
    }
  }, [currentContentId, lastItemId]);

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

      <div className="flex flex-col bg-gray-50 overflow-y-auto" style={{ height: '100dvh' }}>
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
          />
        )}
      </div>
    </>
  );
}