import { useQuery } from "@tanstack/react-query";
import { getActivities, getActivity } from "./api";

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });
}

export function useActivity(activityId: string | undefined) {
  return useQuery({
    queryKey: ["activities", activityId],
    queryFn: () => getActivity(activityId ?? ""),
    enabled: Boolean(activityId),
  });
}
