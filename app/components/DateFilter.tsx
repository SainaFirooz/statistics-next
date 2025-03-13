"use client";
import { Button } from "@/components/ui/button";
import { subDays } from "date-fns";
import React from "react";
import { ToggleButtonValues } from "./dateComponentTypes";

type Props = {
  handleOnButtonClick: (value: ToggleButtonValues) => void;
};

export function DateFilter({ handleOnButtonClick }: Props) {
  return (
    <div className="inline-flex border  dark:border-grey-500 rounded-lg overflow-hidden bg-white dark:bg-grey-800 ">
      <Button
        variant="ghost"
        onClick={() => handleOnButtonClick(ToggleButtonValues.DAY)}
      >
        24 hours
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleOnButtonClick(ToggleButtonValues.WEEK)}
      >
        7 days
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleOnButtonClick(ToggleButtonValues.MONTH)}
      >
        30 days
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleOnButtonClick(ToggleButtonValues.YEAR)}
      >
        12 months
      </Button>
    </div>
  );
}
