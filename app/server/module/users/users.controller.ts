import { NextRequest, NextResponse } from "next/server";
import { parseQueryParams } from "../../utils/request";
import { handleError } from "../../utils/errorHandler";
import { dateValidator } from "../../utils/dateValidator";
import { userService } from "./users.repository";
import { CustomError } from "../../utils/customError";

async function GET(req: NextRequest) {
  try {
    // throw new CustomError("asdfkjsnfks", 404);
    const query = parseQueryParams(req);

    const { from, to } = dateValidator(
      query.fromDate as string,
      query.toDate as string
    );

    const result = await userService.countUsers(from, to);
    return NextResponse.json(result);
  } catch (error: any) {
    return handleError(error);
  }
}

export { GET };
