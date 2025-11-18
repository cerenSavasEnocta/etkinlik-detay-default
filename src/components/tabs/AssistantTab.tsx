import { ThumbsUp, ThumbsDown, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import aiIcon from "@/assets/5693cf52c37b3b4b9945d562801c0f3e7cfaa19e.png";

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
}

export function AssistantTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Merhaba [Kullanıcı Adı], ben eğitim asistanı. Sana eğitim boyunca yardımcı olmak için buradayım.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    {
      text: "Eğitim içeriğini ve amaçlarını kısaca özetleyebilir misin?",
      icon: "frame_inspect",
      color: "#92399A",
    },
    {
      text: "Eğitime ne kadar vakit ayırmam gerekiyor?",
      icon: "sticky_note_2",
      color: "#6C42B4",
    },
    {
      text: "Bu eğitimin mesleki ve kişisel gelişimime katkıları neler olacak?",
      icon: "chat_bubble",
      color: "#E5863E",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "Eğitimine düzenli olarak vakit ayırdığın sürece başarılı olman kaçınılmaz.\n\n3 bölüm, 24 içerikten oluşan toplam 90 dakikalık bu eğitimi bölümlere bölerek günde 30 dakika çalışıp 3 günde tamamlayabilirsin.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="flex flex-col h-full"
        style={{ maxWidth: "1024px", marginTop: "24px" }}
      >
        {/* Header */}
        <div
          className="px-6 py-4"
          style={{
            maxWidth: "1024px",
            backgroundColor: "#fff",
            borderBottom: "1px solid #eee",
          }}
        >
          <div
            className="mx-auto flex items-center justify-between"
            style={{ maxWidth: "1024px" }}
          >
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Eğitim Asistanı</h3>
              <span
                className="px-2 py-0.5 text-xs bg-[#F0ECF7] text-[#6C42B4] rounded"
                style={{ fontWeight: 500 }}
              >
                BETA
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 hover:bg-gray-100 rounded"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="material-symbols-rounded"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  delete
                </span>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded"
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="material-symbols-rounded">
                  arrows_output
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          className="flex-1 overflow-y-auto px-6 py-6"
          style={{ backgroundColor: "#fff" }}
        >
          <div
            className="mx-auto space-y-6"
            style={{
              maxWidth: "1024px",
              backgroundColor: "#fff",
            }}
          >
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === "ai" ? (
                  <div
                    className="flex gap-3"
                    style={{
                      padding: "12px 0px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          "linear-gradient(290deg, #525BCD 0%, #6C42B4 23.67%, #92399A 45.7%, #CB3D7A 68.04%, #E5863E 91.03%)",
                      }}
                    >
                      <img
                        src={aiIcon}
                        alt="AI"
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="flex-1">
                      <div>
                        <p className="text-gray-700 whitespace-pre-line text-[14px]">
                          {message.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                          <ThumbsUp className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                          <ThumbsDown className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div
                      className="px-4 py-3 max-w-[80%]"
                      style={{
                        boxShadow: "none",
                        backgroundColor: "#f8f8f8",
                        border: "1px solid #eee",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    >
                      <p className="text-gray-900 text-[14px]">
                        {message.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div
          className="px-6 py-4"
          style={{ backgroundColor: "#fff" }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Suggested Questions */}
            <div
              className="overflow-x-auto"
              style={{ marginBottom: "10px" }}
            >
              <div className="flex gap-2 pb-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleQuestionClick(question.text)
                    }
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                    style={{
                      width: "fit-content",
                      borderRadius: "60px",
                    }}
                  >
                    <span
                      className="material-symbols-rounded"
                      style={{
                        fontSize: "18px",
                        color: question.color,
                        fontVariationSettings: "'FILL' 0",
                      }}
                    >
                      {question.icon}
                    </span>
                    <span className="text-sm text-gray-700 whitespace-nowrap text-[13px]">
                      {question.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Field */}
            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Yazmaya başla"
                rows={1}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cc1f47] resize-none"
                style={{
                  minHeight: "48px",
                  maxHeight: "120px",
                }}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}