"use client";

import * as React from "react";
import { format, subDays } from "date-fns";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface DatePickerProps {
  className?: string;
  onChange?: (dateRange: DateRange | undefined) => void;
}

export function DatePicker({ className, onChange }: DatePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 1),
    to: new Date(),
  });
  const [open, setOpen] = useState(false);
  //   const handleSelect = (newRange: DateRange | undefined) => {
  //     if (newRange?.from && !newRange.to) {
  //       setDate({
  //         from: newRange.from,
  //         to: newRange.from,
  //       });
  //     } else if (newRange?.from && newRange?.to && newRange.from > newRange.to) {
  //       setDate({
  //         from: newRange.from,
  //         to: undefined,
  //       });
  //     } else {
  //       setDate(newRange);
  //     }

  //     if (onChange) {
  //       onChange(newRange);
  //     }
  //     if (newRange?.from && newRange?.to) {
  //       setOpen(false);
  //     }
  //   };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[226px] justify-start text-left font-normal text-blue-700 border border-blue-700 border hover:bg-blue-10",
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
          <Select
            onValueChange={(value) =>
              setDate({
                from: new Date(),
                to: subDays(new Date(), parseInt(value)),
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="1">Last 24 hours</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="365">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Calendar
            key={date?.from?.toString()}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
