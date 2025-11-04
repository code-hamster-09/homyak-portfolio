import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Book, Camera, Code2, Gamepad2, Music, Palette } from "lucide-react";
import Image from "next/image";

const Page = () => {
  const skills = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    },
    { category: "Tools", items: ["Git", "Docker", "Figma", "VS Code"] },
  ];
  const hobbies = [
    {
      icon: Code2,
      title: "Программирование",
      description: "Изучение новых технологий и создание side-проектов",
    },
    {
      icon: Palette,
      title: "Дизайн",
      description: "UI/UX дизайн и создание визуальных концепций",
    },
    {
      icon: Gamepad2,
      title: "Игры",
      description: "Стратегии и инди-игры в свободное время",
    },
    {
      icon: Music,
      title: "Музыка",
      description: "Слушаю электронную музыку и ambient",
    },
    {
      icon: Camera,
      title: "Фотография",
      description: "Городская и пейзажная фотография",
    },
    {
      icon: Book,
      title: "Чтение",
      description: "Техническая литература и научная фантастика",
    },
  ];
  return (
    <div>
      <Header />
      <main className="space-y-30 p-4 sm:p-12 md:p-20">
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          <div className="flex-1">
            <h1 className="text-text-primary text-3xl md:text-4xl lg:text-5xl font-bold mb-20">
              Обо <span className="text-accent-purple text-glow">мне</span>
            </h1>
            <p className="text-text-secondary md:text-lg">
              Привет! Я Frontend разработчик с страстью к созданию красивых и
              функциональных веб-приложений. Мой путь в программировании начался
              несколько лет назад, и с тех пор я постоянно изучаю новые
              технологии. <br /> <br /> Я специализируюсь на современных
              JavaScript фреймворках и люблю работать над проектами, которые
              решают реальные проблемы пользователей. Мой подход сочетает
              техническое мастерство с вниманием к деталям дизайна. <br />{" "}
              <br /> Когда я не пишу код, я изучаю новые технологии, работаю над
              open-source проектами или занимаюсь своими хобби.
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
            Навыки
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm"
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
          <h2 className="text-4xl text-text-primary font-bold">Хобби</h2>
          <p className="text-text-secondary text-lg mb-10">
            Чем я занимаюсь в свободное время
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
      <Footer />
    </div>
  );
};

export default Page;
