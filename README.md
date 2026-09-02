# DiziFilm

TMDB API'si üzerine kurulu, Türkçe arayüzlü dizi ve film keşif uygulaması.
Trend içerikler, popüler ve en yüksek puanlı yapımlar, detay sayfaları, oyuncu kadrosu,
fragmanlar ve hangi platformda yayınlandığı bilgisi tek yerde.

## Sayfalar

| Yol | İçerik |
|---|---|
| `/` | Bu hafta trend filmler ve diziler, popüler ve en yüksek puanlı seçkiler |
| `/filmler` · `/diziler` | Sıralama sekmeleri ve sayfalama ile tam listeler |
| `/film/[id]` · `/dizi/[id]` | Detay sayfası: özet, puan, oyuncu kadrosu, fragman, yayın platformları |
| `/ara` | Başlığa göre arama |
| `/yayin-akisi` | Yayın akışı görünümü |

## Teknolojiler

Next.js (App Router) · TypeScript · React Server Components · Tailwind CSS · TMDB API

Veri çekme işlemleri sunucu tarafında yapılır (`src/lib/tmdb.ts`), böylece API anahtarı
tarayıcıya hiç gönderilmez.

## Kurulum

```bash
git clone https://github.com/cereenozarslan/dizifilm.git
cd dizifilm
npm install
```

`.env.local` dosyası oluştur ve TMDB okuma anahtarını yaz:

```
TMDB_API_READ_ACCESS_TOKEN=buraya_kendi_tokenini_yaz
```

Anahtarı [themoviedb.org](https://www.themoviedb.org/settings/api) üzerinden ücretsiz alabilirsin.

## Çalıştırma

```bash
npm run dev
```

http://localhost:3000 adresini aç.

## Proje yapısı

```
src/
  app/          sayfalar (App Router)
  components/   MediaCard, CastList, TrailerEmbed, WatchProviders ...
  lib/tmdb.ts   TMDB API istemcisi
  types/tmdb.ts API yanıt tipleri
```

## Not

`.env.local` depoya dahil değildir; anahtarını kendin eklemelisin.
