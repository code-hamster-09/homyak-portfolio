"use client";

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
      {/* Обычная кнопка-триггер */}
      <Header />
      <main className="p-4 sm:p-12 md:p-20 space-y-30">
        <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          <div className="flex flex-col lg:text-start lg:items-start flex-1 space-y-12 text-center items-center">
            <h1 className="text-text-primary text-4xl md:text-5xl lg:text-5xl font-bold">
              Привет, я{" "}
              <span className="text-accent-purple text-glow">Homyak</span>
            </h1>
            <p className="text-text-secondary text-md md:text-lg">
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
          <h2 className="text-4xl text-text-primary font-bold">
            Давайте работать вместе
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl text-center">
            Если у вас есть интересный проект или вы хотите обсудить возможности
            сотрудничества, я всегда открыт для общения.
          </p>
          <div className="flex md:flex-row flex-col gap-6 justify-around p-10 border border-white/10 mt-8 rounded-4xl bg-text-secondary/5 backdrop-blur-sm text-center w-full">
            {contacts.map((contact) => (
              <div
                key={contact.type}
                className="flex flex-col md:space-y-2 font-medium"
              >
                <span className="text-text-secondary">{contact.type}</span>
                <div className="space-x-6 text-accent-purple lg:text-xl">
                  {contact.value.map((val) => (
                    <Link
                      className="hover:opacity-80 transition-all duration-200"
                      key={val}
                      href="#"
                    >
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
