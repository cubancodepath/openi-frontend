import { fetchDateRangeData } from "@/api/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

function useData(dateRange: DateRange | undefined, parameters: string[] = []) {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchDateRangeData(dateRange?.from, dateRange?.to),
    queryKey: dataKeys.list(JSON.stringify({ dateRange, parameters })),
  });

  return { data, isLoading, isError };
}

export const dataKeys = {
  all: ["data"] as const,
  lists: () => [...dataKeys.all, "lists"] as const,
  list: (filters: string) => [...dataKeys.lists(), filters] as const,
};

export { useData };
