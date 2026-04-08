# Modul de administrare Uzinex

Backend simplu pentru editarea conținutului site-ului. Toate datele sunt
stocate într-un singur tabel `ContentBlock(key, data Json)` în Postgres.

Componentele cad înapoi pe valorile implicite din cod dacă DB-ul lipsește
sau e gol — site-ul nu se sparge niciodată.

## Setup (o singură dată)

### 1. Provizionează Postgres pe Vercel (Neon)
1. Mergi la **Vercel Dashboard → Storage → Create Database → Neon (Postgres)**
2. Conectează-l la proiectul `uzinex-next` — Vercel injectează automat
   `DATABASE_URL`, `POSTGRES_URL`, etc.
3. Pull variabilele local:
   ```bash
   vercel env pull .env.local
   ```

### 2. Setează parola de admin
În **Vercel → Project → Settings → Environment Variables**:
```
ADMIN_PASSWORD = <parola-ta-secretă>
```
Adaugă în `.env.local` aceeași valoare pentru dev local.

### 3. Creează schema în DB
```bash
npx prisma db push       # creează tabelele ContentBlock + AdminSession
npm run db:seed          # populează cu valorile implicite din cod
```

### 4. Deploy
```bash
git push                 # build-ul rulează automat `prisma generate`
```

## Folosire

- **/admin/login** — autentificare cu parola din `ADMIN_PASSWORD`
- **/admin** — listă de blocuri editabile
- **/admin/content/[key]** — editor JSON pentru fiecare bloc

După salvare, Next.js revalidează automat toate paginile (`revalidatePath("/", "layout")`).

## Blocuri deja conectate la DB

| Cheie | Componentă | Status |
|-------|-----------|--------|
| `hero` | `Hero.tsx` | ✅ Wired |
| `case_studies_home` | `CaseStudies.tsx` | ✅ Wired |
| `video_gallery` | `VideoGallery.tsx` | ✅ Wired |
| `testimonials` | `TestimonialMarquee.tsx` | ✅ Wired |
| `news` | `NewsSection.tsx` | ✅ Wired |
| `solutions` | `Solutions.tsx` | ✅ Wired |
| `qa` | `QASection.tsx` | ✅ Wired |
| `contact_cta` | `ContactCTA.tsx` | ✅ Wired |
| `header`, `footer`, `team`, `service`, `cariere`, `catalog_tabs`, `certifications`, `authority`, `case_studies_all` | — | ⏳ Editabile, dar componenta încă citește din cod |

Pentru a conecta o componentă nouă:
1. Exportă `<NUME>_DEFAULT` și acceptă `data?: <NUME>Data | null`
2. Adaugă în `lib/defaults.ts`
3. Pasează prin `app/page.tsx` (sau pagina respectivă) cu `getContents()`
4. Adaugă cheia în `WIRED_KEYS` din `lib/defaults.ts`

## Securitate

- Parola e comparată în timp constant (`lib/auth.ts → checkPassword`)
- Sesiunea e cookie httpOnly + entry în `AdminSession` cu expirare 14 zile
- Middleware-ul (`middleware.ts`) protejează `/admin/*` (excepție `/admin/login`)
- Toate rutele `/api/admin/*` revalidează sesiunea server-side

## Comenzi utile
```bash
npm run db:push       # sincronizează schema Prisma → DB
npm run db:seed       # populează valorile implicite (idempotent — nu suprascrie)
npm run db:studio     # UI Prisma pentru inspectare directă
```
