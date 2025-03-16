"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";

interface DatePickerProps {
  className?: string;
  date: DateRange | undefined;
  handleOnDateChange: (dateRange: DateRange | undefined) => void;
}

export function DatePicker({
  className,
  handleOnDateChange,
  date,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[226px] justify-start text-left font-normal text-blue-700 dark:text-blue-100 border border-blue-700 border hover:bg-blue-10  dark:bg-grey-800 dark:border-blue-200 ",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleOnDateChange}
            numberOfMonths={2}
            className="dark:bg-grey-800  border dark:border-grey-500 rounded-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
