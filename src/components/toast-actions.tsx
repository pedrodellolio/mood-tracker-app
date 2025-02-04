import { useDailyMood } from "@/hooks/use-daily-mood";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { addOrUpdateMoods } from "@/services/mood";
import { Day } from "@/models/calendar";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { RefObject } from "react";
import LoadingSpinner from "./loading-spinner";

interface Props {
  toastIdRef: RefObject<string | undefined>;
}
export default function ToastActions({ toastIdRef }: Props) {
  const { clearChanges, months } = useDailyMood();
  const { user } = useAuth();
  const { dismiss } = useToast();
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (days: Day[]) => addOrUpdateMoods(user!.uid, days),
    onSuccess: () => {
      dismiss(toastIdRef.current);
      toastIdRef.current = undefined;
      clearChanges();
    },
    onError: () => {
      alert("there was an error");
    },
  });

  error && console.log(error);

  const undoMoodChanges = () => {
    clearChanges();
    toastIdRef.current = undefined;
  };

  const saveMoodChanges = () => {
    const daysWithMoodChanges = months
      .flatMap((month) => month.days)
      .filter((day) => day.changed);

    mutateAsync(daysWithMoodChanges);
  };

  return (
    <div className="flex flex-row gap-2">
      <Button
        onClick={undoMoodChanges}
        size={"sm"}
        variant={"default"}
        className="text-red-600 hover:text-red-600 hover:bg-red-50"
      >
        Undo
      </Button>
      <Button
        size={"sm"}
        type="button"
        onClick={saveMoodChanges}
        disabled={isPending}
      >
        {isPending ? <LoadingSpinner className="w-10 h-10" /> : "Save"}
      </Button>
    </div>
  );
}
