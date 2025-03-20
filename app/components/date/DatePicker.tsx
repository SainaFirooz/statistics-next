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

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleOnDateChange(undefined);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative flex items-center space-x-2 w-[250px]">
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal text-blue-700 dark:text-blue-10 border border-blue-700 hover:bg-blue-10 dark:hover:bg-grey-600  dark:bg-grey-800 dark:border-blue-200 pr-8 text-blue-700 dark:fill-blue-100"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
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

            {date && (
              <button
                onClick={handleReset}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg bg-transparent hover:bg-gray-200 dark:bg-transparent dark:hover:bg-blue-600 fill-blue-700 dark:fill-blue-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="12px"
                  viewBox="0 -960 960 960"
                  width="12px"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={handleOnDateChange}
            numberOfMonths={2}
            className="dark:bg-grey-800 border dark:border-grey-500 rounded-sm"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
