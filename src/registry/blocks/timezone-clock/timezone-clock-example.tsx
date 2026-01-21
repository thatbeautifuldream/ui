"use client";

import { TimezoneClock } from "@/registry/blocks/timezone-clock/timezone-clock";

export function TimezoneClockExample() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-medium text-sm text-muted-foreground">
        America/New York
      </h3>
      <TimezoneClock timezone="America/New_York" />
    </div>
  );
}
