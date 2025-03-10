import { ApiResponse, fetchData } from "@/app/utils/count";
import { WeeklyData } from "./weeklyData.types";
import { TotalChartClient } from "../client/TotalChartClient";

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
  const sortedData = response.data.sort(
    (a, b) => new Date(a.toDate).getTime() - new Date(b.toDate).getTime()
  );

  return (
    <div>
      <TotalChartClient data={sortedData} />
    </div>
  );
}
