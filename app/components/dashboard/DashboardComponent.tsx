"use client";
import UsersSideChart from "../client/UsersSideChart";
import DateComponent from "../DateComponent";
import { IncidentMessagesChart } from "../incidentMessages/IncidentMessageChart";
import { SideNotificationChart } from "../notifications/SideNotificationChart";
import { NotificationChart } from "../notifications/TopNotificationsChart";
import { SubscriptionsChart } from "../subscriptions/SubscriptionsChart";
import { UsersChart } from "../users/UsersChart";
import { WeeklyDataChart } from "../weeklyData/WeeklyDataChart";
import { WeeklyDataTable } from "../weeklyData/WeeklyDataTable";

export default function Dashboard() {
  const dateRange = {
    from: new Date("2018-01-01"),
    to: new Date(),
  };

  return (
    <div className="bg-white dark:bg-grey-900 max-w-7xl max-h-svw ">
      <DateComponent />
      <div className="grid grid-cols-4 gap-6">
        <UsersChart dateRange={dateRange} />
        <IncidentMessagesChart dateRange={dateRange} />
        <SubscriptionsChart dateRange={dateRange} />
        <NotificationChart dateRange={dateRange} />
      </div>
      <div className="mt-6">
        <WeeklyDataChart dateRange={dateRange} />
      </div>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-7">
          <WeeklyDataTable dateRange={dateRange} />
        </div>
        <div className="col-span-5 grid grid-rows-1 gap-6">
          <div className="row-span-1">
            <SideNotificationChart dateRange={dateRange} />
          </div>
          <div className="row-span-1">
            <UsersSideChart dateRange={dateRange} />
          </div>
        </div>
      </div>
    </div>
  );
}
