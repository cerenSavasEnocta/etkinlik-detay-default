import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const transcriptPages = [
  `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Mi tempus imperdiet nulla malesuada pellentesque elit eget gravida. Tristique nulla aliquet enim tortor at auctor urna. Nisi pretium fusce id velit ut tortor pretium. Varius in at elementum tempus egestas sed. Magna ac placerat vestibulum lectus mauris ultrices eros in. Morbi enim nec dui nunc. Lectus proin nibh nisl condimentum id venenimus at. Tortor at auctor urna nunc id cursus metus. Sem integer vitae justo eget magna fermentum. Tempor posuere orci ac id cursus tortor posuere ac ut. Aliquam faucibus purus in massa tempor nec feugiat nisl. In vitae turpis massa sed elementum tempus egestas sed. Bibendum at varius vel pharetra vel. Sed elementum tempus egestas sed sed risus. Morbi tempus iaculis urna id volutpat lacus. Cursus sit amet dictum sit amet justo donec. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Ut tellus elementum sagittis vitae et leo duis ut diam. Morbi non arcu risus quis varius quam quisque id. Sit amet nulla facilisi morbi tempus iaculis urna id. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. In vitae turpis massa sed elementum tempus egestas sed. Bibendum at varius vel pharetra vel. Sed elementum tempus egestas sed sed risus. Morbi tempus iaculis urna id volutpat lacus. Dictum varius duis at consectetur lorem donec massa sapien faucibus et. Pellentesque adipiscing commodo elit at imperdiet dui. Egestas fringilla phasellus. Cras semper auctor neque vitae tempus quam pellentesque nec nam. Sed id tincidunt ante, neque vitae tempus quam pellentesque nec nam. Sed id tincidunt justo. Vivamus congue, elit id finibus tristique, dolor or augue in magna, porttitor elementum tempus. Mauris nec dui nunc. Lectus proin nibh nisl condimentum id venenimus at. Tortor at auctor urna nunc id cursus metus. Sem integer vitae justo eget magna fermentum. Tempor posuere orci ac id cursus tortor posuere ac ut. Aliquam faucibus purus in massa tempor nec feugiat nisl. Interdum velit laoreet id donec ultrices tincidunt. Aliquam id diam maecenas ultricies mi eget mauris. Commodo ullamcorper a lacus vestibulum sed arcu non odio euismod. Amet nulla facilisi morbi tempor. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt aliquet. Convallis a cras auctor neque.`,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum lorem sed risus ultricies tristique nulla. Vitae elementum curabitur vitae nunc sed velit dignissim sodales. Mauris augue neque gravida in fermentum et sollicitudin ac. Nunc sed id semper risus in hendrerit gravida rutrum. Senectus et netus et malesuada fames ac turpis egestas integer. Ut porttitor leo a diam sollicitudin tempor id eu. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum.`,
];

interface TranscriptTabProps {
  showHeader?: boolean;
}

export function TranscriptTab({ showHeader = true }: TranscriptTabProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 40;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };

  return (
    <div className="px-6 py-6" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="max-w-4xl mx-auto">
      {/* Sayfalama Kontrolleri */}
      {showHeader && (
        <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200" style={{ backgroundColor: "#fff", padding: "20px", borderBottom: "none" }}>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sayfa</span>
            <input
              type="number"
              value={currentPage}
              onChange={handlePageInputChange}
              min={1}
              max={totalPages}
              className="w-12 px-2 py-1 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#cc1f47]"
            />
            <span className="text-sm text-gray-600">/ {totalPages}</span>
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Transkript İçeriği */}
      <div className="max-w-4xl">
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line" style={{ padding: "0px 20px 50px 0px" }}>
          {transcriptPages[currentPage % 2]}
        </p>
      </div>
      </div>
    </div>
  );
}
