import { ApiResponse } from "@/app/utils/fetchData";
import { NotificationClient } from "../client/NotificationClient";
import { AllData } from "@/app/global.types";

interface NotificationProps {
  data: ApiResponse<AllData>;
}

export async function SideNotificationChart({ data }: NotificationProps) {
  if (!data.success) {
    return <div>{`${data.error} - ${data.status}`}</div>;
  }
  if (!data.data || !data.data.notifications) {
    return <div>No data available</div>;
  }
  const sortedData = [...data.data.notifications].sort(
    (a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
  );

  return <NotificationClient data={sortedData} />;
}
