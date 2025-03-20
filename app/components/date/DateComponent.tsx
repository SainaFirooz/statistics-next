"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "./DatePicker";
import { DateFilter } from "./DateFilter";
import { DateRange } from "react-day-picker";

import { subDays } from "date-fns";
import { ToggleButtonValues } from "./dateComponentTypes";

export default function DateComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const fromParam = searchParams.get("startDate");
    const toParam = searchParams.get("endDate");

    if (fromParam && toParam) {
      return {
        from: new Date(fromParam),
        to: new Date(toParam),
      };
    }
    return undefined;
  });

  function handleDateOnChange(newDateRange: DateRange | undefined): void {
    setDateRange(newDateRange);
    if (newDateRange && newDateRange.from && newDateRange.to) {
      const startDate = newDateRange.from.toISOString();
      const endDate = newDateRange.to.toISOString();
      router.push(`/dashboard?startDate=${startDate}&endDate=${endDate}`);
    } else if (newDateRange === undefined) {
      router.push("/dashboard");
    }
  }

  function handleOnButtonChange(buttonValue: ToggleButtonValues): void {
    const newDateRange = {
      from: subDays(new Date(), buttonValue),
      to: new Date(),
    };
    setDateRange(newDateRange);
    const startDate = newDateRange.from.toISOString();
    const endDate = newDateRange.to.toISOString();
    router.push(`/dashboard?startDate=${startDate}&endDate=${endDate}`);
  }
  return (
    <div className="flex justify-between mb-6 ">
      <DatePicker date={dateRange} handleOnDateChange={handleDateOnChange} />
      <DateFilter handleOnButtonClick={handleOnButtonChange} />
    </div>
  );
}
