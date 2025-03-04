import { ApiResponse, fetchData } from "@/app/utils/count";
import { SubscriptionData } from "./subscriptions.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChartComponent } from "../LineComponent";
import TrendingDown from "../trending/TrendingDown";

interface SubscriptionsProps {
  dateRange: { from: Date | null; to: Date | null };
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
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold">Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="text-h2 font-bold">{sortedData.length}</div>
            <TrendingDown />
          </div>
          <p className="text-xs text-muted-foreground">last 7 days</p>
        </CardContent>
        <div className="h-[60px]">
          <LineChartComponent
            data={sortedData}
            dataKey={"subscriptions"}
            chartConfig={{
              color: "#00000",
              label: "Subscriptions",
            }}
          />
        </div>
      </Card>
    </div>
  );
}
