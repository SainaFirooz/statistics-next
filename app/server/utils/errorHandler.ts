import { NextResponse } from "next/server";
import { CustomError } from "./customError";
import logger from "./logger";

export function handleError(error: unknown) {
  if (error instanceof Error) {
    logger.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (error instanceof CustomError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { error: "An unexpected error occurred" },
    { status: 500 }
  );
}
