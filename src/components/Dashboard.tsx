import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { fetchData } from "../utils/api";
// import { CorrelationHeatmap } from "./CorrelationHeatmap";
import { DateRange } from "react-day-picker";
// import { PollutantDistribution } from "./PollutantDistribution";
// import { StatCards } from "./StatCards";
// import { TimeSeriesChart } from "./TimeSeriesChart";
import { useData } from "@/hooks/useData";
import { StatCards } from "./StatsCard";
import { DateRangePicker } from "./ui/date-range-picker";

interface DashboardProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  // selectedParams: string[];
  // setSelectedParams: (params: string[]) => void;
}

export function Dashboard({
  dateRange,
  setDateRange,
}: // selectedParams,
// setSelectedParams,
DashboardProps) {
  const { data, isLoading, isError } = useData(dateRange);

  if (!data) return <div>Loading...</div>;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Air Quality Dashboard</h1>
      <div className="flex flex-wrap gap-4">
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        {/* <ParameterSelector
          selectedParams={selectedParams}
          setSelectedParams={setSelectedParams}
        /> */}
      </div>
      <StatCards data={data} />
      {isLoading ? (
        <Card className="p-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Time Series Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <TimeSeriesChart data={data} selectedParams={selectedParams} /> */}
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pollutant Correlation</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <CorrelationHeatmap data={data} /> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pollutant Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <PollutantDistribution data={data} /> */}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
