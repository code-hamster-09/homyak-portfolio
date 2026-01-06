import Skeleton from "../ui/skeleton";

const ProjectsSkeleton: React.FC = () => {
  return (
    <Skeleton className="w-full rounded-3xl">
      <Skeleton className="h-[250px] w-full rounded-3xl rounded-b-none" />

      <div className="space-y-2 w-full p-6 pt-12">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </Skeleton>
  );
};

export default ProjectsSkeleton;