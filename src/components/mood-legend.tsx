import { getMoodColorClass } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { useQuery } from "@tanstack/react-query";
import { getMarkers } from "@/services/marker";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import NewMarkerForm from "./forms/new-marker";
import MarkerItem from "./ui/marker-item";

export default function MoodLegend() {
  const { isColorblindMode } = useUserPreferences();
  const { logbookId } = useParams();
  const { toast } = useToast();

  const { data, error } = useQuery({
    queryKey: ["markers", logbookId],
    queryFn: async () => {
      if (logbookId) return await getMarkers(logbookId);
    },
    enabled: !!logbookId,
  });

  const [isCreatingMarker, setIsCreatingMarker] = useState(false);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error, toast]);

  const toggleCreateMarker = () => {
    setIsCreatingMarker(true);
  };

  const closeCreateMarker = () => {
    setIsCreatingMarker(false);
  };
  
  return (
    <Card>
      <CardContent>
        <div className="w-full mx-auto mt-6">
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
            <li className="flex flex-row items-center gap-3 text-xs font-semibold text-secondaryBlack">
              <div
                className="h-6 w-6 rounded-base shadow-shadow border-2 border-border"
                style={{
                  backgroundColor: `var(--${getMoodColorClass(
                    0,
                    isColorblindMode
                  )})`,
                }}
              ></div>
              <p className="mt-1">Default</p>
            </li>
            {data?.map((marker) => {
              return <MarkerItem item={marker} key={marker.id} />;
            })}
            {isCreatingMarker && (
              <NewMarkerForm closeCreateMarker={closeCreateMarker} />
            )}
            <div className="flex flex-row items-center gap-3 text-xs font-semibold text-secondaryBlack">
              <Button
                onClick={toggleCreateMarker}
                size={"sm"}
                className="h-[28px] w-[28px]"
              >
                <Plus />
              </Button>
              <p className="mt-1">New Marker</p>
            </div>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
