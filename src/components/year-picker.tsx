import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useDailyMood } from "@/hooks/use-daily-mood";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";
import { currentYear } from "@/lib/date";

export default function YearPicker() {
  const { selectedYear, changeYear } = useDailyMood();
  const { userCreationDate } = useAuth();

  const userCreationYear = parseInt(
    format(userCreationDate ?? new Date(), "yyyy")
  );

  const disablePrevButton = selectedYear <= userCreationYear;
  const disableNextButton = selectedYear >= currentYear;

  return (
    <div className="flex flex-row justify-between md:justify-start items-center">
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => changeYear(-1)}
        disabled={disablePrevButton} // Disable button if at creation year
      >
        <ChevronLeft />
      </Button>
      <p className="font-semibold text-secondary-foreground/90 cursor-pointer hover:bg-secondary px-4 py-1 rounded-md">
        {selectedYear}
      </p>
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => changeYear(1)}
        disabled={disableNextButton} // Disable button if at current year
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
