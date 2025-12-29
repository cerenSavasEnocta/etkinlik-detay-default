import { Download, X, Loader2, Check } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CompletionModal } from './CompletionModal';

interface FileContentProps {
  onComplete?: () => void;
}

export function FileContent({ onComplete }: FileContentProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'completed'>('idle');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  
  const files = [
    { name: 'fikir_olusturma.pdf', url: '#' },
    { name: 'tasarim_odakli_dusunmenin_asamalari.pdf', url: '#' },
    { name: 'amaclar_ve_araclar.pdf', url: '#' },
  ];

  const handleDownload = () => {
    if (downloadState !== 'idle') return;
    
    setDownloadState('downloading');
    
    // Simüle indirme işlemi - 2 saniye sonra tamamlanacak
    setTimeout(() => {
      setDownloadState('completed');
      setShowCompletionModal(true);
      onComplete?.();
    }, 2000);
  };

  return (
    <div className="relative px-6 py-6 flex flex-col items-center" style={{ backgroundColor: '#f9f9f9' }}>
      {/* Ana Container */}
      <div className="w-full" style={{ maxWidth: '1100px', maxHeight: '77vh', minHeight: '77vh', overflowY: 'auto', paddingTop: '6vh' }}>
        {/* Banner Görseli */}
        <div className="relative w-full overflow-hidden mb-4" style={{ height: '200px' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758518731572-7791381c5ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmd8ZW58MXx8fHwxNzYyMjYzODgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Download Kartı */}
        <div className="bg-white rounded border border-gray-200 p-3 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-[#4CAF50] rounded w-10 h-10 flex items-center justify-center flex-shrink-0">
              <span className="text-white">X</span>
            </div>
            <div>
              <div className="text-sm text-gray-900">
                Gelecek Bilimde – Yeni teknolojiler, uzay keşfi ve yapay zeka üzerine
              </div>
              <div className="text-xs text-gray-500 mt-0.5">2.04 MB</div>
            </div>
          </div>
          <button
            className="ml-4 px-4 py-2 hover:bg-gray-100 rounded transition-colors flex-shrink-0 flex items-center gap-2 border"
            style={{ 
              cursor: downloadState === 'idle' ? 'pointer' : 'default',
              borderColor: '#000',
              color: '#fff',
              backgroundColor: '#000',
            }}
            aria-label="İndir"
            onClick={handleDownload}
            disabled={downloadState !== 'idle'}
          >
            {downloadState === 'idle' && <Download className="w-5 h-5 text-white-900" />}
            {downloadState === 'downloading' && <Loader2 className="w-5 h-5 text-white-900 animate-spin" />}
            {downloadState === 'completed' && <Check className="w-5 h-5 text-white-600" />}
            <span className="text-sm text-white-900">İndir</span>
          </button>
        </div>

        {/* Dosya Linkleri */}

      </div>

      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
      />
    </div>
  );
}
