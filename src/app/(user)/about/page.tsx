import { Book, Camera, Code2, Gamepad2, Music, Palette } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const skills = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Redux Toolkit"],
    },
    {
      category: "UI & Layout",
      items: [
        "Tailwind CSS",
        "Responsive layouts",
        "Component-based approach",
        "Figma workflow",
      ],
    },
    {
      category: "Tools",
      items: ["Git / GitHub", "Vite", "Figma", "Vercel (deploy)"],
    },
  ];
  const hobbies = [
    {
      icon: Code2,
      title: "Programming",
      description: "Learning new technologies and building side projects",
    },
    {
      icon: Palette,
      title: "Design",
      description: "UI/UX design and visual concepts",
    },
    {
      icon: Gamepad2,
      title: "Games",
      description: "Strategy and indie games in spare time",
    },
    {
      icon: Music,
      title: "Music",
      description: "I listen to electronic and ambient music",
    },
    {
      icon: Camera,
      title: "Photography",
      description: "Urban and landscape photography",
    },
    {
      icon: Book,
      title: "Reading",
      description: "Technical literature and sci-fi",
    },
  ];
  return (
    <main className="space-y-30 p-4 sm:p-12 md:p-20">
      <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
        <div className="flex-1">
          <h1 className="text-text-primary text-3xl md:text-4xl lg:text-5xl font-bold mb-20">
            About <span className="text-accent-purple text-glow">me</span>
          </h1>
          <p className="text-text-secondary md:text-lg">
            Hi! I&apos;m a frontend developer passionate about building beautiful and functional web applications. I started programming a few years ago and continuously learn new technologies. <br /> <br /> I specialize in modern JavaScript frameworks and enjoy working on projects that solve real user problems. My approach combines technical craftsmanship with attention to design details. <br /> <br /> When I&apos;m not coding, I explore new tech, contribute to open-source, or pursue my hobbies.
          </p>
        </div>
        <div className="h-full aspect-square">
          <Image
            src="/homyakImage.jpg"
            alt="Homyak illustration"
            width={400}
            height={400}
            className="bg-white/10 rounded-4xl hover:bg-white/20 transition-colors w-full h-full"
            priority
          />
        </div>
      </section>
      <section className="">
        <h2 className="text-4xl text-text-primary font-bold text-center">
          Skills
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="p-6 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm"
            >
              <h3 className="text-xl text-accent-purple font-bold mb-4">
                {skill.category}
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="text-text-secondary text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="space-y-4 text-center">
        <h2 className="text-4xl text-text-primary font-bold">Hobbies</h2>
        <p className="text-text-secondary text-lg mb-10">What I do in my free time</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby) => {
            const Icon = hobby.icon;
            return (
              <div
                key={hobby.title}
                className="border bg-white/5 border-white/10 p-6 rounded-3xl"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-accent-purple/10 border border-white/10">
                    <Icon className="h-6 w-6 text-accent-purple" />
                  </div>
                  <div className="text-start">
                    <h3 className="text-md font-semibold mb-2 text-text-primary">
                      {hobby.title}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {hobby.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Page;
