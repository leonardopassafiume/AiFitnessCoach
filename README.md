# Fitness AI Coach

MVP web per una fitness app AI-first: dashboard mock, attività, pasti e coach.

## Avvio

```bash
npm install
npm run dev
```

## Stato

- Fase 1: React mock app funzionante
- Layout: responsive e pannelli principali ridimensionabili
- Fase 2: Supabase client/Auth inizializzati, attivi quando compili `.env.local`
- Integrazioni Strava/Gemini: placeholder Edge Functions pronti per le fasi successive

## Env

Copia `.env.example` in `.env.local` e compila:

```txt
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_APP_URL=http://localhost:5173
```

## Supabase Cloud

Nel progetto Supabase:

1. Apri `Project Settings > API` e copia `Project URL` e `anon public key` in `.env.local`.
2. Apri `SQL Editor` e lancia la migration in `supabase/migrations/20260510120000_initial_schema.sql`.
3. Apri `Authentication > Providers > Email` e abilita email/password.
4. Apri `Authentication > URL Configuration` e imposta:

```txt
Site URL: http://localhost:5173
Redirect URLs:
http://localhost:5173/auth/callback
```

Per deploy web, aggiungi anche l'URL di produzione quando esiste.

## GitHub Remote

Il remote locale punta a:

```txt
https://github.com/leonardopassafiume/AiFitnessCoach.git
```

Per pubblicare modifiche:

```bash
git push origin main
```
