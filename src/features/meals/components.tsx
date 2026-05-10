import { Camera, Pencil, Utensils } from "lucide-react";
import type { Meal } from "./types";
import { Button } from "../../shared/components/Button";
import { formatNumber } from "../../shared/lib/utils";

const mealLabels = {
  breakfast: "Colazione",
  lunch: "Pranzo",
  dinner: "Cena",
  snack: "Snack",
};

export function MealList({ meals }: { meals: Meal[] }) {
  return (
    <div className="grid min-w-0 gap-3">
      {meals.map((meal) => (
        <article key={meal.id} className="min-w-0 rounded-lg border border-ink/10 bg-white p-4">
          <div className="flex min-w-0 flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-coral/10 text-coral">
                {meal.inputType === "photo" ? <Camera size={20} /> : <Utensils size={20} />}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-moss">{mealLabels[meal.mealType]}</p>
                <h3 className="mt-0.5 break-words font-black text-ink">{meal.inputText}</h3>
                <p className="mt-1 text-sm text-ink/55">
                  Stima AI · Confidenza {Math.round(meal.confidence * 100)}%
                </p>
              </div>
            </div>
            <Button variant="secondary" icon={<Pencil size={16} />}>
              Correggi
            </Button>
          </div>
          <div className="mt-4 grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,6rem),1fr))] gap-3">
            <Macro label="Kcal" value={formatNumber(meal.estimatedCalories)} />
            <Macro label="Proteine" value={`${formatNumber(meal.proteinG)}g`} />
            <Macro label="Carbo" value={`${formatNumber(meal.carbsG)}g`} />
            <Macro label="Grassi" value={`${formatNumber(meal.fatG)}g`} />
          </div>
        </article>
      ))}
    </div>
  );
}

function Macro({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-md bg-cloud px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-1 break-words font-black text-ink">{value}</p>
    </div>
  );
}
