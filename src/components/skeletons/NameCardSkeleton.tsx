import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NameCardSkeletonProps {
  showDetails?: boolean;
}

export function NameCardSkeleton({ showDetails = false }: NameCardSkeletonProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="p-4 bg-muted/50 flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>

          {showDetails && (
            <div className="mt-auto space-y-3">
              <div className="flex gap-1">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-2 w-24 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
