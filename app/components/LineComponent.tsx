"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

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
        <Tooltip
          cursor={false}
          content={({ payload }) => {
            if (!payload || payload.length === 0) return null;
            return (
              <div className="p-2 bg-white text-cap">
                <span>
                  <span style={{ color: chartConfig.color }}>●</span>{" "}
                  {chartConfig.label}
                </span>
                <span className="ml-7" style={{ color: "black" }}>
                  {payload[0].value}
                </span>
              </div>
            );
          }}
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
    </ResponsiveContainer>
  );
}
