import { fetchData } from "@/app/utils/count";
import { NotificationsData } from "./notifications.types";

interface NotificationProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function NotificationChart({ dateRange }: NotificationProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };
  const notificationsData: NotificationsData[] = await fetchData(
    `${process.env.BACKEND_URL}/api/notifications`,
    validDateRange
  );
  return (
    <div>
      <h1>Notifications Table</h1>
      <ul>
        {notificationsData.map((notifications, index) => (
          <li key={index}>
            {notifications.queueUserIds} notifications from:{" "}
            {notifications.fromDate} to: {notifications.toDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
