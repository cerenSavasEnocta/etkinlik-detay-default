import {
  Play,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { contentData } from "./ContentTree";
import { AssistantTab } from "./tabs/AssistantTab";
import { NotesTab } from "./tabs/NotesTab";
import { TranscriptTab } from "./tabs/TranscriptTab";
import { QuestionsTab } from "./tabs/QuestionsTab";
import { ResourcesTab } from "./tabs/ResourcesTab";
import { VideoPlayer } from "./VideoPlayer";
import { PodcastPlayer } from "./PodcastPlayer";
import { HtmlContent } from "./HtmlContent";
import { FileContent } from "./FileContent";
import { VirtualClassContent } from "./VirtualClassContent";
import { ClassroomContent } from "./ClassroomContent";
import { ELearningContent } from "./ELearningContent";
import { TaskContent } from "./TaskContent";
import { ExamContent } from "./ExamContent";
import assistantIcon from "@/assets/80779279e75cdac19c322836e71ea305eeb67024.png";

type ContentType =
  | "video"
  | "html"
  | "virtual-class"
  | "podcast"
  | "classroom"
  | "elearning"
  | "task"
  | "file"
  | "exam";

interface MainContentProps {
  onToggleContentTree: () => void;
  currentContent: string;
  contentType: ContentType;
  isContentTreeOpen: boolean;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  onContentComplete: () => void;
  currentContentId: string;
  completedContents: Set<string>;
  onExamResult?: () => void;
}

type TabType =
  | "assistant"
  | "notes"
  | "transcript"
  | "questions"
  | "resources";

export function MainContent({
  onToggleContentTree,
  currentContent,
  contentType,
  isContentTreeOpen,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  onContentComplete,
  currentContentId,
  completedContents,
}: MainContentProps) {
  const [activeTab, setActiveTab] =
    useState<TabType>("assistant");

  const getContentTypeLabel = (type: ContentType): string => {
    const labelMap: { [key in ContentType]: string } = {
      video: "Video",
      html: "HTML İçerik",
      "virtual-class": "Sanal Sınıf",
      podcast: "Podcast",
      classroom: "Sınıf İçi Eğitim",
      elearning: "E-Eğitim",
      task: "Görev",
      file: "Dosya",
      exam: "Sınav",
    };
    return labelMap[type];
  };

  const isTranscriptEnabled =
    contentType === "video" ||
    contentType === "podcast" ||
    contentType === "elearning";

  // Aktif içeriğin puanı (varsa) - video, podcast, elearning, exam için göster
  const findCurrentPoints = (): number | undefined => {
    const stack = [...contentData];
    while (stack.length) {
      const item: any = stack.pop();
      if (!item) continue;
      if (item.id === currentContentId) {
        if (
          ["video", "podcast", "elearning", "exam"].includes(
            item.type,
          )
        ) {
          return item.points ?? 80;
        }
        return undefined;
      }
      if (item.children && item.children.length) {
        stack.push(...item.children);
      }
    }
    return undefined;
  };
  const currentPoints = findCurrentPoints();

  // Eğer transkript bu içerik tipinde desteklenmiyorsa, aktif sekmeyi güvenli bir sekmeye taşı
  useEffect(() => {
    if (!isTranscriptEnabled && activeTab === "transcript") {
      setActiveTab("assistant");
    }
  }, [contentType]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(249,249,249)]">
      {/* İçerik Bilgisi */}
      <div
        className="px-4 py-4 border-b border-gray-200"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleContentTree}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-sm hover:bg-white hover:border-black transition-colors text-[rgb(0,0,0)] bg-white"
              aria-label="İçerik ağacını aç/kapat"
              style={{ cursor: "pointer" }}
            >
              {isContentTreeOpen ? (
                <X className="w-5 h-5 text-black" />
              ) : (
                <Menu className="w-5 h-5 text-black" />
              )}
            </button>
            <div>
              <h2 className="text-gray-900">
                {currentContent}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">
                  {getContentTypeLabel(contentType)} · 10 dk
                </span>
                {currentPoints !== undefined &&
                 completedContents.has(currentContentId) && (
                  <>
                    <span className="text-xs text-[#68D48D]">
                      25 puan
                    </span>
                  </>
                )}
                {completedContents.has(currentContentId) ? (
                  <span className="flex items-center gap-1 text-xs text-[#68D48D]">
                    <ThumbsUp className="w-3 h-3" />
                    {contentType !== "exam" && contentType !== "elearning"
                      ? "Tamamladın"
                      : "Başardın"}
                  </span>
                ) : (
                  <span className="text-xs text-[#818181]">
                    ● Başlamadın
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className={`flex items-center gap-1 h-10 px-3 text-sm border border-gray-200 rounded-sm transition-colors ${
                hasPrevious
                  ? "text-black hover:border-black cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              style={{
                cursor: hasPrevious ? "pointer" : "not-allowed",
                backgroundColor: hasPrevious ? "#fff" : "transparent",
              }}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>GERİ</span>
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`flex items-center gap-1 h-10 px-3 text-sm border border-gray-200 rounded-sm transition-colors ${
                hasNext
                  ? "text-black hover:border-black cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              style={{
                cursor: hasNext ? "pointer" : "not-allowed",
                backgroundColor: hasNext ? "#fff" : "transparent",
              }}
            >
              <span>İLERİ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* İçerik Alanı - contentType'a göre gösterim */}
      {contentType === "video" && (
        <VideoPlayer onComplete={onContentComplete} />
      )}
      {contentType === "podcast" && (
        <PodcastPlayer onComplete={onContentComplete} />
      )}
      {contentType === "virtual-class" && (
        <VirtualClassContent onComplete={onContentComplete} />
      )}
      {contentType === "classroom" && (
        <ClassroomContent onComplete={onContentComplete} />
      )}
      {contentType === "html" && (
        <HtmlContent onComplete={onContentComplete} />
      )}
      {contentType === "file" && (
        <FileContent onComplete={onContentComplete} />
      )}
      {contentType === "elearning" && (
        <ELearningContent onComplete={onContentComplete} />
      )}
      {contentType === "task" && (
        <TaskContent onComplete={onContentComplete} />
      )}
      {contentType === "exam" && (
        <ExamContent
          onComplete={onContentComplete}
          onShowResult={onExamResult}
        />
      )}

      {/* Sekmeler */}
      <div className="border-t border-gray-200 mt-auto sticky bottom-0 z-10 bg-[rgb(249,249,249)]"
      style={{ display: "flex", justifyContent: "center", borderTop: "1px solid #eee" }}>
        <div
          className="flex gap-6"
          style={{
            backgroundColor: "#F9F9F9",
            paddingTop: "20px",
            fontSize: "16px",
            maxWidth: "944px",
            width: "100%",
            borderBottom: "1px solid #eee",
          }}
        >
          <button
            onClick={() => setActiveTab("assistant")}
            className={`px-1 py-3 border-b-2 transition-colors flex items-center gap-2 text-[#6C42B4] ${
              activeTab === "assistant"
                ? "border-[#6C42B4]"
                : "border-transparent"
            }`}
            style={{ cursor: "pointer" }}
          >
            <img
              src={assistantIcon}
              alt=""
              className="w-4 h-[18px]"
            />
            Asistan
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-1 py-3 border-b-2 transition-colors ${
              activeTab === "notes"
                ? "border-black text-black"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            style={{
              cursor: "pointer",
              fontWeight:
                activeTab === "notes" ? 600 : "normal",
            }}
          >
            Notlarım
          </button>
          {isTranscriptEnabled && (
            <button
              onClick={() => setActiveTab("transcript")}
              className={`px-1 py-3 border-b-2 transition-colors ${
                activeTab === "transcript"
                  ? "border-black text-black"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
              style={{
                cursor: "pointer",
                fontWeight:
                  activeTab === "transcript" ? 600 : "normal",
              }}
            >
              Transkript/İçerik metni
            </button>
          )}
          <button
            onClick={() => setActiveTab("questions")}
            className={`px-1 py-3 border-b-2 transition-colors ${
              activeTab === "questions"
                ? "border-black text-black"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            style={{
              cursor: "pointer",
              fontWeight:
                activeTab === "questions" ? 600 : "normal",
            }}
          >
            Soru Sor & Paylaş (4)
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-1 py-3 border-b-2 transition-colors ${
              activeTab === "resources"
                ? "border-black text-black"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            style={{
              cursor: "pointer",
              fontWeight:
                activeTab === "resources" ? 600 : "normal",
            }}
          >
            Ek Kaynaklar
          </button>
        </div>
      </div>

      {/* Sekme ��çerikleri */}
      {activeTab === "assistant" && <AssistantTab />}
      {activeTab === "notes" && (
        <NotesTab currentContent={currentContent} />
      )}
      {activeTab === "transcript" && isTranscriptEnabled && (
        <TranscriptTab showHeader={contentType === "elearning"} />
      )}
      {activeTab === "questions" && <QuestionsTab />}
      {activeTab === "resources" && <ResourcesTab />}
    </div>
  );
}