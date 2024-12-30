"use client";

import { RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { COLORS, CONTAMINANTS } from "@/lib/constants";
import { getAverage } from "@/lib/utils";
import { Droplet, ThermometerSun } from "lucide-react";
import AirQualityScale from "./AirQualityBar";
import AQIParameters from "./AquiParameters";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface AirQualityOverviewProps {
  data: any[];
}

export function AirQualityOverview({ data }: AirQualityOverviewProps) {
  const contaminantsGraph = CONTAMINANTS.map((c, i) => ({
    contaminant: c.label,
    value: getAverage(data, c.value),
    fill: COLORS[i % COLORS.length],
    unit: c.unit,
  }));

  const airQualityIndex = getAverage(data, "air_quality_index");
  const temperature = getAverage(data, "t");
  const humidity = getAverage(data, "rh");

  const config = CONTAMINANTS.reduce((acc, contaminant, index) => {
    acc[contaminant.label] = {
      label: contaminant.label,
      color: COLORS[index % COLORS.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color?: string }>);

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <div className="flex gap-16 items-end p-8">
          <div className="w-1/2 ">
            <div className="flex items-center ">
              <ThermometerSun className="text-muted-foreground" />
              <span className="text-sm font-medium text-accent-foreground">
                {temperature} &deg;C
              </span>
              <ChartContainer
                config={{
                  contaminants: {
                    label: "Contaminants",
                  },
                  ...config,
                }}
                className="mx-auto aspect-square max-h-[250px] flex-1"
              >
                <RadialBarChart
                  data={contaminantsGraph}
                  innerRadius={30}
                  outerRadius={110}
                >
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent hideLabel nameKey="contaminant" />
                    }
                  />
                  <RadialBar dataKey="value" background />
                </RadialBarChart>
              </ChartContainer>
              <Droplet className="text-muted-foreground" />
              <span className="text-sm font-medium text-accent-foreground">
                {humidity} %
              </span>
            </div>
            <AirQualityScale currentValue={Number(airQualityIndex)} />
          </div>
          <div className="w-1/2">
            {/* <HealthAdvise /> */}
            <AQIParameters data={contaminantsGraph} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
