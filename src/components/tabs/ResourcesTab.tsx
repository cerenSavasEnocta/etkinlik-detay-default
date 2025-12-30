import {
  Download,
  ExternalLink,
  FileText,
  File,
  Image as ImageIcon,
  Video as VideoIcon,
  Music,
  FileArchive,
} from "lucide-react";

type ResourceItem =
  | {
      id: string;
      kind: "file";
      filename: string;
      size: string;
      href: string;
    }
  | {
      id: string;
      kind: "link";
      title: string;
      href: string;
    };

const resources: ResourceItem[] = [
  {
    id: "1",
    kind: "file",
    filename: "filiz_ulusturma.pdf",
    size: "2.1 MB",
    href: "#",
  },
  {
    id: "2",
    kind: "file",
    filename: "tasarim_odakli_dusunmenim_asamalari.pdf",
    size: "1.6 MB",
    href: "#",
  },
  {
    id: "3",
    kind: "file",
    filename: "amaclar_ve_araclar.docx",
    size: "820 KB",
    href: "#",
  },
  {
    id: "4",
    kind: "link",
    title: "IDEO Design Kit – Field Guide",
    href: "https://www.designkit.org/",
  },
];

export function ResourcesTab() {
  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return <FileText className="w-4 h-4 text-gray-600" />;
      case "png":
      case "jpg":
      case "jpeg":
      case "webp":
      case "gif":
        return <ImageIcon className="w-4 h-4 text-gray-600" />;
      case "mp4":
      case "mov":
      case "avi":
        return <VideoIcon className="w-4 h-4 text-gray-600" />;
      case "mp3":
      case "wav":
        return <Music className="w-4 h-4 text-gray-600" />;
      case "zip":
      case "rar":
        return <FileArchive className="w-4 h-4 text-gray-600" />;
      default:
        return <File className="w-4 h-4 text-gray-600" />;
    }
  };

  const getBadgeStyle = (id: { kind: "file"; filename: string } | { kind: "link" }) => {
    if (id.kind === "link") {
      return { bg: "#2563EB", Icon: ExternalLink as React.ComponentType<any> }; // mavi
    }
    const ext = id.filename.split(".").pop()?.toLowerCase();
    let bg = "#4B5563";
    let Icon: React.ComponentType<any> = File;
    if (ext === "pdf") {
      bg = "#E53935";
      Icon = FileText;
    } else if (ext === "doc" || ext === "docx") {
      bg = "#1E88E5";
      Icon = FileText;
    } else if (ext === "xls" || ext === "xlsx") {
      bg = "#2E7D32";
      Icon = FileText;
    } else if (ext === "ppt" || ext === "pptx") {
      bg = "#D84315";
      Icon = FileText;
    } else if (ext === "zip" || ext === "rar") {
      bg = "#6D4C41";
      Icon = FileArchive;
    } else if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext || "")) {
      bg = "#8E24AA";
      Icon = ImageIcon;
    } else if (["mp4", "mov", "avi"].includes(ext || "")) {
      bg = "#CC0000";
      Icon = VideoIcon;
    } else if (["mp3", "wav"].includes(ext || "")) {
      bg = "#5E35B1";
      Icon = Music;
    }
    return { bg, Icon };
  };

  return (
    <div
      className="px-6 py-6"
      style={{ paddingBottom: "50px", backgroundColor: "#f9f9f9" }}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className="space-y-3"
          style={{ backgroundColor: "#fff", padding: "20px" }}
        >
          {resources.map((resource) => {
            if (resource.kind === "file") {
              const { bg, Icon } = getBadgeStyle({ kind: "file", filename: resource.filename });
              return (
                <div
                  key={resource.id}
                  className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded"
                  style={{ padding: "12px", fontSize: "14px" }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded"
                      style={{ backgroundColor: bg }}
                    >
                      <Icon className="w-4 h-4" color="#fff" />
                    </div>
                    <a
                      href={resource.href}
                      className="text-blue-600 hover:underline truncate"
                      style={{ }}
                    >
                      {resource.filename}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{resource.size}</span>
                    <a
                      href={resource.href}
                      className="p-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                      style={{ cursor: "pointer", borderRadius: "2px" }}
                      aria-label="İndir"
                    >
                      <Download className="w-4 h-4 text-gray-700" />
                    </a>
                  </div>
                </div>
              );
            }
            // kind === 'link'
            const { bg, Icon } = getBadgeStyle({ kind: "link" });
            return (
              <div
                key={resource.id}
                className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded"
                style={{ padding: "12px", fontSize: "14px" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon className="w-4 h-4" color="#fff" />
                  </div>
                  <a
                    href={resource.href}
                    className="text-blue-600 hover:underline truncate"
                    style={{ maxWidth: "80%" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {resource.title}
                  </a>
                </div>
                <a
                  href={resource.href}
                  className="p-2 border border-gray-300 hover:bg-gray-50 transition-colors"
                  style={{ cursor: "pointer", borderRadius: "2px" }}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Dış bağlantı"
                >
                  <ExternalLink className="w-4 h-4 text-gray-700" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}