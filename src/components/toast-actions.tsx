import { useDailyMood } from "@/hooks/use-daily-mood";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addOrUpdateMoods } from "@/services/mood";
import { Day } from "@/models/calendar";

export default function ToastActions() {
  const { clearChanges, days } = useDailyMood();
  const { mutateAsync } = useMutation({
    mutationFn: (days: Day[]) => addOrUpdateMoods(days),
    onSuccess: () => {
      toast.dismiss("mood");
      clearChanges();
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const undoMoodChanges = () => clearChanges();
  const saveMoodChanges = () => {
    mutateAsync(days);
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        onClick={undoMoodChanges}
        size={"sm"}
        variant={"ghost"}
        className="text-red-600 hover:text-red-600 hover:bg-red-50"
      >
        Undo
      </Button>
      <Button size={"sm"} type="button" onClick={saveMoodChanges}>
        Save
      </Button>
    </div>
  );
}
