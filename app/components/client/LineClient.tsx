"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface LineChartProps<T> {
  data: T[];
  dataKey: string;
  chartConfig: {
    color: string;
    label: string;
    strokeColor: string;
    fillColor: string;
  };
}

export function LineChartComponent<T>({
  chartConfig,
  data,
  dataKey,
}: LineChartProps<T>) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ChartContainer config={{ [dataKey]: chartConfig }}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey={dataKey} />
          <YAxis /> */}
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" hideLabel />}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={chartConfig.strokeColor}
            strokeWidth={1.9}
            fill={chartConfig.fillColor}
            fillOpacity={0.1}
          />
        </AreaChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
