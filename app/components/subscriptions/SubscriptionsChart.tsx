import { ApiResponse, fetchData } from "@/app/utils/count";
import { SubscriptionData } from "./subscriptions.types";
import { TopChartclient } from "../client/TopChartClient";
import { DateRange } from "react-day-picker";

interface SubscriptionsProps {
  dateRange: DateRange;
}

export async function SubscriptionsChart({ dateRange }: SubscriptionsProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const response: ApiResponse<SubscriptionData[]> = await fetchData<
    SubscriptionData[]
  >(`${process.env.BACKEND_URL}/api/subscriptions`, validDateRange);
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
      title={"Subscriptions"}
      chartConfig={{
        color: "#4A806A",
        label: "Subscriptions",
        strokeColor: "#4A806A",
        fillColor: "#4A806A",
        dataKey: "subscriptions",
      }}
    />
  );
}
