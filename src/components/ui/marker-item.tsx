import { useUserPreferences } from "@/hooks/use-user-preferences";
import { capitalize, getMoodColorClass } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import LoadingButton from "../loading-button";
import { deleteMarker } from "@/services/marker";
import { Marker } from "@/models/marker";
import { useMediaQuery } from "@/hooks/use-media-query";
import useLongPress from "@/hooks/use-long-press";
import { useState } from "react";
import MarkerOptionsDrawer from "../marker-options-drawer";

interface Props {
  item: Marker;
}
export default function MarkerItem({ item }: Props) {
  const { isColorblindMode } = useUserPreferences();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (mid: string) => deleteMarker(mid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markers"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const onLongPress = () => {
    setIsDrawerOpen(true);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = useLongPress(onLongPress, () => {}, defaultOptions);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <li
        key={item.id}
        className="group flex flex-row items-center gap-3 text-xs font-semibold text-secondaryBlack"
        {...longPressEvent}
      >
        <div className="relative">
          <div
            className="h-6 w-6 rounded-base shadow-shadow border-2 border-border"
            style={{
              backgroundColor: `var(--${getMoodColorClass(
                item.color,
                isColorblindMode
              )})`,
            }}
          ></div>

          <LoadingButton
            variant={"noShadow"}
            className={`absolute -top-2 -right-2 p-1 text-white bg-red-500 rounded-base opacity-0 ${"group-hover:opacity-100"
            } transition-opacity h-[18px] w-[18px]`}
            onClick={() => mutateAsync(item.id)}
            loading={isPending}
          >
            <X />
          </LoadingButton>
        </div>

        <p className="mt-1">{capitalize(item.name)}</p>
      </li>

      {isDrawerOpen && !isDesktop && (
        <MarkerOptionsDrawer isDrawerOpen setIsDrawerOpen={setIsDrawerOpen} />
      )}
    </>
  );
}
