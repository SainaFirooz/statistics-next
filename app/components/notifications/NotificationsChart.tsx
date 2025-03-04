import { ApiResponse, fetchData } from "@/app/utils/count";
import { NotificationsData } from "./notifications.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChartComponent } from "../LineComponent";

interface NotificationProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function NotificationChart({ dateRange }: NotificationProps) {
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

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold">
            Sent notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-h2 font-bold">{sortedData.length}</div>
          <p className="text-xs text-muted-foreground">last 7 days</p>
        </CardContent>
        <div className="h-[60px]">
          {" "}
          <LineChartComponent
            data={sortedData}
            dataKey={"queueUserIds"}
            chartConfig={{
              color: "#00000",
              label: "Notifications",
            }}
          />
        </div>
      </Card>
    </div>
  );
}
