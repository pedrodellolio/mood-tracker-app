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
            <p className="animate-pulse h-6 bg-secondary text-center text-sm font-semibold text-secondary-foreground/90 mb-2"></p>
            {month.days.map((day) => (
              <div
                key={day}
                className={`animate-pulse select-none flex justify-end items-start h-20 px-2 py-1 mb-1 text-xs font-semibold text-gray-900`}
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
