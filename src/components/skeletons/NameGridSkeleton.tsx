import { NameCardSkeleton } from "./NameCardSkeleton";

interface NameGridSkeletonProps {
  count?: number;
  showDetails?: boolean;
}

export function NameGridSkeleton({ count = 4, showDetails = false }: NameGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <NameCardSkeleton key={index} showDetails={showDetails} />
      ))}
    </div>
  );
}
