import { Skeleton } from "../ui/skeleton";

export default function YearCalendarSkeleton() {
  // Simulating a calendar grid
  const months = Array.from({ length: 12 }, (_, index) => index + 1).map(
    (m) => {
      return {
        index: m,
        days: Array.from({ length: 31 }, (_, index) => index + 1),
      };
    }
  );

  return (
    <div className="overflow-x-auto overflow-y-hidden px-1">
      <div className="grid grid-flow-col auto-cols-[minmax(60px,_1fr)] gap-1">
        {months.map((month) => (
          <div key={month.index} className="min-w-[60px]">
            <Skeleton className="h-6 mb-2" />
            {month.days.map((day) => (
              <div
                key={day}
                className={`h-14 animate-pulse rounded-base border-2 mb-1 border-skeleton shadow-shadow`}
                style={{
                  backgroundColor: "hsl(var(--calendar-card-secondary))",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
