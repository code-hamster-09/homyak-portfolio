import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-lg bg-white/10", className)}
      {...props}
    />
  );
}
const SkeletonItem: React.FC = () => {
  return (
    <div className="flex flex-col space-y-5 min-w-0">
      <Skeleton className="h-[250px] w-full rounded-3xl" />

      <div className="space-y-2 w-full">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
};

export default SkeletonItem;
