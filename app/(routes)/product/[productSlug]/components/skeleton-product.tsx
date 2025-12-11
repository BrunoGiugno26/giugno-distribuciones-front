import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProduct = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8 md:p-12 lg:p-16 min-h-[60vh] mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-pulse">
        <div className="flex justify-center items-start">
          <Skeleton className="w-full max-w-lg h-[450px] rounded-2xl bg-gray-700/80 dark:bg-gray-700/80" />
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 bg-gray-600/70 dark:bg-gray-600/70" />
            <Skeleton className="h-8 w-3/4 bg-gray-600/70 dark:bg-gray-600/70" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-gray-700/50" />
            <Skeleton className="h-4 w-full bg-gray-700/50" />
            <Skeleton className="h-4 w-full bg-gray-700/50" />
            <Skeleton className="h-4 w-full bg-gray-700/50" />
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <Skeleton className="h-10 w-24 bg-gray-700/70" />
            <Skeleton className="h-10 w-24 bg-gray-700/70" />
          </div>
          <div className="pt-4">
            <Skeleton className="h-12 w-full max-w-xs rounded-full bg-amber-600/80 dark:bg-sky-600/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
