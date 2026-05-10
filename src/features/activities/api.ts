import { activities } from "./mockData";

export async function getActivities() {
  return activities;
}

export async function getActivity(activityId: string) {
  return activities.find((activity) => activity.id === activityId) ?? null;
}
