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
    title: "Концептуальный хакинг",
    description:
      "Фокус на архитектуре систем, паттернах проектирования и внутренней логике работы инструментов вместо зазубривания документации.",
  },
  {
    icon: Zap,
    title: "Быстрый вывод в прод",
    description:
      "Минимальный шаг от разбора сложных инженерных концепций до написания работающего, оптимизированного кода на реальных задачах.",
  },
  {
    icon: GitBranch,
    title: "AI как стратегический инструмент",
    description:
      "Глубокое использование нейросетей для код-ревью, рефакторинга, генерации архитектурных планов и ускорения рутинной разработки.",
  },
  {
    icon: Target,
    title: "Итеративная архитектура",
    description:
      "Постоянный поиск узких мест (bottlenecks), оптимизация стейт-менеджмента и доведение костыльных решений до уровня Best Practices.",
  },
];

const skills = [
  {
    category: "Frontend Core",
    items: [
      "JavaScript (ES6+) / TypeScript",
      "React / Next.js (App & Pages Router)",
      "Redux / Redux Toolkit / Context API",
      "Tailwind CSS / Shadcn UI / CSS Modules / SCSS",
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      "PHP / Laravel Framework",
      "SQL / PostgreSQL",
      "Проектирование REST API",
      "Построение CRUD и миграции данных",
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      "Git / GitHub / GitLab",
      "Docker (контейнеризация)",
      "Vite / npm / Node.js runtime",
      "Vercel / Хостинг проектов",
    ],
  },
];

const hobbies = [
  {
    icon: Code2,
    title: "Программирование и R&D",
    description:
      "Изучение новых технологий (сейчас активно копаю в NestJS) и создание собственных пет-проектов.",
  },
  {
    icon: Palette,
    title: "UI/UX Архитектура",
    description:
      "Проектирование интерфейсов, дизайн-систем и логики взаимодействия с пользователем в Figma.",
  },
  {
    icon: Gamepad2,
    title: "Стратегии и инди-игры",
    description:
      "Анализ игровых механик, баланса и логических паттернов в сложных тактических играх.",
  },
  {
    icon: Music,
    title: "Электронная музыка",
    description:
      "Слушаю Ambient и IDM для глубокого погружения в код во время ночных сессий.",
  },
  {
    icon: Camera,
    title: "Фотография",
    description: "Урбанистика, геометрия зданий и съемка городских пейзажей.",
  },
  {
    icon: Book,
    title: "Чтение",
    description:
      "Техническая литература, архитектурные гайды и научная фантастика.",
  },
];

const Page = () => {
  return (
    <main className="space-y-30 p-4 sm:p-12 md:p-20">
      <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
        <div className="flex-1">
          <h1 className="text-text-primary text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-20">
            Обо <span className="text-accent-purple text-glow">мне</span>
          </h1>
          <p className="text-text-secondary md:text-lg">
            Я Full-Stack / Front-End разработчик из Алматы. Специализируюсь на
            создании высокопроизводительных веб-приложений на связке React,
            Next.js и Laravel. Моя главная фишка —{" "}
            <strong className="text-text-primary">
              высокая скорость адаптации и упор на архитектуру
            </strong>
            . Вместо пассивного чтения мануалов я разбираюсь, как технологии
            работают «под капотом», быстро осваиваю сложные инструменты и сразу
            внедряю их в практику.
            <br />
            <br />
            Мой путь в веб-разработке начался в 2022 году. Самообучение
            позволило мне выработать собственную систему разбора сложных систем,
            благодаря которой я могу осваивать продвинутые фреймворки за
            считанные дни. Я рассматриваю современные AI-инструменты не как
            костыль для синтаксиса, а как мощный ускоритель процессов — для
            глубокого рефакторинга кода и оптимизации логики.
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
            🎯 Текущий челлендж: Полноценный Full-Stack и высоконагруженная
            логика
          </h2>

          <div className="space-y-4 text-gray-300/80 leading-relaxed text-lg">
            <p>
              <strong className="text-text-primary">Вектор развития:</strong> Я
              ищу нетривиальные, комплексные задачи, где клиентская и серверная
              части приложения должны работать как единый, отказоустойчивый
              механизм.
            </p>
            <p>
              <strong className="text-text-primary">Мой подход:</strong> Наличие
              коммерческого опыта в бэкенде (Laravel/PostgreSQL) в сочетании с
              современным фронтендом (React/Next.js) позволяет мне полностью
              закрывать цикл разработки фичи — от структуры БД до интерфейса.
            </p>
            <p>
              <strong className="text-text-primary">Цель:</strong> Стирать
              границы между сложным UI и эффективным бэком, обеспечивая
              максимальную скорость работы интерфейсов и безопасность данных.
            </p>
          </div>
        </div>
      </section>
      <section className="">
        <div className="mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            🚀 Метод: Итеративное обучение через практику
          </h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            В основе моей работы лежит понимание внутренних процессов
            технологии, которое закрепляется решением реальных бизнес-задач.
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
          Навыки
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
        <h2 className="text-4xl text-text-primary font-bold">Увлечения</h2>
        <p className="text-text-secondary text-lg mb-10">
          Чем я занимаюсь в свободное от коммерческого кода время
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
