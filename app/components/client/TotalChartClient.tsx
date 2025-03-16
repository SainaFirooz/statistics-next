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
import { WeeklyData } from "../weeklyData/weeklyData.types";

interface ChartClientProps {
  data: WeeklyData[];
}

const chartConfig = {
  users: {
    label: "Users",
    color: "#F6A600",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "#4A806A",
  },
  vyMessages: {
    label: "Incidents",
    color: "#015AAA",
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

export function TotalChartClient({ data }: ChartClientProps) {
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
              y={y - 38}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-medium text-sm fill-black dark:fill-gray-100"
            >
              {label}:
            </text>
            <text
              x={x}
              y={y - 18}
              fill="#FFFFF"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-bold text-sm fill-black dark:fill-gray-100"
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
    <Card className="bg-white dark:bg-grey-800 border dark:border-grey-500">
      <CardHeader>
        <CardTitle className="font-bold">Total</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <ChartContainer
          config={chartConfig}
          className="flex-grow h-[354px] w-[85%]"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 69,
              top: 25,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="toDate"
              tickLine={false}
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
                fill: "#F6A600",
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
                fill: "#015AAA",
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
      </CardContent>
    </Card>
  );
}
