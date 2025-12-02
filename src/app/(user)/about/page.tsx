import {
  Book,
  Brain,
  Camera,
  Code2,
  Gamepad2,
  GitBranch,
  Music,
  Palette,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";

const learningMethod = [
  {
    icon: Brain,
    title: "Conceptual Hacking",
    description: "Focus on core concepts instead of memorizing documentation",
  },
  {
    icon: Zap,
    title: "Immediate Practice",
    description: "From theory to code in hours, not weeks",
  },
  {
    icon: GitBranch,
    title: "AI as a Tool",
    description: "Smart use of AI for accelerated system adoption",
  },
  {
    icon: Target,
    title: "Iterative Development",
    description: "Analysis, understanding the pattern, practical application",
  },
];
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

const Page = () => {
  return (
    <main className="space-y-30 p-4 sm:p-12 md:p-20">
      <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
        <div className="flex-1">
          <h1 className="text-text-primary text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-20">
            About <span className="text-accent-purple text-glow">me</span>
          </h1>
          <p className="text-text-secondary md:text-lg">
            I am a 16-year-old Front-End Developer from Almaty, specializing in
            React and Next.js. I refuse to waste time passively reading
            voluminous documentation. My approach is{" "}
            <strong className="text-text-primary">Conceptual Hacking</strong>:
            gaining a small but deep theoretical foundation, immediately
            grasping the system&apos;s architecture, and then jumping straight
            into practice, using AI as a strategic boost to achieve rapid
            mastery of frameworks.
            <br />
            <br />
            My journey began in 2022, where a subpar experience with a JS mentor
            became my greatest incentive for self-study. This unsuccessful
            encounter compelled me to develop my own highly effective learning
            system, which allows me to master complex, advanced frameworks not
            over months, but in a matter of days.
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
      <section className="max-w-5xl mx-auto">
        <div className="p-6 md:p-10 lg:p-12 border border-white/10 rounded-3xl md:rounded-4xl bg-white/5 backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            🎯 Current Challange: Solving Complex Problems (React Native) Using
            the AI Strategist Method
          </h2>
          <div className="space-y-4 text-gray-300/80 leading-relaxed text-lg">
            <p>
              <strong className="text-text-primary">Idea:</strong> Create a
              reliable, autonomous tool for survival in conditions of complete
              absence of the Internet — an offline AI assistant on React Native.
            </p>
            <p>
              <strong className="text-text-primary">My role:</strong> I
              didn&apos;t spend months learning mobile development. I took on
              the <strong className="text-accent-purple">AI-Strategist</strong>{" "}
              role: I formulate high-level technical tasks, then manage the AI
              that performs the coding, constantly monitoring, adapting, and
              optimizing the generated React Native code.
            </p>
            <p>
              <strong className="text-text-primary">Goal:</strong> Don&apos;t
              write every line, but provide a working, reliable, and autonomous
              solution for the most complex, non-trivial task.
            </p>
          </div>
        </div>
      </section>
      <section className="">
        <div className="mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            🚀 Method: Iterative Learning through Practice
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            My approach is based on understanding how technology works “under
            the hood”, then applying it in practice using real-world examples.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningMethod.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="p-6 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-4">
                    <div className="p-3 rounded-2xl bg-accent-purple/15 w-fit border border-white/10">
                      <Icon className="h-6 w-6 text-accent-purple" />
                    </div>
                    <h3 className="text-xl font-semibold">{method.title}</h3>
                    <p className="text-md text-text-secondary">
                      {method.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
        <p className="text-text-secondary text-lg mb-10">
          What I do in my free time
        </p>
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
