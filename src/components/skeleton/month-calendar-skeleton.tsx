import { DAYS_OF_WEEK } from "@/lib/date";

export default function MonthCalendarSkeleton() {
  // Simulating a calendar grid
  const days = Array.from({ length: 7 * 5 }, (_, index) => index + 1);

  return (
    <div className="mb-14">
      <p className="animate-pulse mb-6 font-semibold h-6 w-1/6 bg-secondary"></p>

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
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          return (
            <div
              key={day}
              className={`animate-pulse select-none flex justify-end items-start h-20 px-2 py-1 mb-1 text-xs font-semibold text-gray-900`}
              style={{
                backgroundColor: "hsl(var(--calendar-card-secondary))",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
