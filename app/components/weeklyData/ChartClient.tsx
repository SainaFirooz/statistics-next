"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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

interface ChartClientProps<T> {
  data: T[];
}
const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
  subscriptions: {
    label: "Subscriptions",
    color: "hsl(var(--chart-2))",
  },
  vyMessages: {
    label: "Vy API Messages",
    color: "hsl(var(--chart-3))",
  },
  sentNotifications: {
    label: "Sent Notifications",
    color: "hsl(var(--chart-4))",
  },
  toDate: {
    label: "To Date",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function ChartClient<T>({ data }: ChartClientProps<T>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <ChartContainer
          config={chartConfig}
          className="flex-grow h-[500px] w-[80%]"
        >
          <LineChart
            data={data}
            margin={{
              left: 12,
              right: 12,
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
              type="linear"
              stroke={chartConfig.users.color}
              strokeWidth={4}
              dot={false}
            />
            <Line
              dataKey="vyMessages"
              type="linear"
              stroke={chartConfig.vyMessages.color}
              strokeWidth={4}
              dot={false}
            />
            <Line
              dataKey="subscriptions"
              type="linear"
              stroke={chartConfig.subscriptions.color}
              strokeWidth={4}
              dot={false}
            />
            {/* <Line
              dataKey="sentNotifications"
              type="linear"
              stroke={chartConfig.sentNotifications.color}
              strokeWidth={4}
              dot={false}
            /> */}
          </LineChart>
        </ChartContainer>
        <div className="flex flex-col ml-4 space-y-2">
          <p className="text-sm font-medium">Users</p>
          <h3>1234</h3>
          <p className="text-sm font-medium">Vy API Messages</p>
          <p>12312</p>
          <p className="text-sm font-medium">Subscriptions</p>
          <p>123123</p>
        </div>
      </CardContent>
    </Card>
  );
}
