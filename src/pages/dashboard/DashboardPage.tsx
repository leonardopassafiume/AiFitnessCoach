import { Activity, Flame, RefreshCw, Route, Sparkles } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useActivities } from "../../features/activities/hooks";
import { ActivityList } from "../../features/activities/components";
import { useCoachBrief } from "../../features/coach/hooks";
import { useMeals } from "../../features/meals/hooks";
import { MealList } from "../../features/meals/components";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { ResponsiveGrid } from "../../shared/components/ResponsiveGrid";
import { formatNumber } from "../../shared/lib/utils";

export function DashboardPage() {
  const { data: activities = [] } = useActivities();
  const { data: meals = [] } = useMeals();
  const { data: coachBrief } = useCoachBrief();

  const weeklyDistance = activities.reduce((total, activity) => total + activity.distanceKm, 0);
  const weeklyCalories = activities.reduce((total, activity) => total + activity.calories, 0);
  const todayCalories = meals
    .filter((meal) => meal.eatenAt.startsWith("2026-05-10"))
    .reduce((total, meal) => total + meal.estimatedCalories, 0);

  const chartData = activities
    .slice()
    .reverse()
    .map((activity) => ({
      date: new Intl.DateTimeFormat("it-IT", { day: "2-digit", month: "2-digit" }).format(new Date(activity.date)),
      km: activity.distanceKm,
    }));

  return (
    <div className="grid min-w-0 gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wide text-moss">Dashboard MVP</p>
          <h1 className="mt-1 text-2xl font-black text-ink sm:text-3xl">Il tuo quadro di oggi</h1>
        </div>
        <Button icon={<RefreshCw size={16} />}>Sync Strava</Button>
      </div>

      <ResponsiveGrid minItemWidth="13.5rem">
        <Kpi icon={<Route size={20} />} label="Km questa settimana" value={`${formatNumber(weeklyDistance, 1)} km`} trend="+12% vs scorsa" />
        <Kpi icon={<Activity size={20} />} label="Allenamenti" value={`${activities.length}`} trend={`${formatNumber(weeklyCalories)} kcal bruciate`} />
        <Kpi icon={<Flame size={20} />} label="Calorie intake oggi" value={formatNumber(todayCalories)} trend="Valori indicativi" />
        <Kpi icon={<Sparkles size={20} />} label="AI suggestion" value="Easy day" trend="35-45 min leggeri" />
      </ResponsiveGrid>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
        <Card title="Distanza ultimi allenamenti">
          <div className="h-[clamp(16rem,34vw,24rem)] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "rgba(53, 95, 79, 0.08)" }} />
                <Bar dataKey="km" fill="#355f4f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Brief AI di oggi">
          <div className="rounded-lg bg-mint/65 p-4">
            <p className="text-lg font-black text-ink">{coachBrief?.title}</p>
            <p className="mt-3 text-sm leading-6 text-ink/75">{coachBrief?.todaySuggestion}</p>
          </div>
          <Button className="mt-4 w-full" icon={<Sparkles size={16} />}>
            Genera AI recap fake
          </Button>
        </Card>
      </div>

      <ResponsiveGrid minItemWidth="22rem" className="gap-6">
        <Card title="Ultime attività">
          <ActivityList activities={activities.slice(0, 3)} />
        </Card>
        <Card title="Ultimi pasti">
          <MealList meals={meals.slice(0, 2)} />
        </Card>
      </ResponsiveGrid>
    </div>
  );
}

function Kpi({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) {
  return (
    <Card>
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink/55">{label}</p>
          <p className="mt-2 break-words text-2xl font-black text-ink sm:text-3xl">{value}</p>
          <p className="mt-2 text-sm font-semibold text-moss">{trend}</p>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-mint text-moss">{icon}</div>
      </div>
    </Card>
  );
}
