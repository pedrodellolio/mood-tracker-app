import { useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getLogbookByIdOrDefault } from "@/services/logbook";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";

export default function NavBreadcrumb() {
  const { logbookId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data, error, isLoading } = useQuery({
    queryKey: ["logbook", user?.uid, logbookId],
    queryFn: async () => {
      return await getLogbookByIdOrDefault(user!.uid, logbookId);
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error, toast]);

  if (isLoading) return <Skeleton className="h-6 w-1/6 mb-6 " />;
  return (
    <Breadcrumb>
      <BreadcrumbList className="font-bold text-secondaryBlack">
        <BreadcrumbItem>Logbooks</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${data?.id}`}>{data?.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
