import { ApiResponse, fetchData } from "@/app/utils/count";
import { UserData } from "./users.types";
import { UsersSideChartClient } from "../client/UsersSideClient";
import { NotificationsData } from "../notifications/notifications.types";

interface UsersProps {
  dateRange: { from: Date | null; to: Date | null };
}

export default async function UsersSideChart({ dateRange }: UsersProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const users: ApiResponse<UserData[]> = await fetchData<UserData[]>(
    `${process.env.BACKEND_URL}/api/users`,
    validDateRange
  );

  const notifications: ApiResponse<NotificationsData[]> = await fetchData<
    NotificationsData[]
  >(`${process.env.BACKEND_URL}/api/notifications`, validDateRange);

  if (!users.success) {
    return <div>{`${users.error} - ${users.status}`}</div>;
  }
  if (!notifications.success) {
    return <div>{`${notifications.error} - ${notifications.status}`}</div>;
  }

  if (!users.data || users.data.length === 0) {
    return <div>No data available</div>;
  }
  if (!notifications.data || notifications.data.length === 0) {
    return <div>No data available</div>;
  }

  // const sortedData = [...users.data].sort(
  //   (a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
  // );

  return (
    <UsersSideChartClient
      users={users.data}
      notifications={notifications.data}
    />
  );
}
