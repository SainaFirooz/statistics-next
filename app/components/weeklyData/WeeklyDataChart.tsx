import { fetchData } from "@/app/utils/count";
import { WeeklyData } from "./weeklyData.types";

interface WeeklyDateProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function WeeklyDataChart({ dateRange }: WeeklyDateProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const weeklyData: WeeklyData[] = await fetchData(
    `${process.env.BACKEND_URL}/api/weeklyData`,
    validDateRange
  );

  return (
    <div>
      <h1>Weekly Data Chart</h1>
      {weeklyData.map((data, index) => (
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
