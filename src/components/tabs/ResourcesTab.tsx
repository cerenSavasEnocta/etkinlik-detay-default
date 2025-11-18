import { Download } from "lucide-react";

const resources = [
  {
    id: "1",
    filename: "filiz_ulusturma.pdf",
  },
  {
    id: "2",
    filename: "tasarim_odakli_dusunmenim_asamalari.pdf",
  },
  {
    id: "3",
    filename: "amaçlar_ve_amaçlar.pdf",
  },
];

export function ResourcesTab() {
  return (
    <div
      className="px-6 py-6"
      style={{ paddingBottom: "50px", backgroundColor: "#f9f9f9" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-3" style={{ backgroundColor: "#fff", padding: "20px" }}>
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <a
                href="#"
                className="text-blue-600 hover:underline"
              >
                {resource.filename}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}