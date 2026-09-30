# Minimalist Developer Portfolyosu & Yerel CMS

Next.js (App Router), React 19 ve Tailwind CSS ile geliştirilmiş modern, yüksek performanslı ve SEO uyumlu kişisel portfolyo web sitesi. Minimalist "Design Engineer" estetiğine sahiptir ve herhangi bir harici veritabanına ihtiyaç duymadan verilerinizi doğrudan yerel bir JSON dosyasına kaydeden yerleşik bir yerel CMS (Yönetim Paneli) içerir.

## Özellikler

- **Yerel (Local-First) CMS:** Gizli bir `/admin` paneli üzerinden portfolyo verilerinizi düzenleyin. Değişiklikler doğrudan `src/data/portfolio.json` dosyasına kaydedilir.
- **Veritabanı Gerektirmez:** Herhangi bir SQL/NoSQL kurulumuna ihtiyaç duymaz. Sadece JSON dosyanızı commit edip (kaydedip) yayınlamanız yeterlidir.
- **Modern Teknoloji Yığını:** Next.js (App Router), React 19, TypeScript.
- **Şık Arayüz:** Tailwind CSS, akıcı animasyonlar için Framer Motion ve Lucide React ikonları.
- **Güvenli Yönetim Paneli:** `/admin` sayfasına sadece geliştirme ortamında (ortam değişkenleri ile korunur) erişilebilir ve verilerinizi korumak için canlı ortamda (production) 404 sayfası döndürür.

## Başlarken

### 1. Kurulum

Bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
# veya
pnpm install
# veya
bun install
```

### 2. Ortam Değişkenleri Ayarları

Kök dizinde `.env.local` dosyasını kontrol edin veya oluşturun. Yerel geliştirme sırasında yönetim panelini etkinleştirmek için aşağıdaki değişkenin bulunduğundan emin olun:

```env
ENABLE_ADMIN_PANEL=true
```

### 3. Geliştirme Sunucusu

Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
```

Canlı portfolyoyu görmek için tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

### 4. Yönetim Paneli & İçerik Yönetimi

Yerleşik CMS'e erişmek için [http://localhost:3000/admin](http://localhost:3000/admin) adresine gidin. 
Buradan şunları yönetebilirsiniz:
- Genel Bilgiler & Sosyal Medya Bağlantıları
- Öne Çıkan Projeler (Work)
- Yan Projeler (Builds)
- Yetenekler & Araçlar (Skills & Tools)
- İş Deneyimi (Work Experience)

Yönetim panelinde değişikliklerinizi kaydettiğinizde, `src/data/portfolio.json` dosyası otomatik olarak güncellenecektir.

## Dağıtım (Deployment)

Portfolyo, veriler için yerel bir JSON dosyası kullandığından dolayı yayınlamak, kodunuzu [Vercel](https://vercel.com/) gibi bir barındırma sağlayıcısına göndermek (push) kadar basittir.

1. `src/data/portfolio.json` dosyasındaki değişikliklerin commit edildiğinden (kaydedildiğinden) emin olun.
2. Kodunuzu deponuza (GitHub vb.) push'layın.
3. Deponuzu Vercel'e aktarın ve dağıtımı başlatın.

*Not: Canlı ortamda (production), `/admin` paneli güvenlik amacıyla otomatik olarak devre dışı bırakılır (404 döndürür).*

## Yol Haritası

Gelecek özelliklerle ilgileniyor veya projeye katkıda bulunmak mı istiyorsunuz? Planlanan özellikler ve gelecek vizyonumuz için [Yol Haritası](ROADMAP-tr.md) dokümanımıza göz atın.
