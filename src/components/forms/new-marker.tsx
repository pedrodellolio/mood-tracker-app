import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { markerSchema, NewMarkerFormData } from "@/schemas/new-marker";
import { useParams } from "react-router";
import { createMarker } from "@/services/marker";
import MarkerColorPicker from "../ui/marker-colorpicker";
import { Mood } from "@/models/calendar";
import { MarkerDTO } from "@/models/marker";
import { useRef } from "react";

interface Props {
  closeCreateMarker: () => void;
}

export default function NewMarkerForm({ closeCreateMarker }: Props) {
  const { toast } = useToast();
  const { logbookId } = useParams();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: MarkerDTO) => createMarker(data, logbookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["markers", logbookId] });
      closeCreateMarker();
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const form = useForm<NewMarkerFormData>({
    resolver: zodResolver(markerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      color: Mood.AWESOME,
    },
  });

  const colorPickerRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = (data: NewMarkerFormData) => {
    if (data.name === "") {
      closeCreateMarker();
      return;
    }

    const marker: MarkerDTO = {
      name: data.name,
      color: data.color,
    };
    mutateAsync(marker);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") event.preventDefault();
    if (event.key === "Escape") closeCreateMarker();
  };

  return (
    <Form {...form}>
      <form className="font-bold flex flex-row items-center gap-3">
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MarkerColorPicker
                  ref={colorPickerRef}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <li className="text-xs font-semibold text-secondaryBlack">
                    <Input
                      autoComplete="off"
                      className="mt-1 h-6 w-28 px-1"
                      placeholder="New Marker"
                      {...field}
                      onKeyDown={handleKeyDown}
                      onBlur={(e) => {
                        if (
                          colorPickerRef.current &&
                          colorPickerRef.current.contains(e.relatedTarget)
                        )
                          return; // Prevent blur if clicking inside the color picker

                        form.handleSubmit(onSubmit)();
                      }}
                      autoFocus
                    />
                  </li>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
