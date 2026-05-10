import { Bike, Dumbbell, Footprints, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import type { Activity } from "./types";
import { formatNumber } from "../../shared/lib/utils";

const sportIcons = {
  Run: Footprints,
  Ride: Bike,
  Strength: Dumbbell,
  Walk: Footprints,
};

export function ActivityList({ activities }: { activities: Activity[] }) {
  return (
    <div className="grid min-w-0 gap-3">
      {activities.map((activity) => {
        const Icon = sportIcons[activity.sportType];

        return (
          <Link
            key={activity.id}
            to={`/activities/${activity.id}`}
            className="grid min-w-0 gap-3 rounded-lg border border-ink/10 bg-white p-4 transition hover:border-moss/40 hover:shadow-soft md:grid-cols-[minmax(0,1fr)_minmax(12rem,0.65fr)]"
          >
            <div className="flex min-w-0 gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-mint text-moss">
                <Icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-ink">{activity.name}</p>
                <p className="text-sm text-ink/55">
                  {new Intl.DateTimeFormat("it-IT", { dateStyle: "medium" }).format(new Date(activity.date))}
                </p>
              </div>
            </div>
            <div className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,4.75rem),1fr))] gap-3 text-left md:text-right">
              <Metric label="Distanza" value={`${formatNumber(activity.distanceKm, 1)} km`} />
              <Metric label="Durata" value={`${activity.durationMin} min`} />
              <Metric label="Ritmo" value={activity.averagePace ?? "-"} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-ink">{value}</p>
    </div>
  );
}

export function ActivityMetric({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-lg border border-ink/10 bg-white p-4">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-cloud text-moss">
        {icon ?? <Timer size={18} />}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-1 break-words text-xl font-black text-ink">{value}</p>
    </div>
  );
}
