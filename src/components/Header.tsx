import { useState } from "react";
import {
  ChevronLeft,
  Info,
  Star,
  Bookmark,
  MoreVertical,
  User,
  Check,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RatingModal } from "./RatingModal";
import { CertificateModal } from "./CertificateModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface HeaderProps {
  onToggleContentTree: () => void;
  onToggleOverview: () => void;
  isOverviewActive: boolean;
  isContentTreeActive: boolean;
  currentContent: string;
  isAllCompleted: boolean;
}

export function Header({
  onToggleContentTree,
  onToggleOverview,
  isOverviewActive,
  isContentTreeActive,
  currentContent,
  isAllCompleted,
}: HeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] =
    useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] =
    useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  return (
    <>
      <header className="relative bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="flex items-center justify-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
                border: "1px solid #eee",
                color: "#000",
                fontSize: "22px",
              }}
            >
              <span
                className="material-symbols-rounded"
                style={{
                  fontSize: "22px",
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                arrow_back
              </span>
            </button>
            <h2 className="text-gray-900 text-[18px]">
              Kurumlarda Bilişsel Becerileri Geliştirme
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleOverview}
              className={`flex items-center gap-2 h-10 px-4 border border-gray-200 rounded-sm transition-colors ${
                isOverviewActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-black hover:bg-white hover:border-black"
              }`}
              style={{ cursor: "pointer" }}
            >
              <span
                className="material-symbols-rounded"
                style={{
                  fontVariationSettings: "'FILL' 1",
                  fontSize: "22px",
                }}
              >
                info
              </span>
              <span className="text-[16px]">GENEL BAKIŞ</span>
            </button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    disabled={!isAllCompleted}
                    onClick={() =>
                      isAllCompleted &&
                      setIsCertificateModalOpen(true)
                    }
                    className={`w-10 h-10 flex items-center justify-center border border-gray-200 rounded-sm transition-colors ${
                      isAllCompleted
                        ? "cursor-pointer hover:bg-white hover:border-black"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <span
                      className="material-symbols-rounded"
                      style={{
                        fontSize: "22px",
                        fontVariationSettings: "'FILL' 0",
                        color: isAllCompleted
                          ? "#08C472"
                          : "#000",
                      }}
                    >
                      workspace_premium
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isAllCompleted
                      ? "Tebrikler! Sertifikanızı görüntülemek için tıklayın"
                      : "Etkinliği tamamlaman ve başarılı olman durumunda katılım belgesi almaya hak kazanacaksın!"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <button
              onClick={() => setIsRatingModalOpen(true)}
              className="h-10 px-3 flex items-center justify-center gap-1.5 border border-gray-200 rounded-sm hover:bg-white hover:border-black transition-colors"
              style={{ cursor: "pointer" }}
            >
              <Star
                className="w-5 h-5 text-[#ffc845]"
                fill="#ffc845"
              />
              <span className="text-gray-900">(5)</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-sm hover:bg-white hover:border-black transition-colors"
              style={{ cursor: "pointer" }}
            >
              <Bookmark
                className="w-5 h-5 text-black"
                fill={isBookmarked ? "currentColor" : "none"}
              />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-sm hover:bg-white hover:border-black transition-colors"
                  style={{
                    cursor: "pointer",
                    transform: "rotate(90deg)",
                  }}
                >
                  <MoreVertical className="w-5 h-5 text-black" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowThankYouModal(true)}>ÖNER</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={() => setShowThankYouModal(true)}>
                  KAYDIMI SİL
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
      />

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
    </>
  );
}