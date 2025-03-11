import { ApiResponse, fetchData } from "@/app/utils/count";
import { UserData } from "./users.types";
import { TopChartclient } from "../client/TopChartClient";

interface UsersProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function UsersChart({ dateRange }: UsersProps) {
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

  return (
    <TopChartclient
      data={sortedData}
      title={"Users"}
      chartConfig={{
        color: "#F6A600",
        label: "Users",
        strokeColor: "#F6A600",
        fillColor: "#F6A600",
        dataKey: "users",
      }}
    />
  );
}
