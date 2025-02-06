import { useDailyMood } from "@/hooks/use-daily-mood";
import { Button } from "./ui/button";
import { currentYear } from "@/lib/date";
import { format } from "date-fns";
import { useAuth } from "@/hooks/use-auth";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function YearPicker() {
  const { changeYear, selectedYear } = useDailyMood();
  const { userCreationDate } = useAuth();

  const userCreationYear = parseInt(
    format(userCreationDate ?? new Date(), "yyyy")
  );

  const disablePrevButton = selectedYear <= userCreationYear;
  const disableNextButton = selectedYear >= currentYear;

  return (
    <div className="flex flex-row items-center justify-between w-full xl:w-auto gap-2 xl:gap-4">
      <Button
        title="Previous Year"
        variant={"neutral"}
        size={"sm"}
        onClick={() => changeYear(-1)}
        disabled={disablePrevButton} // Disable button if at creation year
      >
        <ChevronLeft />
      </Button>
      <p className="font-semibold text-secondary-foreground/90 cursor-pointer hover:border-2 border-border px-4 py-1 rounded-md">
        {selectedYear}
      </p>
      <Button
        title="Next Year"
        variant={"neutral"}
        size={"sm"}
        onClick={() => changeYear(1)}
        disabled={disableNextButton} // Disable button if at current year
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
