import Skeleton from "../ui/skeleton";

const MessagesSkeleton: React.FC = () => {
  return (
    <Skeleton className="h-[130px] w-full rounded-3xl space-y-2 p-4">
      <Skeleton className="h-7 w-[30%]" />
      <Skeleton className="h-8 w-[60%]" />
      <div className="flex justify-between">
        <Skeleton className="h-5 w-[20%]" />
        <Skeleton className="h-5 w-12" />
      </div>
    </Skeleton>
  );
};

export default MessagesSkeleton;
