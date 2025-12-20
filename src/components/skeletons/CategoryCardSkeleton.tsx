import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryCardSkeleton() {
  return (
    <Card className="h-full bg-muted/30">
      <CardContent className="p-6 flex flex-col h-full">
        <Skeleton className="mb-4 rounded-full w-12 h-12" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mt-auto" />
        <Skeleton className="h-4 w-2/3 mt-1" />
      </CardContent>
    </Card>
  );
}
