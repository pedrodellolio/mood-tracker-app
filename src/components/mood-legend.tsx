import { getMoodColorClass } from "@/lib/date";
import { capitalize, enumToArray } from "@/lib/utils";
import { Mood } from "@/models/calendar";

export default function MoodLegend() {
  return (
    <div className="w-full mx-auto">
      <ul className="grid grid-flow-col grid-rows-2 sm:grid-rows-1 gap-y-4 justify-between mt-6">
        {enumToArray(Mood).map((i) => {
          return (
            <li
              key={i.value}
              className="flex flex-row items-center gap-2 text-xs font-semibold text-secondary-foreground/90"
            >
              <div
                className="h-4 w-4"
                style={{
                  backgroundColor: `hsl(var(--${getMoodColorClass(
                    i.value as Mood
                  )}))`,
                }}
              ></div>
              {capitalize(i.key)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
