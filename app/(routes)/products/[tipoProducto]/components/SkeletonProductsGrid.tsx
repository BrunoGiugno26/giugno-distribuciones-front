import { Skeleton } from "@/components/ui/skeleton";

const SkeletonProductCard = () => {
  return (
    <div className="flex flex-col items-center space-y-3 p-4 border rounded-lg shadow-sm">
      <Skeleton className="w-full h-48 rounded-md bg-gray-700/80 dark:bg-gray-700/80" />
      <Skeleton className="h-6 w-3/4 bg-gray-600/70 dark:bg-gray-600/70" />
      <Skeleton className="h-8 w-28 rounded-md bg-amber-600/80 dark:bg-sky-600/80" />
    </div>
  );
};

const SkeletonProductsGrid = () =>{
    return(
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({length:8}).map((_, i) =>(
                <SkeletonProductCard key={i}/>
            ))}
        </div>
    )
}

export default SkeletonProductsGrid