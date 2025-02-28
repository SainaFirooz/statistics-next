import { ApiResponse, fetchData } from "@/app/utils/count";
import { WeeklyData } from "./weeklyData.types";

interface WeeklyDateProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function WeeklyDataChart({ dateRange }: WeeklyDateProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const response: ApiResponse<WeeklyData[]> = await fetchData<WeeklyData[]>(
    `${process.env.BACKEND_URL}/api/weeklyData`,
    validDateRange
  );
  if (!response.success) {
    return <div>{`${response.error} - ${response.status}`}</div>;
  }
  if (!response.data || response.data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Weekly Data Chart</h1>
      {response.data.map((data, index) => (
        <li key={index}>
          <div>
            <strong>To Date:</strong> {data.toDate}
          </div>
          <div>
            <strong>Users:</strong> {data.users}
          </div>
          <div>
            <strong>Subscriptions:</strong> {data.subscriptions}
          </div>
          <div>
            <strong>Vy Messages:</strong> {data.vyMessages}
          </div>
          <div>
            <strong>Sent Notifications:</strong> {data.sentNotifications}
          </div>
        </li>
      ))}
    </div>
  );
}
