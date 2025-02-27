import { Prisma } from "@prisma/client";

export function buildDateRangeQuery(from?: Date, to?: Date) {
  const conditions = [];
  if (from) {
    conditions.push(Prisma.sql`"createdAt" >= ${from}`);
  }
  if (to) {
    conditions.push(Prisma.sql`"createdAt" <= ${to}`);
  }
  return conditions.length
    ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
    : Prisma.sql``;
}
