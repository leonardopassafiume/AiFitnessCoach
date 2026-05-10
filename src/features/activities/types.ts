export type Activity = {
  id: string;
  name: string;
  sportType: "Run" | "Ride" | "Strength" | "Walk";
  distanceKm: number;
  durationMin: number;
  averagePace?: string;
  elevationGainM: number;
  averageHeartrate?: number;
  calories: number;
  date: string;
  aiBrief: {
    summary: string;
    intensityScore: number;
    fatigueScore: number;
    recoveryAdvice: string;
    positivePoints: string[];
    warnings: string[];
    nextWorkoutSuggestion: {
      type: string;
      durationMinutes: number;
      intensity: "low" | "moderate" | "high";
      reason: string;
    };
  };
};
