import { fetchDateRangeData } from "@/api/measurements.api";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

function useData(dateRange: DateRange | undefined) {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchDateRangeData(dateRange?.from, dateRange?.to),
    queryKey: dataKeys.list(JSON.stringify(dateRange)),
  });

  return { data, isLoading, isError };
}

const dataKeys = {
  all: ["data"] as const,
  lists: () => [...dataKeys.all, "lists"] as const,
  list: (filters: string) => [...dataKeys.lists(), filters] as const,
};

export { useData };
