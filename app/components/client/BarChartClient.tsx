"use client";
import { CountData } from "@/app/global.types";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartConfig = {
  users: {
    label: "Users",
    color: "#F6A600",
  },
  notifications: {
    label: "Notifications",
    color: "#4A806A",
  },
  incidents: {
    label: "Incidents",
    color: "#3079DB",
  },
} satisfies ChartConfig;

interface BarChartProps {
  users: CountData[];
  notifications: CountData[];
  incidents: CountData[];
}
export function BarChartComponent({
  users,
  notifications,
  incidents,
}: BarChartProps) {
  const totalUsers = users.reduce((total, item) => total + item.count, 0);
  const totalNotification = notifications.reduce((acc, n) => acc + n.count, 0);
  const totalIncidents = incidents.reduce((acc, n) => acc + n.count, 0);

  // const notificationPercentage = (totalNotification / totalIncidents) * 100;
  // const roundedPercentage = Math.round(notificationPercentage * 100) / 100;

  const chartData = [
    {
      value: "notifications",
      total: totalNotification,
      fill: chartConfig.notifications.color,
    },
    { value: "users", total: totalUsers, fill: chartConfig.users.color },
    {
      value: "incidents",
      total: totalIncidents,
      fill: chartConfig.incidents.color,
    },
  ];
  return (
    <Card className="bg-white dark:bg-grey-800  border dark:border-grey-500">
      <CardHeader>
        <CardTitle>Notification vs Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
            barSize={45}
            className=""
          >
            <YAxis
              dataKey="value"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="total" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="total" layout="vertical" fill="fill" radius={6}>
              <LabelList
                dataKey="total"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="text-xs mt-4 flex gap-[16px]">
          <div className="flex align-center  gap-1">
            <div className="bg-[#4A806A] w-4 h-4 mt-[1px] rounded-[3px] "></div>
            <p>{chartConfig.notifications.label}</p>
          </div>
          <div className="flex align-center  gap-1">
            <div className="bg-[#F6A600] w-4 h-4 mt-[1px] rounded-[3px] "></div>
            <p>{chartConfig.users.label}</p>
          </div>
          <div className="flex align-center gap-1">
            <div className="bg-[#3079DB] w-4 h-4 mt-[1px] rounded-[3px] "></div>
            <p>{chartConfig.incidents.label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
