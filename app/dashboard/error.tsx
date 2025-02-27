"use client";

import { useEffect } from "react";
import { CustomError } from "../server/utils/customError";

export default function Error({ error }: { error: CustomError }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <div>
        <h2 className="text-center">Something went wrong!</h2>
        <p className="text-center">{error.message}</p>
      </div>
    </div>
  );
}
