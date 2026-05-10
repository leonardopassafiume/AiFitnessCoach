import { Camera, Plus, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import { MealList } from "../../features/meals/components";
import { useMeals } from "../../features/meals/hooks";
import { Button } from "../../shared/components/Button";
import { Card } from "../../shared/components/Card";
import { Textarea } from "../../shared/components/Input";
import { ResponsiveGrid } from "../../shared/components/ResponsiveGrid";
import { formatNumber } from "../../shared/lib/utils";

export function MealsPage() {
  const { data: meals = [] } = useMeals();
  const [mealText, setMealText] = useState("200g pasta al pomodoro, 150g pollo, 1 cucchiaio olio");
  const [mockResult, setMockResult] = useState<string | null>(null);

  const todayMeals = meals.filter((meal) => meal.eatenAt.startsWith("2026-05-10"));
  const totals = todayMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.estimatedCalories,
      protein: acc.protein + meal.proteinG,
      carbs: acc.carbs + meal.carbsG,
      fat: acc.fat + meal.fatG,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  function handleAnalyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMockResult("Stima AI generata: circa 720 kcal, 45g proteine, 85g carbo, 18g grassi. Valori indicativi.");
  }

  return (
    <div className="grid min-w-0 gap-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-moss">Meal tracking</p>
        <h1 className="mt-1 text-2xl font-black text-ink sm:text-3xl">Pasti e macro</h1>
      </div>

      <ResponsiveGrid minItemWidth="11rem">
        <Total label="Calorie oggi" value={formatNumber(totals.calories)} />
        <Total label="Proteine" value={`${formatNumber(totals.protein)}g`} />
        <Total label="Carbo" value={`${formatNumber(totals.carbs)}g`} />
        <Total label="Grassi" value={`${formatNumber(totals.fat)}g`} />
      </ResponsiveGrid>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)]">
        <Card title="Nuovo pasto">
          <form className="grid gap-4" onSubmit={handleAnalyze}>
            <Textarea
              label="Descrivi il pasto"
              value={mealText}
              onChange={(event) => setMealText(event.target.value)}
              placeholder="Es. riso, salmone, verdure, olio..."
            />
            <ResponsiveGrid minItemWidth="11rem" className="gap-3">
              <Button type="submit" icon={<Sparkles size={16} />}>
                Analizza testo fake
              </Button>
              <Button type="button" variant="secondary" icon={<Camera size={16} />}>
                Carica foto fake
              </Button>
            </ResponsiveGrid>
          </form>
          {mockResult ? (
            <div className="mt-4 rounded-lg border border-moss/15 bg-mint/50 p-4 text-sm font-semibold leading-6 text-ink/75">
              {mockResult}
            </div>
          ) : null}
        </Card>

        <Card title="Pasti di oggi" action={<Button variant="secondary" icon={<Plus size={16} />}>Duplica</Button>}>
          <MealList meals={todayMeals} />
        </Card>
      </div>

      <Card title="Storico recente">
        <MealList meals={meals} />
      </Card>
    </div>
  );
}

function Total({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <p className="text-sm font-semibold text-ink/55">{label}</p>
      <p className="mt-2 text-3xl font-black text-ink">{value}</p>
      <p className="mt-2 text-sm font-semibold text-moss">Stima AI</p>
    </Card>
  );
}
