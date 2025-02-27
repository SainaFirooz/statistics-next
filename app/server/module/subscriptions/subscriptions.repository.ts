import prisma from "../../config/prisma";
import { buildDateRangeQuery } from "../../utils/dateRangeQuery";
import { NotificationSubscriptionsType } from "./subscriptions.types";

export const notificationSubscriptionsService = {
  countSubsriptions: async (from?: Date, to?: Date) => {
    const data: NotificationSubscriptionsType[] = await prisma.$queryRaw`
  SELECT 
    DATE("createdAt") as date,
    COUNT(*) as count
  FROM "notificationSubscriptions"
  ${buildDateRangeQuery(from, to)}
  GROUP BY DATE("createdAt")
  ORDER BY date DESC
`;
    const result = data.map((entry) => ({
      subscriptions: Number(entry.count),
      fromDate: entry.date,
      toDate: entry.date,
    }));
    return result;
  },
};
