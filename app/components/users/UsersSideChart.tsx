import { ApiResponse, fetchData } from "@/app/utils/count";
import { UserData } from "./users.types";
import { UsersSideChartClient } from "../client/UsersSideClient";

interface UsersProps {
  dateRange: { from: Date | null; to: Date | null };
}

export default async function UsersSideChart({ dateRange }: UsersProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const response: ApiResponse<UserData[]> = await fetchData<UserData[]>(
    `${process.env.BACKEND_URL}/api/users`,
    validDateRange
  );
  if (!response.success) {
    return <div>{`${response.error} - ${response.status}`}</div>;
  }
  if (!response.data || response.data.length === 0) {
    return <div>No data available</div>;
  }

  const sortedData = [...response.data].sort(
    (a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
  );

  return <UsersSideChartClient data={sortedData} />;
}
