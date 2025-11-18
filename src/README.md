# Learning Management System (LMS)

Öğrenme yönetim sistemi - React, TypeScript, Tailwind CSS ile geliştirilmiştir.

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production önizleme
npm run preview
```

## 📁 Proje Yapısı

```
├── App.tsx              # Ana uygulama bileşeni
├── components/          # Tüm React bileşenleri
│   ├── Header.tsx
│   ├── ContentTree.tsx
│   ├── MainContent.tsx
│   ├── OverviewPanel.tsx
│   ├── SuccessPage.tsx
│   └── tabs/           # Sekme bileşenleri
├── src/
│   └── main.tsx        # Uygulama giriş noktası
├── styles/
│   └── globals.css     # Global stiller
└── index.html          # HTML şablonu
```

## 🎨 Özellikler

- ✅ İçerik ağacı menüsü
- ✅ Video, podcast, e-öğrenme içerikleri
- ✅ İlerleme takip sistemi
- ✅ Otomatik oynatma widget'ı
- ✅ Sertifika sistemi
- ✅ Başarı ekranı
- ✅ Değerlendirme modal'ı
- ✅ Responsive tasarım

## 🛠️ Teknolojiler

- React 18
- TypeScript
- Tailwind CSS 4.0
- Vite
- Radix UI
- Lucide React Icons

## 📦 Deployment

Bu proje Vercel ile deploy edilebilir:

```bash
# Vercel CLI ile
vercel

# Veya GitHub'a push yapın, Vercel otomatik deploy eder
git push origin main
```

## 📝 Notlar

- Tailwind CSS 4.0 kullanılmaktadır
- Tüm Figma asset'lar Lucide icon'larla değiştirilmiştir
- Local development için `npm run dev` komutunu kullanın
