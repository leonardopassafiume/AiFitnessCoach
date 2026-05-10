import { useActivities } from "../../features/activities/hooks";
import { ActivityList } from "../../features/activities/components";

export function ActivitiesPage() {
  const { data: activities = [] } = useActivities();

  return (
    <div className="grid min-w-0 gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-moss">Strava mock</p>
        <h1 className="mt-1 text-2xl font-black text-ink sm:text-3xl">Attività importate</h1>
      </div>
      <ActivityList activities={activities} />
    </div>
  );
}
