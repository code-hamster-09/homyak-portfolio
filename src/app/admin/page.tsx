import CreateProject from "@/components/CreateProject";

const Page = () => {
  return (
    <div className="p-20">
      <h1 className="text-text-primary text-4xl font-bold">
        Админ <span className="text-accent-purple text-glow">панель</span>
      </h1>
      <p className="text-text-secondary mt-4 max-w-lg">
        Управление контентом и настройками портфолио.
      </p>
      <CreateProject />
    </div>
  );
};

export default Page;
