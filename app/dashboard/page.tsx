import { Suspense } from "react";
import Loading from "./loading";
import { UsersChart } from "../components/users/UsersChart";
import { SubscriptionsChart } from "../components/subscriptions/SubscriptionsChart";
import { NotificationChart } from "../components/notifications/NotificationsChart";
import { IncidentMessagesChart } from "../components/incidentMessages/IncidentMessageChart";
import { WeeklyDataChart } from "../components/weeklyData/WeeklyDataChart";
import { WeeklyDataTable } from "../components/weeklyData/WeeklyDataTable";
import { NotificationTable } from "../components/notifications/NotificationsTable";
import { DatePicker } from "../components/DatePicker";
import { DateFilter } from "../components/DateFilter";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const dateRange = {
    from: new Date("2018-01-01"),
    to: new Date(),
  };

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-12 flex items-center justify-between gap-4">
        <DatePicker />
        <div className="ml-auto">
          <DateFilter />
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Suspense fallback={<Loading />}>
            <UsersChart dateRange={dateRange} />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<Loading />}>
            <IncidentMessagesChart dateRange={dateRange} />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<Loading />}>
            <SubscriptionsChart dateRange={dateRange} />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<Loading />}>
            <NotificationChart dateRange={dateRange} />
          </Suspense>
        </div>
      </div>
      <div className="col-span-12">
        <Suspense fallback={<Loading />}>
          <WeeklyDataChart dateRange={dateRange} />
        </Suspense>
      </div>
      <div className="col-span-6">
        <Suspense fallback={<Loading />}>
          <WeeklyDataTable dateRange={dateRange} />
        </Suspense>
      </div>
      <div className="col-span-6 grid grid-rows-2 gap-4">
        <div className="row-span-1">
          <Suspense fallback={<Loading />}>
            <NotificationTable dateRange={dateRange} />
          </Suspense>
        </div>
      </div>
      {/* <div className="col-span-6">
        <Suspense fallback={<Loading />}>
          <UsersTable dateRange={dateRange} />
        </Suspense>
      </div> */}
    </div>
  );
}
