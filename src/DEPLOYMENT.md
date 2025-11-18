# 🚀 Vercel Deployment Rehberi

## Hızlı Başlangıç

### 1. Repository'i Vercel'e Bağla

1. [Vercel Dashboard](https://vercel.com/dashboard)'a git
2. "Add New Project" tıkla
3. GitHub repository'ni seç
4. Deploy butonuna tıkla

### 2. Build Ayarları (Otomatik algılanır)

Vercel otomatik olarak şu ayarları kullanır:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3. Environment Variables (Opsiyonel)

Eğer API key'leri kullanacaksan:

```
VITE_API_URL=your_api_url
VITE_API_KEY=your_api_key
```

## ⚠️ Yaygın Sorunlar ve Çözümler

### Sorun 1: "Boş beyaz ekran" görünüyor

**Neden:** Build sırasında dosyalar bulunamıyor veya import path'leri yanlış

**Çözüm:**
```bash
# Local'de test et
npm install
npm run build
npm run preview
```

Eğer local'de çalışıyorsa ama Vercel'de çalışmıyorsa:
- Vercel build log'larını kontrol et
- Console'da hata var mı bak (F12 → Console)

### Sorun 2: "Module not found" hatası

**Neden:** Import path'leri büyük/küçük harf duyarlı

**Çözüm:**
- Tüm import'ları kontrol et
- `./Components/Header` değil → `./components/Header` olmalı

### Sorun 3: CSS yüklenmiyor

**Neden:** Tailwind CSS 4.0 yapılandırması eksik

**Çözüm:**
- `styles/globals.css` dosyasının var olduğundan emin ol
- `src/main.tsx`'te import edildiğinden emin ol

## ✅ Build Başarı Kontrol Listesi

- [ ] `npm install` hatasız çalışıyor
- [ ] `npm run build` hatasız çalışıyor
- [ ] `npm run preview` ile local'de görünüyor
- [ ] Console'da (F12) hata yok
- [ ] Tüm component'ler render oluyor

## 🔧 Manuel Build Test

```bash
# Temiz build
rm -rf node_modules dist
npm install
npm run build

# Preview
npm run preview
# Tarayıcıda http://localhost:4173 aç
```

## 📝 Vercel CLI ile Deploy

```bash
# Vercel CLI yükle
npm i -g vercel

# Deploy et
vercel

# Production'a deploy et
vercel --prod
```

## 🐛 Debug İpuçları

1. **Vercel Build Log'ları:**
   - Vercel Dashboard → Deployments → Tıkladığın deployment → Build Logs

2. **Browser Console:**
   - Deploy edilen site'ı aç
   - F12 bas → Console tab
   - Kırmızı hataları kontrol et

3. **Network Tab:**
   - F12 → Network tab
   - 404 olan dosyaları kontrol et
   - CSS/JS dosyaları yükleniyor mu?

## 💡 Pro Tips

1. **Her commit otomatik deploy olur** - Vercel GitHub ile entegre
2. **Preview deployment'lar** - Her PR için otomatik preview URL
3. **Environment değişkenleri** - Production ve Preview için ayrı set edebilirsin
4. **Custom domain** - Vercel Dashboard'dan kolayca ekleyebilirsin

## 🎯 Sonraki Adımlar

- [ ] Custom domain ekle
- [ ] Analytics aktif et (Vercel Analytics)
- [ ] Performance monitoring kur
- [ ] Error tracking ekle (Sentry vs.)
