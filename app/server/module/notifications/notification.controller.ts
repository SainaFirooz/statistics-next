import { NextRequest, NextResponse } from "next/server";
import { parseQueryParams } from "../../utils/request";
import { handleError } from "../../utils/errorHandler";
import { dateValidator } from "../../utils/dateValidator";
import { notificationQueueService } from "./notification.repository";

async function GET(req: NextRequest) {
  try {
    const query = parseQueryParams(req);

    const { from, to } = dateValidator(
      query.fromDate as string,
      query.toDate as string
    );

    const result = await notificationQueueService.sumUserIds(from, to);
    return NextResponse.json(result);
  } catch (error: any) {
    return handleError(error);
  }
}

export { GET };
