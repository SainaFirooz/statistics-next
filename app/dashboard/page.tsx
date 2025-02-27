import { Suspense } from "react";
import UsersTable from "../components/users/UsersTable";
import Loading from "./loading";
import { UsersChart } from "../components/users/UsersChart";
import { SubscriptionsTable } from "../components/subscriptions/SubscriptionsTable";
import { SubscriptionsChart } from "../components/subscriptions/SubscriptionsChart";
import { NotificationTable } from "../components/notifications/NotificationsTable";
import { NotificationChart } from "../components/notifications/NotificationsChart";
import { IncidentMessagesTable } from "../components/incidentMessages/IncidentMessagesTable";
import { IncidentMessagesChart } from "../components/incidentMessages/IncidentMessageChart";
import { WeeklyDataTable } from "../components/weeklyData/WeeklyDataTable";
import { WeeklyDataChart } from "../components/weeklyData/WeeklyDataChart";

// export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const dateRange = {
    from: new Date("2018-01-01"),
    to: new Date(),
  };

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <WeeklyDataTable dateRange={dateRange} />
      </Suspense>
      <br></br>
      <Suspense fallback={<Loading />}>
        <WeeklyDataChart dateRange={dateRange} />
      </Suspense>
      <br></br>
      <Suspense fallback={<Loading />}>
        <UsersTable dateRange={dateRange} />
      </Suspense>
      <br></br>
      <Suspense fallback={<Loading />}>
        <UsersChart dateRange={dateRange} />
      </Suspense>
      <br></br>
      <Suspense fallback={<Loading />}>
        <SubscriptionsTable dateRange={dateRange} />
      </Suspense>
      <br></br>
      <Suspense fallback={<Loading />}>
        <SubscriptionsChart dateRange={dateRange} />
      </Suspense>
      <br></br>
      <Suspense fallback={<Loading />}>
        <NotificationTable dateRange={dateRange} />
      </Suspense>
      <br></br>
      <Suspense fallback={<Loading />}>
        <NotificationChart dateRange={dateRange} />
      </Suspense>
      <br></br>
      <Suspense fallback={<Loading />}>
        <IncidentMessagesTable dateRange={dateRange} />
      </Suspense>
      <br></br>
      <Suspense fallback={<Loading />}>
        <IncidentMessagesChart dateRange={dateRange} />
      </Suspense>
    </div>
  );
}
