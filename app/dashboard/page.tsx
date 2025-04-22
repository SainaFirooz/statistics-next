import { Suspense } from "react";
import Loading from "./loading";
import { TopChart } from "../components/topChart/TopChart";
import { WeeklyDataChart } from "../components/weeklyData/WeeklyDataChart";
import { WeeklyDataTable } from "../components/weeklyData/WeeklyDataTable";
import { SideNotificationChart } from "../components/notification/SideNotificationChart";
import UsersSideChart from "../components/notification/NotificationVsIncident";
import { DateRange } from "react-day-picker";
import { ApiResponse, fetchData } from "../utils/fetchData";
import { TopChartDataInput } from "../components/topChart/users.types";
import { AllData } from "../global.types";
import { WeeklyData } from "../components/weeklyData/weeklyData.types";
import DateComponent from "../components/date/DateComponent";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const params = await searchParams;
  const startDateParam =
    typeof params.startDate === "string" ? params.startDate : "2024-01-01";

  const endDateParam =
    typeof params.endDate === "string"
      ? params.endDate
      : new Date().toISOString();

  const dateRange: DateRange = {
    from: dateHelper(startDateParam),
    to: dateHelper(endDateParam),
  };
  function dateHelper(date: string) {
    return new Date(date);
  }

  const data: ApiResponse<AllData> = await fetchData<AllData>(
    `${process.env.BACKEND_URL}/api/all`,
    dateRange
  );

  const weeklyData: ApiResponse<WeeklyData[]> = await fetchData<WeeklyData[]>(
    `${process.env.BACKEND_URL}/api/weeklyData`,
    dateRange
  );

  return (
    <div className="bg-white dark:bg-grey-900 max-w-7xl max-h-svw pb-6">
      <DateComponent />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Suspense fallback={<Loading />}>
          <TopChart
            dateRange={dateRange}
            title="Users"
            lineColor="#F6A600"
            data={data.success ? (data.data.users as TopChartDataInput[]) : []}
            percentageChange={0}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <TopChart
            dateRange={dateRange}
            title="Incidents"
            lineColor="#015AAA"
            data={
              data.success ? (data.data.incidents as TopChartDataInput[]) : []
            }
            percentageChange={0}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <TopChart
            dateRange={dateRange}
            title="Subscriptions"
            lineColor="#4A806A"
            data={
              data.success
                ? (data.data.subscriptions as TopChartDataInput[])
                : []
            }
            percentageChange={0}
          />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <TopChart
            dateRange={dateRange}
            title="Push notifications"
            lineColor="#3079DB"
            data={
              data.success
                ? (data.data.notifications as TopChartDataInput[])
                : []
            }
            percentageChange={0}
          />
        </Suspense>
      </div>
      <div className="mt-6">
        <Suspense fallback={<Loading />}>
          <WeeklyDataChart data={weeklyData} />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="col-span-7">
          <Suspense fallback={<Loading />}>
            <WeeklyDataTable data={weeklyData} />
          </Suspense>
        </div>
        <div className="lg:col-span-5 grid gap-6">
          <Suspense fallback={<Loading />}>
            <SideNotificationChart data={data} />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <UsersSideChart data={data} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
