/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

interface PollutantDistribution {
  data: any[];
  selectedParams: string[];
}

export function PollutantDistribution({
  data,
  selectedParams,
}: PollutantDistribution) {
  const latestData = data[data.length - 1];
  const pieData = selectedParams.map((param) => ({
    name: param,
    value: latestData?.[param],
    fill: colors[selectedParams.indexOf(param) % colors.length],
  }));

  const config = selectedParams.reduce((acc, param, index) => {
    acc[param] = {
      label: param,
      color: colors[index % colors.length],
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut Active</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={pieData} dataKey="value">
              <LabelList
                dataKey="browser"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof config) => config[value]?.label}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
