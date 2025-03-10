"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TrendingDown from "../trending/TrendingDown";
import { LineChartComponent } from "./LineClient";

interface CharClientProps<T> {
  data: T[];
  title: string;
  showTrending?: boolean;
  chartConfig: {
    color: string;
    label: string;
    strokeColor: string;
    fillColor: string;
    dataKey: string;
  };
}

export function TopChartclient<T>({
  data,
  title,
  chartConfig,
}: CharClientProps<T>) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="text-h2 font-bold">{data.length}</div>
          {/* showtrending logic here later */}
          <TrendingDown />
        </div>
        <p className="text-xs text-muted-foreground">last 7 days</p>
      </CardContent>
      <div className="h-[60px]">
        <LineChartComponent
          data={data}
          dataKey={chartConfig.dataKey}
          chartConfig={{
            color: chartConfig.color,
            label: chartConfig.label,
            strokeColor: chartConfig.strokeColor,
            fillColor: chartConfig.fillColor,
          }}
        />
      </div>
    </Card>
  );
}
