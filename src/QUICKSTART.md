# ⚡ Quick Start Guide

## 🎯 Vercel'de Deploy Etmek İçin

### Adım 1: Repository'i Hazırla

```bash
# Tüm değişiklikleri commit et
git add .
git commit -m "Production ready deployment"
git push origin main
```

### Adım 2: Vercel'e Deploy Et

1. **https://vercel.com** → Login
2. **"Add New Project"** tıkla
3. GitHub repository'ni seç
4. **Deploy** butonuna bas
5. ✅ İşlem tamam! 2-3 dakika içinde yayında

### Adım 3: Kontrol Et

Deploy tamamlandıktan sonra Vercel sana bir URL verecek:
- `https://your-project.vercel.app`

Bu URL'i aç ve şunları kontrol et:
- ✅ Sayfa yükleniyor mu?
- ✅ Console'da hata var mı? (F12 → Console)
- ✅ Tüm bileşenler görünüyor mu?

---

## 🔧 Local'de Çalıştırmak İçin

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Development server'ı başlat
npm run dev

# 3. Tarayıcıda aç
# http://localhost:5173
```

---

## 🐛 Sorun Çözme

### "Beyaz ekran" görünüyorsa:

1. **Console'u kontrol et:**
   ```
   F12 → Console tab → Kırmızı hatalar var mı?
   ```

2. **Local'de test et:**
   ```bash
   npm run build
   npm run preview
   ```
   
   Local'de çalışıyor ama Vercel'de çalışmıyorsa:
   - Vercel build log'larını kontrol et
   - Dosya isimlerinde büyük/küçük harf hatası olabilir

3. **Network tab kontrol:**
   ```
   F12 → Network tab → Kırmızı (failed) request'ler var mı?
   ```

### Build hatası alıyorsan:

```bash
# Cache'i temizle
rm -rf node_modules dist .vite
npm install
npm run build
```

### Import hatası alıyorsan:

- Tüm import path'lerini kontrol et
- ✅ Doğru: `./components/Header`
- ❌ Yanlış: `./Components/Header` (büyük C)

---

## 📋 Deployment Checklist

Deploy etmeden önce:

- [ ] `npm run build` çalışıyor
- [ ] `npm run preview` ile local'de görünüyor
- [ ] Console'da hata yok
- [ ] Tüm değişiklikler commit edildi
- [ ] `.env` dosyası `.gitignore`'da (varsa)

---

## 💡 İpuçları

1. **Her push otomatik deploy olur**
   - `main` branch'e push → Otomatik production deploy
   - Diğer branch'lere push → Preview deploy

2. **Preview URL'ler**
   - Her PR için otomatik preview URL oluşur
   - Test için mükemmel!

3. **Environment Variables**
   - Vercel Dashboard → Settings → Environment Variables
   - Production, Preview, Development için ayrı değerler

4. **Custom Domain**
   - Vercel Dashboard → Settings → Domains
   - Kendi domain'ini ekle (örn: `app.example.com`)

---

## 🎓 Dosya Yapısı (Önemli!)

```
Proje Root/
├── App.tsx                  ← Ana component (ROOT'ta!)
├── components/              ← Tüm React components
├── src/
│   └── main.tsx            ← Entry point (src/ içinde!)
├── styles/
│   └── globals.css         ← Tailwind CSS 4.0
├── index.html              ← HTML template
├── package.json            ← Dependencies
├── vite.config.ts          ← Vite config
└── vercel.json             ← Vercel config
```

**ÖNEMLİ:** Bu yapı kasıtlı olarak böyle! 
- `App.tsx` root'ta kalmalı
- `src/main.tsx` onu import ediyor
- Değiştirmeyin!

---

## 🚀 Başarılı Deploy Sonrası

1. **Analytics Ekle:**
   - Vercel Dashboard → Analytics → Enable
   - Ziyaretçi trafiğini görürsün

2. **Monitoring:**
   - Vercel Dashboard → Speed Insights
   - Performance metrikleri

3. **Error Tracking:**
   - Sentry, LogRocket gibi servisler ekle

---

## 📞 Yardım

Sorun yaşıyorsan:

1. **Vercel Logs:** Dashboard → Deployments → Build Logs
2. **Browser Console:** F12 → Console tab
3. **Network Tab:** F12 → Network tab

Hala çözemediysen:
- Vercel Community Forum
- Discord: Vercel Server
- GitHub Issues
