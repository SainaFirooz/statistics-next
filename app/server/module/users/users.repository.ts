import prisma from "../../config/prisma";
import { buildDateRangeQuery } from "../../utils/dateRangeQuery";
import { UserType } from "./users.types";

export const userService = {
  countUsers: async (from?: Date, to?: Date) => {
    const data: UserType[] = await prisma.$queryRaw`
  SELECT 
    DATE("createdAt") as date,
    COUNT(*) as count
  FROM "users"
  ${buildDateRangeQuery(from, to)}
  GROUP BY DATE("createdAt")
  ORDER BY date DESC
  `;
    const result = data.map((entry) => ({
      users: Number(entry.count),
      fromDate: entry.date,
      toDate: entry.date,
    }));

    return result;
  },
};
