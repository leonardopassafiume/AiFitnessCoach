import { AlertTriangle, Flame, HeartPulse, Mountain, Route, Sparkles, Timer } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ActivityMetric } from "../../features/activities/components";
import { useActivity } from "../../features/activities/hooks";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { ResponsiveGrid } from "../../shared/components/ResponsiveGrid";
import { formatNumber } from "../../shared/lib/utils";

export function ActivityDetailPage() {
  const { activityId } = useParams();
  const { data: activity, isLoading } = useActivity(activityId);

  if (isLoading) {
    return <p className="text-ink/70">Caricamento attività...</p>;
  }

  if (!activity) {
    return (
      <Card>
        <p className="font-bold text-ink">Attività non trovata.</p>
        <Link className="mt-3 inline-block text-sm font-semibold text-moss" to="/activities">
          Torna alle attività
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid min-w-0 gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wide text-moss">{activity.sportType}</p>
          <h1 className="mt-1 break-words text-2xl font-black text-ink sm:text-3xl">{activity.name}</h1>
          <p className="mt-2 text-ink/55">
            {new Intl.DateTimeFormat("it-IT", { dateStyle: "full" }).format(new Date(activity.date))}
          </p>
        </div>
        <Button icon={<Sparkles size={16} />}>Rigenera brief fake</Button>
      </div>

      <ResponsiveGrid minItemWidth="12rem">
        <ActivityMetric icon={<Route size={18} />} label="Distanza" value={`${formatNumber(activity.distanceKm, 1)} km`} />
        <ActivityMetric icon={<Timer size={18} />} label="Durata" value={`${activity.durationMin} min`} />
        <ActivityMetric icon={<Mountain size={18} />} label="Dislivello" value={`${formatNumber(activity.elevationGainM)} m`} />
        <ActivityMetric icon={<HeartPulse size={18} />} label="HR media" value={`${activity.averageHeartrate ?? "-"} bpm`} />
      </ResponsiveGrid>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)]">
        <Card title="Recap AI">
          <p className="text-lg font-bold leading-7 text-ink">{activity.aiBrief.summary}</p>
          <ResponsiveGrid className="mt-5" minItemWidth="8rem">
            <Score label="Intensità" value={activity.aiBrief.intensityScore} />
            <Score label="Fatica" value={activity.aiBrief.fatigueScore} />
          </ResponsiveGrid>
          <p className="mt-5 rounded-lg bg-mint/60 p-4 text-sm leading-6 text-ink/75">{activity.aiBrief.recoveryAdvice}</p>
        </Card>

        <Card title="Prossimo allenamento">
          <div className="grid min-w-0 gap-4 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="rounded-lg bg-cloud p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-ink/45">Suggerimento</p>
              <p className="mt-2 text-2xl font-black text-ink">{activity.aiBrief.nextWorkoutSuggestion.type}</p>
              <p className="mt-1 text-sm text-ink/60">
                {activity.aiBrief.nextWorkoutSuggestion.durationMinutes} min · intensità {activity.aiBrief.nextWorkoutSuggestion.intensity}
              </p>
              <p className="mt-4 text-sm leading-6 text-ink/75">{activity.aiBrief.nextWorkoutSuggestion.reason}</p>
            </div>
            <div className="grid gap-3">
              {activity.aiBrief.positivePoints.map((point) => (
                <p key={point} className="rounded-md border border-moss/15 bg-white p-3 text-sm font-semibold text-ink/75">
                  {point}
                </p>
              ))}
              {activity.aiBrief.warnings.map((warning) => (
                <p key={warning} className="flex gap-2 rounded-md border border-amber/25 bg-amber/10 p-3 text-sm font-semibold text-ink/75">
                  <AlertTriangle className="shrink-0 text-amber" size={17} />
                  {warning}
                </p>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card title="Energia">
        <ActivityMetric icon={<Flame size={18} />} label="Calorie stimate" value={formatNumber(activity.calories)} />
      </Card>
    </div>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-cloud p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-1 text-3xl font-black text-ink">{value}/10</p>
    </div>
  );
}
