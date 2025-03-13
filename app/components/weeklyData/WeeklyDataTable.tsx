import { ApiResponse, fetchData } from "@/app/utils/count";
import { WeeklyData } from "./weeklyData.types";
import { DataTableClient } from "../client/DataTableClient";
import { DateRange } from "react-day-picker";

interface DataTableProps {
  dateRange: DateRange;
}

export async function WeeklyDataTable({ dateRange }: DataTableProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const response: ApiResponse<WeeklyData[]> = await fetchData<WeeklyData[]>(
    `${process.env.BACKEND_URL}/api/weeklyData`,
    validDateRange
  );

  if (!response.success) {
    return (
      <div>
        Error: {response.error} (Status: {response.status})
      </div>
    );
  }
  if (!response.data || response.data.length === 0) {
    return <div>No data available</div>;
  }

  return <DataTableClient initialData={response.data ?? []} />;
}
