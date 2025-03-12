"use client";
import { Button } from "@/components/ui/button";
import { subDays } from "date-fns";
import React, { useState } from "react";

export function DateFilter() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | null>(
    null
  );

  return (
    <div className="inline-flex border rounded-lg overflow-hidden">
      <Button
        variant="ghost"
        onClick={() =>
          setDateRange({ from: new Date(), to: subDays(new Date(), 1) })
        }
      >
        24 hours
      </Button>
      <Button
        variant="default"
        onClick={() =>
          setDateRange({ from: new Date(), to: subDays(new Date(), 7) })
        }
      >
        7 days
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          setDateRange({ from: new Date(), to: subDays(new Date(), 30) })
        }
      >
        30 days
      </Button>
      <Button
        variant="ghost"
        onClick={() =>
          setDateRange({ from: new Date(), to: subDays(new Date(), 365) })
        }
      >
        12 months
      </Button>
    </div>
  );
}
