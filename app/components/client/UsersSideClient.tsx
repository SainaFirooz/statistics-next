"use client";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
import { UserData } from "../users/users.types";
import { NotificationsData } from "../notifications/notifications.types";
import { IncidentMessagesData } from "../incidentMessages/incidentMessages.types";

const chartConfig = {
  users: {
    label: "Users",
    color: "#F6A600",
  },
  notifications: {
    label: "In App Notifications",
    color: "#F6A600",
  },
  cache: {
    label: "Push Notifications",
    color: "#015AAA",
  },
} satisfies ChartConfig;

interface UsersSideChartProps {
  users: UserData[];
  notifications: NotificationsData[];
  cache: IncidentMessagesData[];
}
export function UsersSideChartClient({
  users,
  notifications,
  cache,
}: UsersSideChartProps) {
  const totalUsers = users.reduce((total, item) => total + item.users, 0);
  const totalQueuedUsers = notifications.reduce(
    (acc, n) => acc + n.queueUserIds,
    0
  );
  const totalCache = cache.reduce((acc, n) => acc + n.cache, 0);

  const chartData = [
    {
      name: "Notifications",
      notifications: totalQueuedUsers,
      cache: totalCache,
    },
  ];

  return (
    <Card className="bg-white dark:bg-grey-800 border dark:border-grey-500 flex flex-col ">
      <CardHeader className=" pb-0">
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Users subscribed to push notifications vs in-app notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col pt-2">
        <div className=" grid grid-cols-2 text-xs  gap-13 mt-8 ">
          <div className="">
            <p>In App Notifications:</p>
            <p className="flex justify-self-end mr-5">13,7%</p>
          </div>
          <div className="ml-4 ">
            <p className="">Push Notifications:</p>
            <p className="">13,7%</p>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto  aspect-square w-full max-w-[250px] -mb-11 -mt-4 "
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={90}
            outerRadius={250}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - -25}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 44}
                          className="fill-muted-foreground"
                        >
                          Total Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="cache"
              stackId="a"
              cornerRadius={1}
              fill="var(--color-notifications)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="notifications"
              fill="var(--color-cache)"
              stackId="a"
              cornerRadius={1}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
