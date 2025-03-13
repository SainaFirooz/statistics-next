"use client";
import React, { useState } from "react";
import { DatePicker } from "./DatePicker";
import { DateFilter } from "./DateFilter";
import { DateRange } from "react-day-picker";
import { ToggleButtonValues } from "./dateComponentTypes";
import { subDays } from "date-fns";

type Props = {};

export default function DateComponent({}: Props) {
  const [dateRange, setDateRange] = useState<DateRange>({
    to: new Date(),
    from: new Date(),
  });
  function handleDateOnChange(dateRange: DateRange | undefined): void {
    if (dateRange) {
      console.log(dateRange);
      setDateRange(dateRange);
    }
  }
  function handleOnButtonChange(buttonValue: ToggleButtonValues): void {
    console.log(buttonValue);
    setDateRange({ from: subDays(new Date(), buttonValue), to: new Date() });

    console.log(dateRange);
  }
  return (
    <div className="flex justify-between mb-6 ">
      <DatePicker date={dateRange} handleOnDateChange={handleDateOnChange} />
      <DateFilter handleOnButtonClick={handleOnButtonChange} />
    </div>
  );
}
