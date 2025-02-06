import { DAYS_OF_WEEK } from "@/lib/date";
import { Skeleton } from "../ui/skeleton";

export default function MonthCalendarSkeleton() {
  // Simulating a calendar grid
  const days = Array.from({ length: 7 * 5 }, (_, index) => index + 1);

  return (
    <div className="mb-14">
      <Skeleton className="h-6 w-1/6 mb-6 " />

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS_OF_WEEK.map((day, i) => (
          <div
            key={i}
            className="text-center text-xs text-muted-foreground font-semibold"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => {
          return (
            <div
              key={day}
              className={`h-20 animate-pulse rounded-base border-2 mb-3 border-skeleton shadow-shadow`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
