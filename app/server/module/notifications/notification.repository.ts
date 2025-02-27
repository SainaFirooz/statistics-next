import prisma from "../../config/prisma";
import { buildDateRangeQuery } from "../../utils/dateRangeQuery";
import { NotificationType } from "./notification.types";

export const notificationQueueService = {
  sumUserIds: async (from?: Date, to?: Date) => {
    const data: NotificationType[] = await prisma.$queryRaw`
    SELECT 
      DATE("createdAt") as date,
      SUM(array_length("userIds", 1)) as count
    FROM "NotificationQueue"
    ${buildDateRangeQuery(from, to)}
    GROUP BY DATE("createdAt")
    ORDER BY date DESC
  `;
    const result = data.map((entry) => ({
      queueUserIds: Number(entry.count),
      fromDate: entry.date,
      toDate: entry.date,
    }));

    return result;
  },
};
