import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type ContactType = {
  type: string;
  value: string[];
};

export default function Home() {
  const contacts: ContactType[] = [
    { type: "Email", value: ["hello@dev.com"] },
    { type: "Телефон", value: ["+7 (999) 123-45-67"] },
    { type: "Социальные сети", value: ["Twitter", "LinkedIn", "GitHub"] },
  ];
  return (
    <div className="">
      <Header />
      <main className="p-20 space-y-30">
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          <div className="flex-1 space-y-12">
            <h1 className="text-text-primary text-4xl md:text-5xl lg:text-6xl font-bold">
              Привет, я{" "}
              <span className="text-accent-purple text-glow">Homyak</span>
            </h1>
            <p className="text-text-secondary text-lg md:text-xl">
              Создаю современные веб-приложения с фокусом на пользовательский
              опыт и производительность. Специализируюсь на React, Next.js и
              TypeScript.
            </p>
            <Link href={"/projects"}>
              <Button className="box-glow">Посмотреть проекты</Button>
            </Link>
          </div>
          <div className="w-full max-w-[400px] aspect-square">
            <Image
              src="/homyakImage.jpg"
              alt="Homyak illustration"
              width={400}
              height={400}
              className="bg-white/10 rounded-full hover:bg-white/20 transition-colors w-full h-full"
              priority
            />
          </div>
        </section>
        <section className="flex flex-col items-center gap-6">
          <h2 className="text-6xl text-text-primary font-bold">
            Давайте работать вместе
          </h2>
          <p className="text-xl text-text-secondary">
            Если у вас есть интересный проект или вы хотите обсудить возможности
            сотрудничества, я всегда открыт для общения.
          </p>
          <div className="flex space-x-3 justify-around p-10 border border-white/10 mt-8 rounded-4xl bg-text-secondary/5 backdrop-blur-sm text-center w-full">
            {contacts.map((contact) => (
              <div
                key={contact.type}
                className="flex flex-col space-y-2 font-medium"
              >
                <span className="text-text-secondary">{contact.type}</span>
                <div className="space-x-8 text-accent-purple text-xl">
                  {contact.value.map((val) => (
                    <Link className="hover:opacity-80 transition-all duration-200" key={val} href="#">
                      {val}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Link href="/contact">
            <Button className="mt-8">Связаться со мной</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
