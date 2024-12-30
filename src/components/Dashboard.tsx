import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/hooks/useData";
import { DateRange } from "react-day-picker";
import { AirQualityOverview } from "./AirQualityOverview";
import FileUpload from "./FileUpload";
import HeatMapChart from "./HeatMapChart";
import { ParameterSelector } from "./ParameterSelector";
import { PollutantDistribution } from "./PollutantDistribution";
import { DateRangePicker } from "./ui/date-range-picker";

interface DashboardProps {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  selectedParams: string[];
  setSelectedParams: (params: string[]) => void;
}

export function Dashboard({
  dateRange,
  setDateRange,
  selectedParams,
  setSelectedParams,
}: DashboardProps) {
  const { data, isLoading } = useData(dateRange, selectedParams);

  if (!data) return <div>Loading...</div>;

  if (data.length === 0) return <FileUpload onFileUpload={() => {}} />;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Air Quality Dashboard</h1>
      <div className="flex flex-wrap gap-4">
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        <ParameterSelector
          selectedParams={selectedParams}
          setSelectedParams={setSelectedParams}
        />
      </div>
      <AirQualityOverview data={data} />
      {isLoading ? (
        <Card className="p-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pollutant Correlation</CardTitle>
              </CardHeader>
              <CardContent>
                <HeatMapChart data={data} selectedParameters={selectedParams} />
              </CardContent>
            </Card>

            <PollutantDistribution
              data={data}
              selectedParams={selectedParams}
            />
          </div>
        </>
      )}
    </div>
  );
}
