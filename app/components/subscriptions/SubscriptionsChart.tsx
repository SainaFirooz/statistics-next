import { fetchData } from "@/app/utils/count";
import { SubscriptionData } from "./subscriptions.types";

interface SubscriptionsProps {
  dateRange: { from: Date | null; to: Date | null };
}

export async function SubscriptionsChart({ dateRange }: SubscriptionsProps) {
  const validDateRange = {
    from: dateRange.from ?? new Date(),
    to: dateRange.to ?? new Date(),
  };

  const subscriptionData: SubscriptionData[] = await fetchData(
    `${process.env.BACKEND_URL}/api/subscriptions`,
    validDateRange
  );

  return (
    <div>
      <h1>Subscription Chart</h1>
      <ul>
        {subscriptionData.map((subscriptions, index) => (
          <li key={index}>
            {subscriptions.subscriptions} subscriptions from:{" "}
            {subscriptions.fromDate} to: {subscriptions.toDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
