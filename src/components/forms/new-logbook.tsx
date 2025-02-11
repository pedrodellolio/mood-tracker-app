import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { logbookSchema, NewLogbookFormData } from "@/schemas/new-logbook";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingButton from "../loading-button";
import { createLogbook } from "@/services/logbook";
import { Logbook } from "@/models/logbook";
import { useToast } from "@/hooks/use-toast";

export default function NewLogbookForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Logbook) => createLogbook(user!.uid, data),
    onSuccess: () => {
      toast({ title: "Logbook created.", duration: 5000 });
      queryClient.invalidateQueries({ queryKey: ["logbooks", user?.uid] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const form = useForm<NewLogbookFormData>({
    resolver: zodResolver(logbookSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: NewLogbookFormData) => {
    const logbook: Logbook = {
      id: "",
      name: data.name,
      iconUnicode: "",
      isDefault: false,
    };
    mutateAsync(logbook);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 font-bold"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Logbook" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton className="w-full" loading={isPending}>
          Create
        </LoadingButton>
      </form>
    </Form>
  );
}
