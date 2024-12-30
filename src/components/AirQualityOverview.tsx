/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { COLORS, CONTAMINANTS } from "@/lib/constants";
import { getAverage } from "@/lib/utils";
import { Droplet, ThermometerSun } from "lucide-react";
import AirQualityScale from "./AirQualityBar";
import AQIParameters from "./AquiParameters";

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
