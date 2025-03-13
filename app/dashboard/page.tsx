import { Suspense } from "react";
import Loading from "./loading";
import { UsersChart } from "../components/users/UsersChart";
import { SubscriptionsChart } from "../components/subscriptions/SubscriptionsChart";
import { NotificationChart } from "../components/notifications/TopNotificationsChart";
import { IncidentMessagesChart } from "../components/incidentMessages/IncidentMessageChart";
import { WeeklyDataChart } from "../components/weeklyData/WeeklyDataChart";
import { WeeklyDataTable } from "../components/weeklyData/WeeklyDataTable";
import { SideNotificationChart } from "../components/notifications/SideNotificationChart";
import UsersSideChart from "../components/users/UsersSideChart";
import DateComponent from "../components/DateComponent";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const dateRange = {
    from: new Date("2018-01-01"),
    to: new Date(),
  };

  return (
    <div className="bg-white dark:bg-grey-900 max-w-7xl max-h-svw ">
      <DateComponent />
      <div className="grid grid-cols-4 gap-6">
        <Suspense fallback={<Loading />}>
          <UsersChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <IncidentMessagesChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <SubscriptionsChart dateRange={dateRange} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <NotificationChart dateRange={dateRange} />
        </Suspense>
      </div>
      <div className="mt-6">
        <Suspense fallback={<Loading />}>
          <WeeklyDataChart dateRange={dateRange} />
        </Suspense>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-7">
          <Suspense fallback={<Loading />}>
            <WeeklyDataTable dateRange={dateRange} />
          </Suspense>
        </div>
        <div className="col-span-5 grid grid-rows-1 gap-6">
          <div className="row-span-1">
            <Suspense fallback={<Loading />}>
              <SideNotificationChart dateRange={dateRange} />
            </Suspense>
          </div>
          <div className="row-span-1">
            <Suspense fallback={<Loading />}>
              <UsersSideChart dateRange={dateRange} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
