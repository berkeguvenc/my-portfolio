# Proje Geliştirme Planı: Minimalist Developer / Builder Portfolyosu & Local CMS

## 1. Proje Özeti
Bu proje, modern "Design Engineer / Craft" estetiğinde (Hasan Aydın ve Nim ilhamlı), yüksek performanslı, SEO uyumlu ve açık kaynak paylaşıma hazır bir kişisel portfolyo web sitesidir.
Harici bir veritabanı (SQL/NoSQL) veya harici backend gerektirmez. Tüm içerik yerel bir JSON dosyasında tutulur ve yerel geliştirme ortamında çalışan gizli/korumalı bir `/admin` paneli üzerinden kod yazmadan yönetilebilir.

---

## 2. Teknoloji Yığını (Tech Stack)
- **Framework:** Next.js (App Router, React 19 / 18, TypeScript)
- **Styling:** Tailwind CSS + Radix UI Primitives (shadcn/ui yaklaşımı)
- **Animasyon:** Motion (Framer Motion)
- **İkonlar:** Lucide React + Simple Icons
- **Veri Depolama:** `src/data/portfolio.json` (Local-first, Zero-DB)
- **İçerik Yönetimi:** Next.js Route Handlers (`fs/promises`) destekli yerel `/admin` paneli

---

## 3. Mimari ve Güvenlik Kuralları

### 3.1. Local-First Veri Mimarisi
- Sitedeki tüm dinamik alanlar (Hero, Projeler, Builds, Yetenekler, Deneyim) `src/data/portfolio.json` dosyasından okunur.
- `/admin` paneli üzerinden form güncellenip "Kaydet" dendiğinde, Next.js API Route'u yereldeki `src/data/portfolio.json` dosyasını `fs.writeFile` ile günceller.
- Kullanıcı sadece `git commit` ve `git push` yaparak Vercel / Cloudflare üzerinde sitesini günceller.

### 3.2. Admin Paneli Canlı Ortam Koruması (Security Gating)
- Admin paneli (`/admin`) ve API uç noktası (`/api/admin/*`) sadece geliştirme ortamında ve `.env.local` içinde `ENABLE_ADMIN_PANEL=true` olduğunda erişilebilir olmalıdır.
- Canlıda (Production) bu sayfa çağrıldığında Next.js'in `notFound()` fonksiyonu tetiklenerek **kesinlikle 404 sayfası** döndürülmeli, sayfanın varlığı dahi belli edilmemelidir.

---

## 4. Sayfa Yapısı ve Bileşen Mimarisi

### 4.1. Ana Sayfa Bölümleri (`/`)
1. **Header / Navigasyon:**
   - Sayfa içi yumuşak kaydırma (smooth scroll) bağlantıları (`Work`, `Builds`, `Skills`, `Experience`).
   - CV/Resume indirme butonu ve Tema/İletişim butonları.
2. **Hero Bölümü:**
   - İsim, Unvan (Örn: *Senior Full-Stack Engineer & Builder*).
   - Tek paragraflık odak/misyon yazısı.
   - Durum rozeti: "Available for new projects" (Yeşil pulsing dot efekti).
   - Sosyal medya ikon butonları (GitHub, X, LinkedIn, Email).
3. **Work (Öne Çıkan Projeler):**
   - 2 sütunlu şık kart ızgarası.
   - Kart üstünde büyük mockup görseli, altında başlık, kategori etiketleri (`DASHBOARD`, `MOBILE APP` vb.) ve kısa açıklama.
4. **Builds / Side Projects (Ürünler & Eklentiler):**
   - Yan yana 2-3 sütunlu kompakt kartlar.
   - Uygulama ikonu, platform rozeti (`MACOS APP`, `IOS`, `FIGMA PLUGIN`, `EXTENSION`).
   - Yetkinlik rozetleri (`Design`, `Frontend`, `Backend`, `Database`).
5. **Skills & Tools:**
   - 3 sütunlu kategori kartları (Frontend, AI Workflows, Backend vb.).
   - Altında kullanılan modern geliştirici araçlarının (Cursor, Docker, Figma vb.) minimal logo ızgarası.
6. **Work Experience (Zaman Çizelgesi):**
   - Minimalist liste: `Yıl Aralığı` | `Şirket Adı` | `Pozisyon Unvanı`.
7. **Footer:**
   - Sosyal linkler, telif hakkı ve "Built with Next.js & Tailwind" imzası.

### 4.2. Admin Paneli (`/admin`)
- Minimalist, temiz bir Dashboard UI (shadcn tarzı).
- Sekmeli (Tabs) gezinme:
  - `Genel & Sosyal`: Kişisel bilgiler, unvan, bio, durum, sosyal linkler.
  - `Work (Projeler)`: Proje ekleme, düzenleme, silme, görsel linki atama.
  - `Builds`: Küçük ürünler, etiketler ve platform rozetleri yönetimi.
  - `Skills & Tools`: Kategoriye göre yetenek ve araç yönetimi.
  - `Deneyim`: Zaman çizelgesi kayıtları.
- Üst bar:
  - "Değişiklikleri Kaydet" butonu (`/api/admin/save` POST isteği atar).
  - "JSON Olarak Kopyala / İndir" yedekleme butonu.

---

## 5. Uygulama Adımları (Step-by-Step Roadmap)

### Faz 1: Altyapı ve Veri Modeli
- [ ] TypeScript tip tanımlarını (`src/types/portfolio.ts`) oluştur.
- [ ] Başlangıç verisini içeren `src/data/portfolio.json` dosyasını oluştur.
- [ ] JSON verisini okuyup tip güvenli şekilde döndüren yardımcı fonksiyonu (`src/lib/portfolio.ts`) yaz.

### Faz 2: Admin Paneli ve Dosya Yazma API'si
- [ ] `.env.local` kontrolünü yapan Route Guard mekanizmasını kur.
- [ ] `src/app/api/admin/save/route.ts` API route'unu yaz (`fs.writeFile` ile JSON'ı günceller).
- [ ] `src/app/admin/page.tsx` arayüzünü oluştur (Form alanları, Array yönetimi, Tabs).

### Faz 3: Tasarım Sistemi ve Ana Sayfa Bileşenleri
- [ ] Renk paletini ve tipografiyi yapılandır (`tailwind.config.ts`, `globals.css`).
- [ ] `Navbar` ve `Hero` bileşenlerini tamamla.
- [ ] `ProjectCard` (Work) ve `BuildCard` (Builds) bileşenlerini mikro etkileşimlerle kodla.
- [ ] `SkillsGrid`, `ToolsGrid` ve `ExperienceList` bileşenlerini kodla.
- [ ] `Footer` bileşenini ekle.

### Faz 4: Cila, SEO ve Performans
- [ ] OpenGraph ve meta etiketlerini dinamik bağla (`layout.tsx`).
- [ ] Sayfa içi yumuşak geçişleri ve scroll animasyonlarını Motion ile optimize et.
- [ ] Açık kaynak kullanım için detaylı bir `README.md` hazırla.