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

const chartConfig = {
  users: {
    label: "Users",
    color: "#F6A600",
  },
} satisfies ChartConfig;

interface UsersSideChartProps {
  data: UserData[];
}

export function UsersSideChartClient({ data }: UsersSideChartProps) {
  const totalUsers = data.reduce((total, item) => total + item.users, 0);

  const chartData = [{ name: "All Users", users: totalUsers }];

  return (
    <Card className="flex flex-col bg-white dark:bg-grey-800 border dark:border-grey-500">
      <CardHeader className="pb-0">
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Users subscribed to push notifications vs in app notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 mt-8">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={200}
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
                          y={(viewBox.cy || 0) - -40}
                          className="fill-grey-900 dark:fill-grey-10 text-2xl font-bold"
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - -60}
                          className="fill-grey-900 dark:fill-grey-10 font-medium"
                        >
                          Total Amount of Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="users"
              cornerRadius={1}
              fill="#F6A600"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
