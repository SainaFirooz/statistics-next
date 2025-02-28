import { ApiResponse, fetchData } from "@/app/utils/count";
import { NotificationsData } from "./notifications.types";

interface NotificationProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function NotificationTable({ dateRange }: NotificationProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const response: ApiResponse<NotificationsData[]> = await fetchData<
    NotificationsData[]
  >(`${process.env.BACKEND_URL}/api/notifications`, validDateRange);
  if (!response.success) {
    return <div>{`${response.error} - ${response.status}`}</div>;
  }
  if (!response.data || response.data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Notifications Table</h1>
      <ul>
        {response.data.map((notifications, index) => (
          <li key={index}>
            {notifications.queueUserIds} notifications from:{" "}
            {notifications.fromDate} to: {notifications.toDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
