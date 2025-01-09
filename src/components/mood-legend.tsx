import { getMoodColorClass } from "@/lib/date";
import { capitalize, enumToArray } from "@/lib/utils";
import { Mood } from "@/models/calendar";

export default function MoodLegend() {
  return (
    <ul className="grid grid-flow-col justify-center gap-4 mt-6">
      {enumToArray(Mood).map((i) => {
        return (
          <li
            key={i.value}
            className="flex flex-row items-center gap-1 text-xs"
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
  );
}
