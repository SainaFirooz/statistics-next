import { ApiResponse } from "@/app/utils/fetchData";
import { WeeklyData } from "./weeklyData.types";
import { DataTableClient } from "../client/DataTableClient";

interface DataTableProps {
  data: ApiResponse<WeeklyData[]>;
}

export async function WeeklyDataTable({ data }: DataTableProps) {
  if (!data.success) {
    return <div>{`${data.error} - ${data.status}`}</div>;
  }

  const sortedData = [...data.data].sort(
    (a, b) => new Date(b.toDate).getTime() - new Date(a.toDate).getTime()
  );

  return <DataTableClient initialData={sortedData} />;
}
