import { Link } from "react-router-dom";
import { Card } from "../../shared/components/Card";

export function CallbackPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-cloud px-4">
      <Card className="max-w-md">
        <p className="text-lg font-black text-ink">Callback OAuth mock</p>
        <p className="mt-2 text-sm leading-6 text-ink/65">
          Questa pagina è pronta per leggere il redirect Supabase/Strava. La Edge Function Strava arriverà nella fase integrazione.
        </p>
        <Link className="mt-4 inline-block text-sm font-semibold text-moss" to="/dashboard">
          Torna alla dashboard
        </Link>
      </Card>
    </main>
  );
}
