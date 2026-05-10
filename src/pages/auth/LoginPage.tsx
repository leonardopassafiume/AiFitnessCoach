import { Dumbbell } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../../features/auth/hooks";
import { isSupabaseConfigured } from "../../shared/lib/supabase";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { Input } from "../../shared/components/Input";

export function LoginPage() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      navigate("/dashboard");
      return;
    }

    await signIn.mutateAsync({ email, password });
    navigate("/dashboard");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-cloud px-4 py-10">
      <Card className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-mint text-moss">
            <Dumbbell size={22} />
          </div>
          <div>
            <p className="font-black text-ink">Fitness AI Coach</p>
            <p className="text-sm text-ink/55">{isSupabaseConfigured ? "Supabase Auth" : "Demo mode finché mancano le env"}</p>
          </div>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <Input label="Email" type="email" name="email" placeholder="tu@email.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" disabled={signIn.isPending}>
            {signIn.isPending ? "Accesso..." : "Accedi"}
          </Button>
        </form>
        {signIn.error ? <p className="mt-4 rounded-md bg-coral/10 p-3 text-sm font-semibold text-coral">{signIn.error.message}</p> : null}
        <Link className="mt-4 block text-sm font-semibold text-moss" to="/dashboard">
          Entra nella dashboard mock
        </Link>
      </Card>
    </main>
  );
}
