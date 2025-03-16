"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
import { format, parseISO } from "date-fns";
import { CountData } from "@/app/global.types";

const chartConfig = {
  notifications: {
    label: "Push Notifications",
    color: "#E5E8EC",
  },
} satisfies ChartConfig;

interface NotificationClientProps {
  data: CountData[];
}

export function NotificationClient({ data }: NotificationClientProps) {
  const formattedData = data.map((item) => ({
    ...item,
    formattedDate: format(parseISO(item.fromDate), "MMM dd"),
    notifications: item.count,
  }));

  return (
    <Card className="bg-white dark:bg-grey-800 border dark:border-grey-500 mb-0 min–w-[508px] min-h-[379px]">
      <CardHeader>
        <CardTitle className="font-bold">Push Notifications</CardTitle>
        <CardDescription className="dark:text-grey-100 font-medium">
          Daily total push notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={formattedData}
            margin={{
              left: 12,
              right: 12,
              top: 20,
              bottom: 8,
            }}
          >
            <CartesianGrid
              vertical={true}
              horizontal={false}
              strokeDasharray="5 5"
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={15} />
            <XAxis
              dataKey="formattedDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              name="Push Notifications"
              dataKey="notifications"
              type="linear"
              fill="#3079DB"
              fillOpacity={0.1}
              stroke="#3079DB"
              strokeWidth={3}
              dot={{
                fill: "#3079DB",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                dataKey="notifications"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
