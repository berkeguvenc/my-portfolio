# Yol Haritası (Roadmap)

Bu doküman, Minimalist Geliştirici Portfolyosu projesinin mevcut durumunu ve gelecekteki vizyonunu özetlemektedir. Geliştirme sürecini yönlendirmeyi ve açık kaynak katkıda bulunanların projenin nereye gittiğini anlamasına yardımcı olmayı amaçlamaktadır.

## Faz 1: MVP (Mevcut Durum)
- [x] **Yerel (Local-first) JSON Veri Kaynağı:** Tüm portfolyo içeriği `portfolio.json` dosyasında tutulur.
- [x] **Güvenli Yönetim Paneli:** Koda dokunmadan içeriği yönetmek için sadece yerel geliştirmede çalışan `/admin` rotası.
- [x] **Minimalist Arayüz:** Framer Motion mikro etkileşimleri ile desteklenmiş temiz "Design Engineer" estetiği.
- [x] **Temel Bölümler:** Hero, Öne Çıkan Projeler (Work), Yan Projeler (Builds), Yetenekler, İş Deneyimi.
- [x] **Görsel & Dosya Yükleme:** Admin panelinde dosya/görsel yükleme işlemlerini yönetmek için butonlar.
- [x] **Yedekleme Sistemi:** Kolay yedekleme ve taşıma için JSON Dışa/İçe Aktar (Export/Import) özellikleri.

## Faz 2: Sıradaki Adımlar (Planlanan)
- [ ] **Dinamik Detay Sayfaları:** Projeler ve Ürünler için zengin metin (Markdown) destekli özel detay sayfaları (örn., `/work/proje-adi`).
- [ ] **Çok Dilli Yönetim Paneli:** Almanca (de), İspanyolca (es), Fransızca (fr) ve İtalyanca (it) dillerinin i18n altyapısına eklenmesi.
- [ ] **Önceden Ayarlanmış Önyüz Temaları:** Adminin önceden tanımlanmış UI temalarını (Dark, Light, Neon) seçebilmesi ve tüm ziyaretçiler için global olarak uygulanması.

## Faz 3: Gelecek Vizyonu (Fikirler)
- [ ] **Sürükle-Bırak Sıralama:** Admin panelinde projeleri, deneyimleri ve yetenekleri kolayca yeniden sıralayabilme.
- [ ] **Blog / Notlar Bölümü:** Teknik makaleler için Markdown tabanlı minimalist bir blog.
- [ ] **Özel Alan Adı & Analitik Rehberi:** Gizlilik odaklı entegre bir analitik eklentisi ve açık kaynak kullanıcıları için kurulum talimatları.
