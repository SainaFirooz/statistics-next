import { fetchData } from "@/app/utils/count";
import { WeeklyData } from "./weeklyData.types";

interface WeeklyDataProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function WeeklyDataTable({ dateRange }: WeeklyDataProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const weeklyData: WeeklyData[] = await fetchData(
    `${process.env.BACKEND_URL}/api/weeklyData`,
    validDateRange
  );

  return (
    <>
      <h1>Weekly Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>To Date</th>
            <th>Users</th>
            <th>Subscriptions</th>
            <th>Vy Messages</th>
            <th>Notifications</th>
          </tr>
        </thead>
        <tbody>
          {weeklyData.map((data, index) => (
            <tr key={index}>
              <td>{data.toDate}</td>
              <td>{data.users}</td>
              <td>{data.subscriptions}</td>
              <td>{data.vyMessages}</td>
              <td>{data.sentNotifications}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
