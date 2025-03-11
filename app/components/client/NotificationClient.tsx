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
import { NotificationsData } from "../notifications/notifications.types";
import { format } from "date-fns";

const chartConfig = {
  notifications: {
    label: "Sent Notifications",
    color: "#E5E8EC",
  },
} satisfies ChartConfig;

interface NotificationClientProps {
  data: NotificationsData[];
}

export function NotificationClient({ data }: NotificationClientProps) {
  return (
    <Card className="bg-white dark:bg-grey-800 border dark:border-grey-500">
      <CardHeader>
        <CardTitle className="font-bold">Sent Notifications</CardTitle>
        <CardDescription className="dark:text-grey-100 font-medium">
          Daily total push notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid
              vertical={true}
              horizontal={false}
              strokeDasharray="5 5"
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={15} />
            <XAxis
              dataKey="fromDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(new Date(value), "MMM dd")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="queueUserIds"
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
