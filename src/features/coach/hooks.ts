import { useQuery } from "@tanstack/react-query";
import { getCoachBrief } from "./api";

export function useCoachBrief() {
  return useQuery({
    queryKey: ["coach-brief"],
    queryFn: getCoachBrief,
  });
}
