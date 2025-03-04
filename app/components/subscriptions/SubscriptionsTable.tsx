import { ApiResponse, fetchData } from "@/app/utils/count";
import { SubscriptionData } from "./subscriptions.types";

interface SubscriptionsProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function SubscriptionsTable({ dateRange }: SubscriptionsProps) {
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

  return (
    <div>
      <h1>Subscription Table</h1>
      {response.data.map((subscriptions, index) => (
        <ul key={index}>
          <div>
            <strong>Subscriptions:</strong> {subscriptions.subscriptions}
          </div>
          <div>
            <strong>From Date:</strong> {subscriptions.fromDate}
          </div>
          <div>
            <strong>To Date:</strong> {subscriptions.toDate}
          </div>
        </ul>
      ))}
    </div>
  );
}
