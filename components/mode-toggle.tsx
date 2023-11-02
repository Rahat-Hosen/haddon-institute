"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Flame, Cloud, Monitor } from "lucide-react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex space-x-2 bg-white dark:bg-secondary py-1 px-2 rounded-md">
      <Button
        onClick={() => setTheme("system")}
        variant={theme === "system" ? "default" : "ghost"}
        size="sm"
      >
        <Monitor className="h-5 w-5" />
        <span className="sr-only">System mode</span>
      </Button>
      <Button
        onClick={() => setTheme("light")}
        variant={theme === "light" ? "default" : "ghost"}
        size="sm"
      >
        <Flame className="h-5 w-5" />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        variant={theme === "dark" ? "default" : "ghost"}
        size="sm"
      >
        <Cloud className="h-5 w-5" />
        <span className="sr-only">Dark mode</span>
      </Button>
    </div>
  );
}
