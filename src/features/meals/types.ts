export type MealItem = {
  id: string;
  name: string;
  quantityText: string;
  estimatedCalories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  confidence: number;
};

export type Meal = {
  id: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  inputType: "text" | "photo";
  inputText: string;
  eatenAt: string;
  estimatedCalories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  confidence: number;
  items: MealItem[];
};
