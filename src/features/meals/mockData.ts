import type { Meal } from "./types";

export const meals: Meal[] = [
  {
    id: "1",
    mealType: "breakfast",
    inputType: "text",
    inputText: "Yogurt greco, banana, avena e miele",
    eatenAt: "2026-05-10T08:15:00.000Z",
    estimatedCalories: 430,
    proteinG: 29,
    carbsG: 62,
    fatG: 8,
    confidence: 0.82,
    items: [
      { id: "1a", name: "Yogurt greco", quantityText: "200g", estimatedCalories: 140, proteinG: 20, carbsG: 8, fatG: 4, confidence: 0.9 },
      { id: "1b", name: "Avena", quantityText: "50g", estimatedCalories: 190, proteinG: 7, carbsG: 32, fatG: 4, confidence: 0.82 },
      { id: "1c", name: "Banana e miele", quantityText: "1 porzione", estimatedCalories: 100, proteinG: 2, carbsG: 22, fatG: 0, confidence: 0.75 },
    ],
  },
  {
    id: "2",
    mealType: "lunch",
    inputType: "text",
    inputText: "Pasta al pomodoro, pollo e olio EVO",
    eatenAt: "2026-05-10T12:45:00.000Z",
    estimatedCalories: 720,
    proteinG: 45,
    carbsG: 85,
    fatG: 18,
    confidence: 0.72,
    items: [
      { id: "2a", name: "Pasta al pomodoro", quantityText: "200g cooked", estimatedCalories: 390, proteinG: 11, carbsG: 75, fatG: 5, confidence: 0.76 },
      { id: "2b", name: "Pollo", quantityText: "150g", estimatedCalories: 250, proteinG: 35, carbsG: 0, fatG: 8, confidence: 0.8 },
      { id: "2c", name: "Olio EVO", quantityText: "1 cucchiaio", estimatedCalories: 80, proteinG: 0, carbsG: 0, fatG: 9, confidence: 0.65 },
    ],
  },
  {
    id: "3",
    mealType: "snack",
    inputType: "photo",
    inputText: "Foto: toast integrale e spremuta",
    eatenAt: "2026-05-09T16:30:00.000Z",
    estimatedCalories: 360,
    proteinG: 16,
    carbsG: 46,
    fatG: 12,
    confidence: 0.64,
    items: [
      { id: "3a", name: "Toast integrale", quantityText: "1 toast", estimatedCalories: 260, proteinG: 14, carbsG: 28, fatG: 10, confidence: 0.66 },
      { id: "3b", name: "Spremuta", quantityText: "250ml", estimatedCalories: 100, proteinG: 2, carbsG: 18, fatG: 2, confidence: 0.62 },
    ],
  },
];
