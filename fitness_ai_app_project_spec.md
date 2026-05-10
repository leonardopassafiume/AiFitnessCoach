# Fitness AI App — Specifica progetto

## 1. Visione del progetto

L'obiettivo è creare una fitness app AI-first che aiuti l'utente ad allenarsi meglio e a gestire alimentazione e calorie in modo semplice.

L'app combina quattro componenti principali:

1. **Strava API** per importare automaticamente gli allenamenti.
2. **AI Coach** per generare analisi, consigli e brief sugli allenamenti.
3. **Performance tracking** per monitorare progressi, carico, trend e recupero.
4. **Meal & calories tracking multimodale** per stimare calorie e macronutrienti da testo, foto e audio.

La promessa del prodotto può essere riassunta così:

> Un coach fitness AI che legge i tuoi allenamenti da Strava, analizza i tuoi progressi e ti aiuta a mangiare meglio con tracking dei pasti multimodale.

---

## 2. MVP: cosa costruire nella prima versione

La prima versione deve essere semplice, funzionante e dimostrabile.

### Feature MVP

- Registrazione e login utente
- Connessione account Strava
- Import delle ultime attività Strava
- Dashboard performance
- AI recap di ogni allenamento
- AI brief settimanale
- Meal tracking testuale
- Meal tracking da foto
- Stima calorie e macro
- Possibilità di correggere manualmente i dati stimati

### Feature da NON mettere subito

Per non rallentare lo sviluppo, nella prima versione eviterei:

- video percorso tipo Strava Premium
- Apple Watch custom sensors
- rilevamento colpi tennis
- social network interno
- marketplace coach
- piani dieta clinici o avanzati
- notifiche troppo complesse

Queste feature possono arrivare in V2 o V3.

---

## 3. Stack tecnologico

### Frontend

Per iniziare:

- React
- Vite
- TypeScript
- React Router
- TanStack Query
- Tailwind CSS

### Backend

- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security
- Supabase Storage
- Supabase Edge Functions

### API esterne

- Strava API
- Gemini API

### Possibile futuro mobile

In futuro, quando l'MVP web funziona:

- React Native / Expo per mobile app
- eventuale watchOS app nativa in Swift

---

## 4. Architettura generale

```txt
React Frontend
   ↓
Supabase Auth
   ↓
Supabase Database / Storage
   ↓
Supabase Edge Functions
   ↓
Strava API / Gemini API
```

### Perché usare Edge Functions

Le Edge Functions servono per nascondere le API key e gestire logica server-side.

Non bisogna mai chiamare Strava o Gemini direttamente dal client se ci sono secret/token sensibili.

Esempi di Edge Functions:

```txt
strava-auth
strava-sync
generate-workout-brief
analyze-meal
```

---

## 5. Struttura progetto frontend

```txt
fitness-ai-app/
├─ src/
│  ├─ app/
│  │  ├─ router.tsx
│  │  ├─ providers.tsx
│  │  └─ config.ts
│  │
│  ├─ pages/
│  │  ├─ auth/
│  │  │  ├─ LoginPage.tsx
│  │  │  └─ CallbackPage.tsx
│  │  ├─ dashboard/
│  │  │  └─ DashboardPage.tsx
│  │  ├─ activities/
│  │  │  ├─ ActivitiesPage.tsx
│  │  │  └─ ActivityDetailPage.tsx
│  │  ├─ meals/
│  │  │  └─ MealsPage.tsx
│  │  └─ coach/
│  │     └─ CoachPage.tsx
│  │
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ api.ts
│  │  │  ├─ hooks.ts
│  │  │  └─ components/
│  │  ├─ strava/
│  │  │  ├─ api.ts
│  │  │  ├─ hooks.ts
│  │  │  ├─ types.ts
│  │  │  └─ components/
│  │  ├─ activities/
│  │  │  ├─ api.ts
│  │  │  ├─ hooks.ts
│  │  │  ├─ types.ts
│  │  │  └─ components/
│  │  ├─ coach/
│  │  │  ├─ api.ts
│  │  │  ├─ hooks.ts
│  │  │  ├─ types.ts
│  │  │  └─ components/
│  │  └─ meals/
│  │     ├─ api.ts
│  │     ├─ hooks.ts
│  │     ├─ types.ts
│  │     └─ components/
│  │
│  ├─ shared/
│  │  ├─ components/
│  │  │  ├─ Button.tsx
│  │  │  ├─ Card.tsx
│  │  │  ├─ Input.tsx
│  │  │  └─ Layout.tsx
│  │  ├─ lib/
│  │  │  ├─ supabase.ts
│  │  │  ├─ queryClient.ts
│  │  │  └─ utils.ts
│  │  └─ types/
│  │     └─ database.types.ts
│  │
│  ├─ styles/
│  │  └─ globals.css
│  │
│  └─ main.tsx
│
├─ supabase/
│  ├─ migrations/
│  ├─ functions/
│  │  ├─ strava-auth/
│  │  ├─ strava-sync/
│  │  ├─ generate-workout-brief/
│  │  └─ analyze-meal/
│  └─ seed.sql
│
├─ .env.local
├─ package.json
├─ vite.config.ts
├─ tsconfig.json
└─ README.md
```

### Regole organizzative

```txt
pages/      = schermate dell'app
features/   = logica di dominio
shared/     = componenti e utility riutilizzabili
app/        = setup generale
supabase/   = backend Supabase
```

---

## 6. Modello dati iniziale

### profiles

Contiene informazioni base dell'utente.

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);
```

---

### strava_connections

Contiene i token Strava dell'utente.

```sql
create table strava_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  strava_athlete_id bigint not null,
  access_token text not null,
  refresh_token text not null,
  expires_at timestamptz not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id),
  unique(strava_athlete_id)
);
```

---

### activities

Contiene gli allenamenti importati da Strava.

```sql
create table activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  strava_activity_id bigint not null,
  name text,
  sport_type text,
  start_date timestamptz,
  distance_m double precision,
  moving_time_s integer,
  elapsed_time_s integer,
  total_elevation_gain_m double precision,
  average_speed_mps double precision,
  max_speed_mps double precision,
  average_heartrate double precision,
  max_heartrate double precision,
  calories double precision,
  raw jsonb,
  created_at timestamptz default now(),
  unique(user_id, strava_activity_id)
);
```

---

### workout_briefs

Contiene i recap AI generati sugli allenamenti.

```sql
create table workout_briefs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  activity_id uuid references activities(id) on delete cascade not null,
  summary text,
  intensity_score integer,
  fatigue_score integer,
  recovery_advice text,
  next_workout_suggestion jsonb,
  raw_ai_response jsonb,
  created_at timestamptz default now()
);
```

---

### meals

Contiene i pasti registrati dall'utente.

```sql
create table meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  meal_type text,
  input_type text,
  input_text text,
  media_url text,
  eaten_at timestamptz default now(),
  estimated_calories double precision,
  protein_g double precision,
  carbs_g double precision,
  fat_g double precision,
  confidence double precision,
  raw_ai_response jsonb,
  created_at timestamptz default now()
);
```

---

### meal_items

Contiene il breakdown degli alimenti dentro ogni pasto.

```sql
create table meal_items (
  id uuid primary key default gen_random_uuid(),
  meal_id uuid references meals(id) on delete cascade not null,
  name text not null,
  quantity_text text,
  estimated_calories double precision,
  protein_g double precision,
  carbs_g double precision,
  fat_g double precision,
  confidence double precision,
  created_at timestamptz default now()
);
```

---

## 7. Row Level Security

Tutte le tabelle con `user_id` devono avere RLS attiva.

Esempio:

```sql
alter table activities enable row level security;

create policy "Users can read own activities"
on activities
for select
using (auth.uid() = user_id);

create policy "Users can insert own activities"
on activities
for insert
with check (auth.uid() = user_id);

create policy "Users can update own activities"
on activities
for update
using (auth.uid() = user_id);

create policy "Users can delete own activities"
on activities
for delete
using (auth.uid() = user_id);
```

Da replicare per:

- profiles
- strava_connections
- activities
- workout_briefs
- meals
- meal_items

---

## 8. Flusso Strava

### Step 1 — Connect Strava

L'utente clicca:

```txt
Connect Strava
```

Il frontend lo manda alla pagina OAuth Strava.

---

### Step 2 — Callback

Dopo il login, Strava rimanda alla tua app con un `code`.

Il frontend chiama la Edge Function:

```txt
strava-auth
```

La function scambia il code per:

- access token
- refresh token
- expiration
- athlete id

Poi salva tutto in `strava_connections`.

---

### Step 3 — Sync attività

L'utente clicca:

```txt
Sync activities
```

Oppure la sync parte automaticamente.

La Edge Function:

```txt
strava-sync
```

fa:

1. legge token Strava da Supabase
2. controlla se il token è scaduto
3. se scaduto, refresh token
4. chiama Strava API
5. salva nuove attività in `activities`

---

## 9. AI Coach

L'AI coach deve trasformare dati grezzi in insight semplici.

### Input

Per ogni allenamento, puoi mandare a Gemini:

```json
{
  "sport_type": "Run",
  "distance_km": 10.2,
  "moving_time_min": 52,
  "average_pace": "5:06/km",
  "elevation_gain_m": 120,
  "average_heartrate": 151,
  "max_heartrate": 174,
  "recent_training_context": {
    "weekly_distance_km": 38,
    "last_7_days_sessions": 4
  }
}
```

### Output richiesto

L'output AI deve essere JSON strutturato.

Esempio:

```json
{
  "summary": "Allenamento aerobico solido con intensità moderata.",
  "intensity_score": 6,
  "fatigue_score": 5,
  "positive_points": [
    "Buon volume per la settimana",
    "Frequenza cardiaca coerente con un medio leggero"
  ],
  "warnings": [
    "Evita un altro allenamento intenso domani"
  ],
  "next_workout_suggestion": {
    "type": "easy_run",
    "duration_minutes": 45,
    "intensity": "low",
    "reason": "Serve recupero attivo dopo il carico accumulato"
  }
}
```

### Regole di sicurezza

L'AI coach non deve sembrare un medico.

Evitare frasi come:

```txt
Sei sovrallenato clinicamente.
Questa dieta è perfetta per te.
Hai un problema cardiaco.
```

Usare invece:

```txt
Potresti essere affaticato.
Considera un giorno leggero.
Questa è una stima indicativa.
```

---

## 10. Performance tracking

La dashboard deve mostrare pochi dati, ma utili.

### Metriche iniziali

- distanza settimanale
- numero allenamenti settimanali
- tempo totale allenamento
- dislivello totale
- passo medio
- frequenza cardiaca media
- calorie stimate
- trend rispetto alla settimana precedente

### Metriche più avanzate in futuro

- training load
- monotony
- strain
- recovery score
- progressione volume
- intensità per zona cardio
- fitness/fatigue/form model

### Dashboard MVP

La dashboard iniziale può avere:

```txt
Card 1: km questa settimana
Card 2: allenamenti questa settimana
Card 3: calorie intake oggi
Card 4: AI suggestion di oggi
Grafico: distanza ultimi 30 giorni
Lista: ultime attività
Lista: ultimi pasti
```

---

## 11. Meal & calories tracking multimodale

L'obiettivo è permettere all'utente di registrare pasti in modo veloce.

### Input supportati

In V1:

- testo
- foto

In V2:

- audio

---

### Flusso testo

Utente scrive:

```txt
200g pasta al pomodoro, 1 cucchiaio d'olio, 150g pollo
```

Il frontend chiama:

```txt
analyze-meal
```

La Edge Function manda il testo a Gemini e salva il risultato.

---

### Flusso foto

Utente carica foto del pasto.

1. foto salvata in Supabase Storage
2. URL o file mandato a Gemini
3. Gemini stima alimenti e macro
4. risultato salvato in `meals` e `meal_items`

---

### Output meal analysis

```json
{
  "meal_name": "Pasta al pomodoro con pollo",
  "estimated_calories": 720,
  "protein_g": 45,
  "carbs_g": 85,
  "fat_g": 18,
  "confidence": 0.72,
  "items": [
    {
      "name": "pasta",
      "quantity": "200g cooked",
      "calories": 310,
      "protein_g": 11,
      "carbs_g": 62,
      "fat_g": 2,
      "confidence": 0.8
    },
    {
      "name": "pollo",
      "quantity": "150g",
      "calories": 250,
      "protein_g": 35,
      "carbs_g": 0,
      "fat_g": 8,
      "confidence": 0.75
    }
  ]
}
```

---

## 12. UX importante per i pasti

La stima da AI non sarà sempre precisa.

Quindi l'utente deve poter:

- modificare gli alimenti riconosciuti
- correggere le quantità
- correggere calorie e macro
- salvare pasti frequenti
- duplicare un pasto

### Label consigliata

Usare sempre copy come:

```txt
Stima AI
Valori indicativi
Correggi quantità
Confidenza media
```

Evitare copy tipo:

```txt
Calorie esatte
Analisi precisa
Dieta perfetta
```

---

## 13. Pagine principali

### LoginPage

- login con email/password oppure magic link
- link privacy policy
- accesso a dashboard dopo login

---

### DashboardPage

Mostra:

- statistiche settimanali
- suggerimento AI del giorno
- ultime attività
- ultimi pasti
- bottone sync Strava

---

### ActivitiesPage

Mostra lista attività:

- nome
- data
- sport
- distanza
- durata
- passo
- HR medio

---

### ActivityDetailPage

Mostra dettaglio attività:

- metriche complete
- AI recap
- suggerimento prossimo allenamento
- eventuali warning

---

### MealsPage

Mostra:

- pasti del giorno
- calorie totali
- proteine/carbo/grassi
- form inserimento testo
- upload foto

---

### CoachPage

Mostra:

- brief settimanale
- suggerimento allenamento
- osservazioni su carico e recupero
- storico consigli AI

---

## 14. React: concetti che devi imparare

Prima di costruire tutto, devi padroneggiare:

### Base

- componenti
- JSX
- props
- state
- `useState`
- `useEffect`
- conditional rendering
- liste con `.map()`
- form

### Intermedio

- React Router
- custom hooks
- TanStack Query
- gestione errori/loading
- component composition

### Con Supabase

- auth client-side
- query da Supabase
- insert/update/delete
- storage upload
- session management

---

## 15. Supabase: concetti che devi imparare

Ordine consigliato:

1. creare progetto Supabase
2. Auth
3. Postgres tables
4. SQL migrations
5. Row Level Security
6. Supabase client in React
7. Storage
8. Edge Functions
9. environment variables
10. deploy

---

## 16. Roadmap sviluppo

### Fase 1 — React mock app

Obiettivo: creare UI con dati finti.

Da costruire:

- layout
- dashboard
- activity cards
- meal cards
- bottone Generate AI Brief fake

Nessun backend.

---

### Fase 2 — Supabase Auth + database

Obiettivo: login reale e dati salvati.

Da costruire:

- login
- profilo utente
- tabella activities manuale
- tabella meals manuale
- RLS

---

### Fase 3 — Strava integration

Obiettivo: importare attività vere.

Da costruire:

- Connect Strava
- OAuth callback
- salva token
- sync attività
- dashboard con dati reali

---

### Fase 4 — AI workout brief

Obiettivo: generare insight sugli allenamenti.

Da costruire:

- Edge Function `generate-workout-brief`
- prompt Gemini
- structured JSON output
- salvataggio in `workout_briefs`
- UI recap attività

---

### Fase 5 — Meal tracking testuale

Obiettivo: stimare macro da testo.

Da costruire:

- form pasto testuale
- Edge Function `analyze-meal`
- Gemini JSON output
- salvataggio `meals` e `meal_items`
- modifica manuale valori

---

### Fase 6 — Meal tracking foto

Obiettivo: stimare macro da immagine.

Da costruire:

- upload immagine
- storage privato
- invio a Gemini
- analisi multimodale
- correzione manuale

---

## 17. Comandi iniziali

Creazione progetto:

```bash
npm create vite@latest fitness-ai-app -- --template react-ts
cd fitness-ai-app
npm install
```

Dipendenze principali:

```bash
npm install @supabase/supabase-js @tanstack/react-query react-router-dom
```

Tailwind:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 18. File `.env.local`

```txt
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=http://localhost:5173
```

Le secret key non devono stare nel frontend.

Queste vanno nelle Edge Functions:

```txt
STRAVA_CLIENT_ID=
STRAVA_CLIENT_SECRET=
GEMINI_API_KEY=
```

---

## 19. Primo obiettivo pratico

Il primo obiettivo non è collegare Strava.

Il primo obiettivo è costruire una dashboard mock funzionante.

### Dashboard mock

Deve mostrare:

- card km settimanali
- card calorie oggi
- lista attività fake
- lista pasti fake
- bottone AI recap fake

Esempio dati fake:

```ts
const activities = [
  {
    id: "1",
    name: "Morning Run",
    sportType: "Run",
    distanceKm: 8.2,
    durationMin: 42,
    averagePace: "5:07/km",
    date: "2026-05-10"
  }
]
```

Quando questa UI funziona bene, sostituisci i mock con Supabase.

---

## 20. Posizionamento prodotto

Il prodotto non deve sembrare solo un calorie tracker.

Il posizionamento migliore è:

> Strava + MyFitnessPal + AI Coach, ma più semplice e più personalizzato.

Oppure:

> Il tuo coach AI per allenamento e alimentazione, connesso ai tuoi dati reali.

---

## 21. Rischi principali

### Rischio 1 — Troppa complessità

Soluzione: partire web, non mobile.

### Rischio 2 — AI poco precisa sui pasti

Soluzione: mostrare confidenza e permettere correzione manuale.

### Rischio 3 — Suggerimenti fitness troppo forti

Soluzione: usare linguaggio prudente e non medico.

### Rischio 4 — API token e privacy

Soluzione: Edge Functions, RLS, storage privato, privacy policy chiara.

### Rischio 5 — Scope creep

Soluzione: niente video, Apple Watch o tennis nella V1.

---

## 22. Versione finale MVP desiderata

Quando l'MVP è pronto, l'utente deve poter fare questo:

```txt
1. Mi registro
2. Connetto Strava
3. Importo gli allenamenti
4. Vedo la dashboard performance
5. Apro un allenamento
6. Ricevo un recap AI
7. Inserisco un pasto con testo o foto
8. Ricevo calorie e macro stimati
9. Correggo se serve
10. Vedo il bilancio giornaliero tra training e alimentazione
```

Se questa esperienza funziona, hai già un prodotto concreto e demoabile.

