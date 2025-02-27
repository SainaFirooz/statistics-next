import prisma from "../../config/prisma";
import { buildDateRangeQuery } from "../../utils/dateRangeQuery";
import { IncidentMessagesType } from "./incidentMessages.types";

export const notificationCacheService = {
  countNotificationCache: async (from?: Date, to?: Date) => {
    const data: IncidentMessagesType[] = await prisma.$queryRaw`
    SELECT 
      DATE("createdAt") as date,
      COUNT(*) as count
    FROM "VyNotificationCache"
    ${buildDateRangeQuery(from, to)}
    GROUP BY DATE("createdAt")
    ORDER BY date DESC
    `;
    const result = data.map((entry) => ({
      cache: Number(entry.count),
      fromDate: entry.date,
      toDate: entry.date,
    }));

    return result;
  },
};
