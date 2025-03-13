import { ApiResponse, fetchData } from "@/app/utils/count";
import { IncidentMessagesData } from "./incidentMessages.types";
import { TopChartclient } from "../client/TopChartClient";
import { DateRange } from "react-day-picker";

interface CacheProps {
  dateRange: DateRange;
}

export async function IncidentMessagesChart({ dateRange }: CacheProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const response: ApiResponse<IncidentMessagesData[]> = await fetchData<
    IncidentMessagesData[]
  >(`${process.env.BACKEND_URL}/api/incidentMessages`, validDateRange);
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
      title={"VY API messages"}
      chartConfig={{
        color: "#015AAA",
        label: "Vy API messages",
        strokeColor: "#015AAA",
        fillColor: "#015AAA",
        dataKey: "cache",
      }}
    />
  );
}
