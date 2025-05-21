import prisma from "../../config/prisma";
import { buildDateRangeQuery } from "../../utils/dateRangeQuery";
import { formatQueryData } from "../../utils/formatterQuery";
import { AllType } from "./all.types";

export const fetchAllService = {
  countNotificationCache: async (from?: Date, to?: Date) => {
    const data: AllType[] = await prisma.$queryRaw`
    SELECT 
      DATE("createdAt") as date,
      COUNT(*) as count
    FROM "VyNotificationCache"
    ${buildDateRangeQuery(from, to)}
    GROUP BY DATE("createdAt")
    ORDER BY date DESC
    `;
    const result = formatQueryData(data);

    return result;
  },
  countMultipleMetrics: async (from?: Date, to?: Date) => {
    return await prisma.$transaction(async () => {
      const notifications: AllType[] = await prisma.$queryRaw`
      SELECT 
        DATE("createdAt") as date,
        SUM(array_length("userIds", 1)) as count
      FROM "NotificationQueue"
      ${buildDateRangeQuery(from, to)}
      GROUP BY DATE("createdAt")
      ORDER BY date DESC
    `;

      const incidents: AllType[] = await prisma.$queryRaw`
     SELECT 
     DATE("createdAt") as date,
     COUNT(*) as count
     FROM "VyNotificationCache"
     ${buildDateRangeQuery(from, to)}
     GROUP BY DATE("createdAt")
     ORDER BY date DESC
    `;

      const subscriptions: AllType[] = await prisma.$queryRaw`
      SELECT 
      DATE("createdAt") as date,
      COUNT(*) as count
      FROM "notificationSubscriptions"
      ${buildDateRangeQuery(from, to)}
      GROUP BY DATE("createdAt")
      ORDER BY date DESC 
     `;
      const users: AllType[] = await prisma.$queryRaw`
      SELECT 
      DATE("createdAt") as date,
      COUNT(*) as count
      FROM "users"
      ${buildDateRangeQuery(from, to)}
      GROUP BY DATE("createdAt")
      ORDER BY date DESC
     `;

      return {
        subscriptions: formatQueryData(subscriptions),
        notifications: formatQueryData(notifications),
        incidents: formatQueryData(incidents),
        users: formatQueryData(users),
      };
    });
  },
};
