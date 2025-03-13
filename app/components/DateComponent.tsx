"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker } from "./DatePicker";
import { DateFilter } from "./DateFilter";
import { DateRange } from "react-day-picker";
import { ToggleButtonValues } from "./dateComponentTypes";
import { subDays } from "date-fns";

type Props = {};

export default function DateComponent({}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize date range from URL or defaults
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const fromParam = searchParams.get("startDate");
    const toParam = searchParams.get("endDate");

    return {
      from: fromParam ? new Date(fromParam) : new Date(),
      to: toParam ? new Date(toParam) : new Date(),
    };
  });

  function handleDateOnChange(dateRange: DateRange | undefined): void {
    if (dateRange && dateRange.from && dateRange.to) {
      setDateRange(dateRange);

      const startDate = dateRange.from.toISOString().split("T")[0];
      const endDate = dateRange.to.toISOString().split("T")[0];
      router.push(`/dashboard?startDate=${startDate}&endDate=${endDate}`);
    }
  }

  function handleOnButtonChange(buttonValue: ToggleButtonValues): void {
    const newDateRange = {
      from: subDays(new Date(), buttonValue),
      to: new Date(),
    };

    setDateRange(newDateRange);

    if (newDateRange.from && newDateRange.to) {
      const startDate = newDateRange.from.toISOString().split("T")[0];
      const endDate = newDateRange.to.toISOString().split("T")[0];
      router.push(`/dashboard?startDate=${startDate}&endDate=${endDate}`);
    }
  }
  return (
    <div className="flex justify-between mb-6 ">
      <DatePicker date={dateRange} handleOnDateChange={handleDateOnChange} />
      <DateFilter handleOnButtonClick={handleOnButtonChange} />
    </div>
  );
}
