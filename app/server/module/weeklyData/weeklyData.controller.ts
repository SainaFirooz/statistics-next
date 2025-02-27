import { NextRequest, NextResponse } from "next/server";
import { parseQueryParams } from "../../utils/request";
import { handleError } from "../../utils/errorHandler";
import { dateValidator } from "../../utils/dateValidator";
import { WeeklyDataService } from "./weeklyData.repository";

async function GET(req: NextRequest) {
  try {
    const query = parseQueryParams(req);

    const { from, to } = dateValidator(
      query.fromDate as string,
      query.toDate as string
    );

    const result = await WeeklyDataService.getFilteredEntries(from, to);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}

export { GET };
