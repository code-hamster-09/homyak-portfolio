import Skeleton from "../ui/skeleton";

const ProjectsSkeleton: React.FC = () => {
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

export default ProjectsSkeleton;