"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChartComponent } from "./LineClient";
import TrendingUp from "../trending/TrendingUp";
import { TopChartDataInput } from "../topChart/users.types";
import TrendingDown from "../trending/TrendingDown";

interface CharClientProps<TopChartDataInput> {
  days: number;
  data: TopChartDataInput[];
  title: string;
  percentageChange: number;
  total: number;
  chartConfig: {
    color: string;
    label: string;
    strokeColor: string;
    fillColor: string;
    dataKey: string;
  };
}

export function TopChartclient({
  data,
  title,
  total,
  chartConfig,
  days,
  percentageChange,
}: CharClientProps<TopChartDataInput>) {
  const renderTrendIndicator = () => {
    if (Math.abs(percentageChange) < 0.01) {
      return null;
    }
    return percentageChange < 0 ? (
      <TrendingDown percentageChange={percentageChange} />
    ) : (
      <TrendingUp percentageChange={percentageChange} />
    );
  };

  return (
    <Card className="bg-white dark:bg-grey-800  border dark:border-grey-500 min-w-[290px] min-h-[170px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="text-h2 font-bold">{total}</div>
          {renderTrendIndicator()}
        </div>
        <p className="text-xs text-muted-foreground">{`last ${days} days`}</p>
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
