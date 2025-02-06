import { capitalize, enumToArray, getMoodColorClass } from "@/lib/utils";
import { Mood } from "@/models/calendar";
import { Card, CardContent } from "./ui/card";
import { useUserPreferences } from "@/hooks/use-user-preferences";

export default function MoodLegend() {
  const { isColorblindMode } = useUserPreferences();

  return (
    <Card>
      <CardContent>
        <div className="w-full mx-auto">
          <ul className="grid grid-flow-row grid-cols-3 sm:grid-cols-none sm:grid-flow-col sm:grid-rows-1 gap-y-4 justify-between mt-6 ml-5 sm:ml-0">
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
                        i.value as Mood,
                        isColorblindMode
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
