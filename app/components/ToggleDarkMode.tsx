"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  function handleOnClick() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleOnClick}
      className="bg-white dark:bg-grey-800 border-transparent"
    >
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-0 transition-all dark:rotate-90 dark:scale-100" />
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Button>
  );
}
