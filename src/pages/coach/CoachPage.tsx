import { Sparkles } from "lucide-react";
import { useCoachBrief } from "../../features/coach/hooks";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";

export function CoachPage() {
  const { data: brief } = useCoachBrief();

  return (
    <div className="grid min-w-0 gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wide text-moss">AI Coach</p>
          <h1 className="mt-1 text-2xl font-black text-ink sm:text-3xl">Brief settimanale</h1>
        </div>
        <Button icon={<Sparkles size={16} />}>Genera brief fake</Button>
      </div>

      <Card>
        <div className="max-w-[65ch]">
          <p className="text-sm font-bold uppercase tracking-wide text-moss">Sintesi</p>
          <h2 className="mt-2 text-2xl font-black text-ink sm:text-3xl">{brief?.title}</h2>
          <p className="mt-5 text-lg leading-8 text-ink/75">{brief?.weeklySummary}</p>
        </div>
      </Card>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(18rem,0.9fr)_minmax(0,1.1fr)]">
        <Card title="Suggerimento di oggi">
          <p className="rounded-lg bg-mint/60 p-5 text-base font-semibold leading-7 text-ink/80">{brief?.todaySuggestion}</p>
        </Card>
        <Card title="Osservazioni">
          <div className="grid gap-3">
            {brief?.observations.map((observation) => (
              <p key={observation} className="rounded-md border border-ink/10 bg-cloud p-4 text-sm font-semibold leading-6 text-ink/75">
                {observation}
              </p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
