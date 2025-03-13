import { ApiResponse, fetchData } from "@/app/utils/count";
import { UserData } from "./users.types";
import { TopChartclient } from "../client/TopChartClient";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";

interface UsersProps {
  dateRange: DateRange;
  title: string;
  lineColor: string;
  data: UserData[];
}

export async function TopChart({
  dateRange,
  title,
  lineColor,
  data,
}: UsersProps) {
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

  const sortedData = [...response.data].sort(
    (a, b) => new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()
  );
  const daysCount =
    dateRange.from && dateRange.to
      ? differenceInDays(dateRange.to, dateRange.from) // +1 to include both start and end days
      : 0;

  return (
    <TopChartclient
      data={sortedData}
      days={daysCount}
      title={title}
      chartConfig={{
        color: lineColor,
        label: title,
        strokeColor: lineColor,
        fillColor: lineColor,
        dataKey: "count",
      }}
    />
  );
}
