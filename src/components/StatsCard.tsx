import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardsProps {
  data: any[];
}

export function StatCards({ data }: StatCardsProps) {
  const getAverage = (param: string) => {
    const sum = data.reduce((acc, curr) => acc + curr[param], 0);
    return (sum / data.length).toFixed(2);
  };

  const stats = [
    { name: "Avg. CO", value: getAverage("co_gt"), unit: "mg/m³" },
    { name: "Avg. Benzene", value: getAverage("c6h6_gt"), unit: "mg/m³" },
    { name: "Avg. NOx", value: getAverage("nox_gt"), unit: "ppb" },
    { name: "Avg. NO2", value: getAverage("no2_gt"), unit: "ppb" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.unit}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
