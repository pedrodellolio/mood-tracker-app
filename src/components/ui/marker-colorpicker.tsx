import { forwardRef } from "react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { getMoodColorClass } from "@/lib/utils";
import { Mood } from "@/models/calendar";
import { Brush } from "lucide-react";

interface Props {
  value: Mood;
  onChange: (value: Mood) => void;
}

const MarkerColorPicker = forwardRef<HTMLDivElement, Props>(
  ({ value, onChange }, ref) => {
    const { isColorblindMode } = useUserPreferences();

    const changeColor = () => {
      const colorValues = Object.values(Mood).filter(
        (value) => typeof value === "number"
      ) as number[];

      const currentMoodIndex = colorValues.indexOf(value);
      const nextMoodIndex = (currentMoodIndex + 1) % colorValues.length;
      const color = colorValues[nextMoodIndex];
      onChange(color);
    };

    return (
      <div
        ref={ref}
        className="h-6 w-6 rounded-base shadow-shadow border-2 border-border flex items-center justify-center cursor-pointer"
        style={{
          backgroundColor: `var(--${getMoodColorClass(
            value,
            isColorblindMode
          )})`,
        }}
        onMouseDown={(e) => e.preventDefault()}
        onClick={changeColor}
      >
        <Brush size={16} />
      </div>
    );
  }
);

export default MarkerColorPicker;
