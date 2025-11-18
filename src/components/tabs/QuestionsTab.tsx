import {
  Bold,
  Italic,
  List,
  Paperclip,
  Video,
  Image as ImageIcon,
  Smile,
  Heart,
  MessageCircle,
  MoreVertical,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState, useRef } from "react";

interface Comment {
  id: string;
  author: string;
  role: string;
  avatar: string;
  content: string;
  likes: number;
  replies: number;
  date: string;
  attachments?: {
    type: "image" | "video" | "file";
    url: string;
    name?: string;
  }[];
}

const initialComments: Comment[] = [
  {
    id: "1",
    author: "Lee Ryan",
    role: "Blue the Band",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    content:
      "And if you thought you had me fooled I'm telling you now objection overruled. Oh baby...",
    likes: 2,
    replies: 13,
    date: "4 ay önce",
  },
  {
    id: "2",
    author: "Simon Webbe",
    role: "Blue the Band",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    content:
      "I bring you into court to preach my order and you know that you overstepped the border.",
    likes: 2,
    replies: 13,
    date: "4 ay önce",
  },
  {
    id: "3",
    author: "Duncan James",
    role: "Blue the Band",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    content:
      "I just can't wait now the case is open wide. I'll try to pray but the jury will decide. :)",
    likes: 2,
    replies: 13,
    date: "4 ay önce",
  },
];

export function QuestionsTab() {
  const [question, setQuestion] = useState("");
  const [comments, setComments] =
    useState<Comment[]>(initialComments);
  const [attachments, setAttachments] = useState<
    {
      type: "image" | "video" | "file";
      url: string;
      name?: string;
    }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleShare = () => {
    if (question.trim() || attachments.length > 0) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: "Ben",
        role: "Öğrenci",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        content: question,
        likes: 0,
        replies: 0,
        date: "Şimdi",
        attachments:
          attachments.length > 0 ? attachments : undefined,
      };
      setComments([newComment, ...comments]);
      setQuestion("");
      setAttachments([]);
    }
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAttachments([
        ...attachments,
        { type: "file", url, name: file.name },
      ]);
    }
  };

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAttachments([
        ...attachments,
        { type: "image", url, name: file.name },
      ]);
    }
  };

  const handleVideoLink = () => {
    const videoUrl = prompt("Video URL'ini girin:");
    if (videoUrl) {
      setAttachments([
        ...attachments,
        { type: "video", url: videoUrl },
      ]);
    }
  };

  const handleEmoji = () => {
    const emoji = prompt("Emoji ekle (örnek: 😊, 👍, ❤️):");
    if (emoji) {
      setQuestion(question + emoji);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div
      className="px-6 py-6"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Soru Sorma Alanı */}
        <div className="mb-6">
          {/* Toolbar */}
          <div
            className="flex items-center gap-2 mb-0 pb-2 pt-2 border-b border-gray-200"
            style={{
              backgroundColor: "#fff",
              borderRadius: "4px 4px 0px 0px",
            }}
          >
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => {
                const selection = window.getSelection();
                if (selection && selection.toString()) {
                  document.execCommand("bold");
                }
              }}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => {
                const selection = window.getSelection();
                if (selection && selection.toString()) {
                  document.execCommand("italic");
                }
              }}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Metin Alanı */}
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Soruların ve fikirlerini paylaş"
            className="w-full h-24 mb-1 px-0 text-sm border-0 resize-none focus:outline-none focus:ring-0"
            style={{
              borderRadius: "0px 0px 4px 4px",
              backgroundColor: "#fff",
              padding: "12px",
            }}
          />

          {/* Eklenen Dosyalar */}
          {attachments.length > 0 && (
            <div className="mb-3 space-y-2">
              {attachments.map((attachment, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                >
                  {attachment.type === "image" && (
                    <img
                      src={attachment.url}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <span className="text-sm flex-1">
                    {attachment.type === "video" && "🎥 "}
                    {attachment.type === "file" && "📎 "}
                    {attachment.name || attachment.url}
                  </span>
                  <button
                    onClick={() => removeAttachment(index)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Kaldır
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Alt Butonlar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
                style={{ backgroundColor: "#fff" }}
              >
                <Paperclip className="w-4 h-4" />
                <span>Dosya</span>
              </button>
              <button
                onClick={handleVideoLink}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
                style={{ backgroundColor: "#fff" }}
              >
                <Video className="w-4 h-4" />
                <span>Video Link</span>
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                onClick={() => imageInputRef.current?.click()}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
                style={{ backgroundColor: "#fff" }}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Resim</span>
              </button>
              <button
                onClick={handleEmoji}
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
                style={{ backgroundColor: "#fff" }}
              >
                <Smile className="w-4 h-4" />
                <span>Emoji</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="px-4 py-1.5 text-sm bg-black text-white rounded hover:bg-gray-800"
            >
              PAYLAŞ
            </button>
          </div>
        </div>

        {/* Yorumlar */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-3 pb-4 border-b border-gray-100"
            >
              <ImageWithFallback
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm">
                        {comment.author}
                      </h4>
                      <span className="text-xs text-gray-500">
                        · {comment.role}
                      </span>
                      <span className="text-xs text-gray-500">
                        · {comment.date}
                      </span>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {comment.content && (
                  <p className="text-sm text-gray-700 mb-3">
                    {comment.content}
                  </p>
                )}

                {/* Ekleri Göster */}
                {comment.attachments &&
                  comment.attachments.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {comment.attachments.map(
                        (attachment, index) => (
                          <div key={index}>
                            {attachment.type === "image" && (
                              <img
                                src={attachment.url}
                                alt="Attachment"
                                className="max-w-sm rounded"
                              />
                            )}
                            {attachment.type === "video" && (
                              <a
                                href={attachment.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#cc1f47] hover:underline"
                              >
                                🎥 {attachment.url}
                              </a>
                            )}
                            {attachment.type === "file" && (
                              <a
                                href={attachment.url}
                                download
                                className="text-sm text-[#cc1f47] hover:underline"
                              >
                                📎 {attachment.name}
                              </a>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  )}

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#cc1f47]">
                    <Heart className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#cc1f47]">
                    <MessageCircle className="w-4 h-4" />
                    <span>{comment.replies}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}