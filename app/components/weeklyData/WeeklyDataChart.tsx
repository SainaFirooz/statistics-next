import { WeeklyData } from "./weeklyData.types";
import { TotalChartClient } from "../client/TotalChartClient";
import { ApiResponse } from "@/app/utils/fetchData";

interface WeeklyDateProps {
  data: ApiResponse<WeeklyData[]>;
}

export async function WeeklyDataChart({ data }: WeeklyDateProps) {
  if (!data.success) {
    return <div>{`${data.error} - ${data.status}`}</div>;
  }
  const sortedData = [...data.data].sort(
    (a, b) => new Date(a.toDate).getTime() - new Date(b.toDate).getTime()
  );

  return (
    <div>
      <TotalChartClient data={sortedData} />
    </div>
  );
}
