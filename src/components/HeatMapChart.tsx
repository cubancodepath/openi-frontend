import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "./ui/chart";

interface HeatMapChartProps {
  data: any[];
  selectedParameters: string[];
}

export default function HeatMapChart({
  data,
  selectedParameters,
}: HeatMapChartProps) {
  const processData = () => {
    return data.map((item) => ({
      hour: new Date(item.timestamp).getHours(),
      contaminant: "COGT",
      value: item["co_gt"],
    }));
  };

  const heatMapData = processData();

  console.log(heatMapData);

  const data_example = [
    { temperature: 10, coLevel: 0.5 },
    { temperature: 15, coLevel: 0.7 },
    { temperature: 20, coLevel: 0.9 },
    { temperature: 25, coLevel: 1.2 },
    { temperature: 30, coLevel: 1.5 },
    { temperature: 35, coLevel: 1.8 },
  ];

  return (
    <ChartContainer
      config={{
        contaminant: {
          label: "CO Level",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="temperature"
          name="Temperature"
          unit="°C"
          label={{ value: "Temperature (°C)", position: "bottom", offset: -5 }}
        />
        <YAxis
          type="number"
          dataKey="coLevel"
          name="CO Level"
          unit="ppm"
          label={{
            value: "CO Level (ppm)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Correlation" data={data_example} fill="#82ca9d" />
      </ScatterChart>
    </ChartContainer>
  );
}
