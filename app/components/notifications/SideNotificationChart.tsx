import { ApiResponse, fetchData } from "@/app/utils/count";
import { NotificationsData } from "./notifications.types";
import { NotificationClient } from "../client/NotificationClient";

interface NotificationProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function SideNotificationChart({ dateRange }: NotificationProps) {
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
  const sortedData = [...response.data].sort(
    (a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
  );

  return <NotificationClient data={sortedData} />;
}
