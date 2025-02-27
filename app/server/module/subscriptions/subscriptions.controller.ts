import { NextRequest, NextResponse } from "next/server";
import { parseQueryParams } from "../../utils/request";
import { handleError } from "../../utils/errorHandler";
import { dateValidator } from "../../utils/dateValidator";
import { notificationSubscriptionsService } from "./subscriptions.repository";
import { CustomError } from "../../utils/customError";

async function GET(req: NextRequest) {
  try {
    const query = parseQueryParams(req);

    const { from, to } = dateValidator(
      query.fromDate as string,
      query.toDate as string
    );

    const result = await notificationSubscriptionsService.countSubsriptions(
      from,
      to
    );
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}

export { GET };
