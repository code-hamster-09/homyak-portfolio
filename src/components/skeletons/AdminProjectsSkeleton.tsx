import Skeleton from "../ui/skeleton";

const AdminProjectsSkeleton: React.FC = () => {
  return (
      <Skeleton className="h-[130px] w-full rounded-3xl space-y-2 p-4" >
        <div className="flex justify-between">
          <Skeleton className="h-8 w-[20%]" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-12" />
          </div>
        </div>
        <Skeleton className="h-5 w-[50%]" />
        <Skeleton className="h-7 w-[30%]" />
      </Skeleton>
  );
};

export default AdminProjectsSkeleton;