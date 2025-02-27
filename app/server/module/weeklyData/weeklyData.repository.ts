import prisma from "../../config/prisma";
import { buildDateRangeQuery } from "../../utils/dateRangeQuery";
import { getAllWeeklyData } from "./data/jsonDataHandler";
import { WeeklyDataType } from "./weeklyData.types";

export const WeeklyDataService = {
  getFilteredEntries: async (from?: Date, to?: Date) => {
    const allData: WeeklyDataType[] = await getAllWeeklyData();

    if (!from || !to) {
      return allData;
    }

    const filteredData = allData.filter((entry) => {
      const entryDate = new Date(entry.toDate);

      if (to >= entryDate && from <= entryDate) {
        return true;
      }
      return false;
    });
    return filteredData;
  },
};
