"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { WeeklyData } from "./weeklyData.types";

interface ChartClientProps {
  data: WeeklyData[];
}

const chartConfig = {
  users: {
    label: "Users",
    color: "#E78B33",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "#4A806A",
  },
  vyMessages: {
    label: "Vy API Messages",
    color: "#08265D",
  },
  sentNotifications: {
    label: "Sent Notifications",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface CustomLabelProps {
  x?: string | number;
  y?: string | number;
  value?: string | number;
  index?: number;
}

export function ChartClient({ data }: ChartClientProps) {
  const renderCustomizedLabel = (dataKey: keyof typeof chartConfig) => {
    function CustomLabel({ x, y, value, index }: CustomLabelProps) {
      if (
        index === data.length - 1 &&
        typeof x === "number" &&
        typeof y === "number" &&
        typeof value === "number"
      ) {
        const label = chartConfig[dataKey].label;

        return (
          <>
            <text
              x={x}
              y={y - 26}
              fill="#FFFFF"
              fontSize={12}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {label}
            </text>
            <text
              x={x}
              y={y - 12}
              fill="#FFFFF"
              fontSize={14}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {value}
            </text>
          </>
        );
      }
      return null;
    }
    return CustomLabel;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <ChartContainer
          config={chartConfig}
          className="flex-grow h-[450px] w-[85%]"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 50,
              top: 25,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="toDate"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(new Date(value), "MMM dd")}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent className={cn("w-[200px]")} />}
            />

            <Line
              dataKey="users"
              type="monotone"
              stroke={chartConfig.users.color}
              strokeWidth={4}
              dot={{
                fill: "#E78B33",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="users"
                content={renderCustomizedLabel("users")}
              />
            </Line>

            <Line
              dataKey="vyMessages"
              type="monotone"
              stroke={chartConfig.vyMessages.color}
              strokeWidth={4}
              dot={{
                fill: "#08265D",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="vyMessages"
                content={renderCustomizedLabel("vyMessages")}
              />
            </Line>

            <Line
              dataKey="subscriptions"
              type="monotone"
              stroke={chartConfig.subscriptions.color}
              strokeWidth={4}
              dot={{
                fill: "#4A806A",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                dataKey="subscriptions"
                content={renderCustomizedLabel("subscriptions")}
              />
            </Line>
          </LineChart>
        </ChartContainer>
        {/* <div className="flex flex-col ml-4 mt-5">
          <p className="text-sm font-medium mb-13">Users</p>
          <p className="text-sm font-medium mb-12">Vy API Messages</p>
          <p className="text-sm font-medium">Subscriptions</p>
        </div> */}
      </CardContent>
    </Card>
  );
}
