import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export interface ContentItem {
  id: string;
  title: string;
  type:
    | "video"
    | "html"
    | "virtual-class"
    | "podcast"
    | "classroom"
    | "elearning"
    | "task"
    | "file"
    | "exam";
  duration?: string;
  typeLabel?: string;
  children?: ContentItem[];
  progress?: number; // 0-100 arası ilerleme yüzdesi
  completed?: boolean; // İçerik tamamlandı mı?
  required?: boolean; // İçerik zorunlu mu?
  points?: number; // Puan bilgisi (video, podcast, elearning, exam)
}

export const contentData: ContentItem[] = [
  {
    id: "1",
    title: "İyi gidiyorsun",
    type: "video",
    duration: "47 Puan",
  },
  {
    id: "2",
    title: "Bilişsel Becerileri Geliştirme",
    type: "video",
    children: [
      {
        id: "2-1",
        title: "İnsan Sınırlarını Aşmak İçin Ne Yapmalı?",
        type: "video",
        typeLabel: "Video",
        duration: "10 dk",
        points: 80,
      },
      {
        id: "2-2",
        title: "Amaçlar ve Araçlar",
        type: "html",
        typeLabel: "HTML İçerik",
        duration: "10 dk",
        required: true,
      },
      {
        id: "2-3",
        title: "Kurumlar İçin Tasarlanan Araç ve Yöntemler",
        type: "file",
        typeLabel: "Dosya",
        duration: "10 dk",
      },
    ],
  },
  {
    id: "3",
    title: "Şirket Çalışanlarının Gelişimi ve Güçlendirilmesi",
    type: "video",
    children: [
      {
        id: "3-1",
        title: "Etkili Ekip Çalışması",
        type: "podcast",
        typeLabel: "Podcast",
        duration: "10 dk",
        points: 80,
      },
      {
        id: "3-2",
        title:
          "Gelişim Odaklı Düşünme",
        type: "virtual-class",
        typeLabel: "Sanal Sınıf",
        duration: "10 dk",
      },
      {
        id: "3-3",
        title: "Mesleki Gelişim Şeması",
        type: "elearning",
        typeLabel: "E-Eğitim",
        duration: "15 dk",
        points: 80,
      },
      {
        id: "3-5",
        title: "Departmanlar Arası İşbirliği ve Ortak Hedef Planlaması",
        type: "task",
        typeLabel: "Görev",
        duration: "10 dk",
      },
      {
        id: "3-6",
        title: "Ölçülebilir Kişisel ve Mesleki Gelişim Hedefleri",
        type: "classroom",
        typeLabel: "Sınıf İçi Eğitim",
        duration: "10 dk",
      },
      {
        id: "3-7",
        title:
          "Bilişsel Süreç Takibi - Sınav",
        type: "exam",
        typeLabel: "Sınav",
        duration: "10 dk",
        points: 80,
      },
    ],
  },
];

interface ContentTreeProps {
  onContentSelect: (
    title: string,
    type: ContentItem["type"],
    id: string,
  ) => void;
  selectedId?: string;
  completedContents?: Set<string>;
  contentProgress?: Record<string, number>;
}

export function ContentTree({
  onContentSelect,
  selectedId: externalSelectedId,
  completedContents = new Set(),
  contentProgress = {},
}: ContentTreeProps) {
  const [expandedItems, setExpandedItems] = useState<
    Set<string>
  >(new Set(["2"]));
  const [internalSelectedId, setInternalSelectedId] =
    useState<string>("2-1");
  const [completedVideos, setCompletedVideos] = useState(1); // Simulates completed video count

  const selectedId = externalSelectedId || internalSelectedId;
  // Seçili içerik bir modülün altındaysa (ör. 3-1), o modülü otomatik aç
  useEffect(() => {
    if (selectedId && selectedId.includes("-")) {
      const parentId = selectedId.split("-")[0];
      setExpandedItems((prev) => {
        if (prev.has(parentId)) return prev;
        const next = new Set(prev);
        next.add(parentId);
        return next;
      });
    }
  }, [selectedId]);

  // Tüm içerikleri ve tamamlananları hesapla
  const calculateProgress = () => {
    let totalContents = 0;
    let completedCount = 0;
    let scoreEligibleCompleted = 0;
    const scoreTypes = new Set(["video", "podcast", "elearning", "exam"]);

    const countContents = (items: ContentItem[]) => {
      items.forEach((item) => {
        // İlk item (id: "1") progress hesabına dahil edilmez
        if (item.id !== "1") {
          if (!item.children || item.children.length === 0) {
            // Sadece child olmayan (gerçek içerik) itemları say
            totalContents++;

            // Tamamlanmış mı kontrol et
            const isCompletedStatic = item.completed;
            const isCompletedDynamic = completedContents.has(
              item.id,
            );

            if (isCompletedStatic || isCompletedDynamic) {
              completedCount++;
              if (scoreTypes.has(item.type)) {
                scoreEligibleCompleted++;
              }
            }
          } else {
            // Child'ları say
            countContents(item.children);
          }
        }
      });
    };

    countContents(contentData);

    const percentage =
      totalContents > 0
        ? (completedCount / totalContents) * 100
        : 0;
    const percentageRounded = Math.round(percentage);
    const pointsScore = Math.min(scoreEligibleCompleted * 25, 100);

    return {
      totalContents,
      completedCount,
      percentage,
      percentageRounded,
      pointsScore,
    };
  };

  const progressData = calculateProgress();
  const allCompleted =
    progressData.totalContents > 0 &&
    progressData.completedCount === progressData.totalContents;

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const CircularProgress = ({
    progress,
  }: {
    progress: number;
  }) => {
    const size = 28;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset =
      circumference - (progress / 100) * circumference;

    return (
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#68D48D"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    );
  };

  const getIcon = (type: string, item?: ContentItem) => {
    const iconMap: { [key: string]: string } = {
      video: "play_arrow",
      html: "folder_code",
      "virtual-class": "cast_for_education",
      podcast: "record_voice_over",
      classroom: "local_library",
      elearning: "contextual_token",
      task: "my_location",
      file: "lab_profile",
      exam: "edit_document",
    };

    const iconName = iconMap[type] || "play_arrow";

    // Dinamik olarak tamamlanmış içerikler için check ikonu
    const isCompletedDynamic =
      item?.id && completedContents.has(item.id);

    // Tamamlanmış içerikler için check ikonu (statik veya dinamik)
    if (item?.completed || isCompletedDynamic) {
      return (
        <div className="flex items-center justify-center w-7 h-7 rounded-[34px] border-2 border-[#68D48D] text-[16px]">
          <span className="material-symbols-rounded text-[16px] text-[#68D48D]">
            check
          </span>
        </div>
      );
    }

    // contentProgress'den progress değerini al
    const dynamicProgress = item?.id
      ? contentProgress[item.id]
      : undefined;
    const progress =
      item?.progress !== undefined
        ? item.progress
        : dynamicProgress;

    // İlerleme olan içerikler için circular progress
    if (progress !== undefined && progress > 0) {
      return (
        <div className="relative flex items-center justify-center w-7 h-7">
          <CircularProgress progress={progress} />
          <span
            className="material-symbols-rounded text-[12px] absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {iconName}
          </span>
        </div>
      );
    }

    // Normal durum
    return (
      <div className="flex items-center justify-center w-7 h-7 rounded-[34px] border border-gray-200 text-[16px]">
        <span className="material-symbols-rounded text-[16px]">
          {iconName}
        </span>
      </div>
    );
  };

  const handleItemClick = (
    item: ContentItem,
    hasChildren: boolean,
  ) => {
    if (hasChildren) {
      toggleExpand(item.id);
    } else {
      setInternalSelectedId(item.id);
      onContentSelect(item.title, item.type, item.id);
    }
  };

  const renderItem = (item: ContentItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = !!(
      item.children && item.children.length > 0
    );
    const isSelected = selectedId === item.id;
    const isFirstItem = item.id === "1";

    // İlk item özel styling
    if (isFirstItem) {
      return (
        <div
          key={item.id}
          className="mb-2"
          style={{
            backgroundColor: "#fff",
            marginLeft: "16px",
            marginRight: "16px",
            padding: "20px 12px 20px 12px",
            border: "1px solid #eee",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
            className="mb-1.5"
          >
            <div className="flex items-center gap-1.5">
              <div
                className="text-xs"
                style={{
                  color: "#0D7ABA",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                {item.title}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        className="material-symbols-rounded"
                        style={{
                          fontSize: "16px",
                          color: "#666",
                          fontVariationSettings: "'FILL' 0",
                        }}
                      >
                        help
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    align="start"
                    className="p-0 border-none shadow-lg [&>span]:hidden"
                    style={{
                      backgroundColor: "#fff",
                      maxWidth: "320px",
                    }}
                  >
                    <div className="p-4">
                      {/* Tamamlama Kuralları */}
                      <div className="mb-4">
                        <h4
                          className="mb-2"
                          style={{
                            fontSize: "14px",
                            color: "#000",
                          }}
                        >
                          Eğitimi nasıl tamamlayabilirim?
                        </h4>
                        <div className="flex items-start gap-2">
                      <span
                            className="material-symbols-rounded flex-shrink-0"
                            style={{
                              fontSize: "18px",
                          color:
                            (allCompleted || completedVideos >= 1)
                              ? "#68D48D"
                              : "#EF4444",
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                        {(allCompleted || completedVideos >= 1)
                          ? "check_circle"
                          : "cancel"}
                          </span>
                          <p
                            className="text-gray-600"
                            style={{ fontSize: "13px" }}
                          >
                            Eğitimde yer alan video içeriklerden
                            en az 1 tanesini bitirdiğinde
                          </p>
                        </div>
                      </div>

                      {/* Başarma Kuralları */}
                      <div>
                        <h4
                          className="mb-2"
                          style={{
                            fontSize: "14px",
                            color: "#000",
                          }}
                        >
                          Eğitimi nasıl başarabilirim?
                        </h4>
                        <div className="flex items-start gap-2">
                      <span
                            className="material-symbols-rounded flex-shrink-0"
                            style={{
                              fontSize: "18px",
                          color:
                            (allCompleted || completedVideos >= 2)
                              ? "#68D48D"
                              : "#EF4444",
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                        {(allCompleted || completedVideos >= 2)
                          ? "check_circle"
                          : "cancel"}
                          </span>
                          <p
                            className="text-gray-600"
                            style={{ fontSize: "13px" }}
                          >
                            Eğitimde yer alan video içeriklerden
                            en az 2 tanesini bitirdiğinde
                          </p>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="pointWrapper">
              <span>{progressData.pointsScore} </span>Puan
            </div>
          </div>
          <div
            className="w-full bg-gray-200 rounded-full relative overflow-hidden"
            style={{ height: "18px" }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                backgroundColor: "#68D48D",
                width:
                  progressData.percentageRounded === 0
                    ? "0%"
                    : `${Math.max(1, progressData.percentageRounded)}%`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000",
                }}
              >
                %{progressData.percentageRounded}
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={item.id}>
        <div
          className={`flex items-center gap-2 px-4 py-2 hover:bg-[#fff] cursor-pointer transition-colors ${
            level > 0 ? "pl-4" : "pl-4"
          } ${isSelected ? "bg-blue-50" : ""}`}
          onClick={() => handleItemClick(item, hasChildren)}
          style={{ cursor: "pointer" }}
        >
          {hasChildren ? (
            <button
              className="shrink-0 mr-[-15px]"
              style={{ cursor: "pointer" }}
            >
              {isExpanded ? (
                <ChevronDown className="w-[18px] h-[18px] text-gray-600" />
              ) : (
                <ChevronRight className="w-[18px] h-[18px] text-gray-600" />
              )}
            </button>
          ) : (
            <div className="w-[18px]" />
          )}

          <div className="shrink-0">
            {!item.children && getIcon(item.type, item)}
          </div>

          <div className="flex-1 min-w-0 gap-1">
            <div
              className="text-xs text-gray-900"
              style={
                hasChildren
                  ? { fontWeight: 600, lineHeight: "18px" }
                  : { fontWeight: 400, lineHeight: "18px" }
              }
            >
              {item.title}
            </div>
            {(item.typeLabel || item.duration) && (
              <div className="flex items-center mt-0.5">
                {item.typeLabel && (
                  <span className="text-[12px] text-[rgb(129,129,129)]">
                    {item.typeLabel}
                  </span>
                )}
                {item.typeLabel && item.duration && (
                  <div
                    className="rounded-md bg-[#818181]"
                    style={{
                      width: "4px",
                      height: "4px",
                      margin: "0px 4px",
                    }}
                  />
                )}
                {item.duration && (
                  <span className="text-[12px] text-[rgb(129,129,129)]">
                    {item.duration}
                  </span>
                )}
                {/* Puan - yalnızca video, podcast, elearning ve exam */}
                {(() => {
                  const isCompleted =
                    !!item.completed || completedContents.has(item.id);
                  return (
                    ["video", "podcast", "elearning", "exam"].includes(
                      item.type,
                    ) && isCompleted
                  );
                })() && (
                  <>
                    <div
                      className="rounded-md bg-[#818181]"
                      style={{
                        width: "4px",
                        height: "4px",
                        margin: "0px 4px",
                      }}
                    />
                    <span
                      className="text-[12px]"
                      style={{ color: "#68D48D", fontWeight: 600 }}
                    >
                      25 puan
                    </span>
                  </>
                )}
                {item.required && (
                  <span
                    className="text-[12px]"
                    style={{
                      color: "#FF595C",
                      marginLeft: "10px",
                    }}
                  >
                    Zorunlu
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) =>
              renderItem(child, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="py-3 sticky top-0 z-10"
      style={{ backgroundColor: "#F9F9F9" }}
    >
      {contentData.map((item) => renderItem(item))}
    </div>
  );
}