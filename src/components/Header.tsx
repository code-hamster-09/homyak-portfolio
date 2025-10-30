import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between px-8 py-4 bg-bg-main/85 backdrop-blur-[2px] sticky top-0 left-0 z-50 text-text-primary">
      <span className="text-accent-purple">{"<DEV/>"}</span>
      <Navigation />
    </div>
  );
};

export default Header;
