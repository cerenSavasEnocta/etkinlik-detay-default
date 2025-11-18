import { Edit2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Note {
  id: string;
  content: string;
  date: string;
  contentTitle: string;
}

interface NotesTabProps {
  currentContent: string;
}

export function NotesTab({ currentContent }: NotesTabProps) {
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      contentTitle: "Tasarım Odaklı Düşünmenin Tanımı",
      content:
        "Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Tellus elementum sagittis vitae et leo. Porttitor leo a diam sollicitudin.",
      date: "28.06.2024 - 13:25",
    },
    {
      id: "2",
      contentTitle: "Tasarım Odaklı Düşünmenin Tanımı",
      content:
        "Id donec ultrices tincidunt arcu non. Pharetra vel turpis nunc eget lorem dolor. Aliquam ultrices sagittis orci a scelerisque purus semper. Laoreet id donec ultrices tincidunt arcu non.",
      date: "28.06.2024 - 10:00",
    },
    {
      id: "3",
      contentTitle: "Amaçlar ve Araçlar",
      content:
        "Consectetur adipiscing elit, labore et dolore magna aliqua.",
      date: "28.06.2024 - 10:00",
    },
    {
      id: "4",
      contentTitle:
        "Tasarım Odaklı Düşünmenin Aşamaları - Empati",
      content:
        "Urna tempor pulvinar vivamus fringilla lacus nec metus. Integer nunc posuere at hendrerit semper vel class.",
      date: "27.06.2024 - 10:00",
    },
  ]);
  const [charCount, setCharCount] = useState(0);
  const [highlightedNoteId, setHighlightedNoteId] = useState<string | null>(null);

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const text = e.target.value;
    if (text.length <= 4000) {
      setNoteContent(text);
      setCharCount(text.length);
    }
  };

  const handleSave = () => {
    if (noteContent.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        contentTitle: currentContent,
        content: noteContent,
        date: new Date().toLocaleDateString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setNotes([newNote, ...notes]);
      setNoteContent("");
      setCharCount(0);
      setHighlightedNoteId(newNote.id);
    }
  };

  useEffect(() => {
    if (highlightedNoteId) {
      const timer = setTimeout(() => {
        setHighlightedNoteId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedNoteId]);

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // İçerik başlıklarına göre notları grupla
  const groupedNotes = notes.reduce(
    (acc, note) => {
      if (!acc[note.contentTitle]) {
        acc[note.contentTitle] = [];
      }
      acc[note.contentTitle].push(note);
      return acc;
    },
    {} as Record<string, Note[]>,
  );

  return (
    <div
      className="px-6 py-6"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Not Ekleme Formu */}
        <div className="mb-8">
          <div
            className="border border-gray-200 rounded-lg p-4"
            style={{ backgroundColor: "#fff" }}
          >
            <textarea
              value={noteContent}
              onChange={handleContentChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && noteContent.trim().length >= 3) {
                  e.preventDefault();
                  handleSave();
                }
              }}
              placeholder="Not ekle"
              className="w-full h-20 px-0 text-sm border-0 resize-none focus:outline-none focus:ring-0 mb-3"
              style={{ borderBottom: "1px solid #eee" }}
            />

            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400">
                {charCount}/4000
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setNoteContent("");
                    setCharCount(0);
                  }}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  VAZGEÇ
                </button>
                <button
                  onClick={handleSave}
                  disabled={noteContent.trim().length < 3}
                  className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  KAYDET
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gruplandırılmış Notlar */}
        <div className="space-y-6">
          {Object.entries(groupedNotes).map(
            ([contentTitle, contentNotes]) => (
              <div key={contentTitle}>
                <h3 className="mb-1 text-[rgb(0,0,0)] text-[14px] font-semibold">
                  {contentTitle}
                </h3>
                <div className="space-y-3">
                  {contentNotes.map((note) => (
                    <div
                      key={note.id}
                      className="border rounded-lg p-4 transition-colors duration-300"
                      style={{ 
                        backgroundColor: "#fff",
                        borderColor: note.id === highlightedNoteId ? '#1888FF' : '#e5e7eb'
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="flex-1 text-sm text-gray-700">
                          {note.content}
                        </p>
                        <div className="flex gap-1 flex-shrink-0">
                          <button className="p-1 text-gray-400 hover:text-[#cc1f47]">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(note.id)
                            }
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-2">
                        {note.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}