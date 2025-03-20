import React from "react";
import { Spinner } from "@/components/ui/spinner";

const LoaderSpinner = () => {
  return (
    <div className="flex items-center gap-3">
      <Spinner size="medium" />
    </div>
  );
};

export default LoaderSpinner;
