import { getMoodColorClass } from "@/lib/date";
import { capitalize, enumToArray } from "@/lib/utils";
import { Mood } from "@/models/calendar";
import { Card, CardContent } from "./ui/card";

export default function MoodLegend() {
  return (
    <Card>
      <CardContent>
        <div className="w-full mx-auto">
          <ul className="grid grid-flow-col grid-rows-2 sm:grid-rows-1 gap-y-4 justify-between mt-6">
            {enumToArray(Mood).map((i) => {
              return (
                <li
                  key={i.value}
                  className="flex flex-row items-center gap-3 text-xs font-semibold text-secondaryBlack"
                >
                  <div
                    className="h-6 w-6 rounded-base shadow-shadow border-2 border-border"
                    style={{
                      backgroundColor: `var(--${getMoodColorClass(
                        i.value as Mood
                      )})`,
                    }}
                  ></div>
                  {capitalize(i.key)}
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
