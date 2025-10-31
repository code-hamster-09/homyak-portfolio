"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Send, Twitter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/", icon: Github },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/mutalif-sagilan-982248347/",
    icon: Linkedin,
  },
  { name: "GitHub", href: "https://github.com/code-hamster-09", icon: Twitter },
];

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div>
      <Header />
      <main className="p-20 space-y-10">
        <h1 className="text-text-primary text-4xl md:text-5xl lg:text-6xl font-bold">
          Свяжитесь{" "}
          <span className="text-accent-purple text-glow">со мной</span>
        </h1>
        <p className="text-text-secondary text-lg md:text-xl">
          Есть вопрос или предложение? Я всегда открыт для новых возможностей и
          интересных проектов
        </p>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 border border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col gap-6 relative col-span-2">
            <h2 className="text-xl text-text-primary font-bold">Отправить сообщение</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ваше имя"
                    required
                    className="border border-white/10 color-text-secondary px-4 py-2 rounded-2xl bg-text-secondary/5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="border border-white/10 color-text-secondary px-4 py-2 rounded-2xl bg-text-secondary/5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Тема</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Тема сообщения"
                  required
                  className="border border-white/10 color-text-secondary px-4 py-2 rounded-2xl bg-text-secondary/5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Сообщение</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Ваше сообщение..."
                  required
                  rows={6}
                  className="glass border-white/10 resize-none px-4 py-2 rounded-2xl bg-text-secondary/5 text-md"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-purple hover:bg-accent-purple/80 text-white rounded-2xl py-6 flex items-center justify-center text-md font-medium transition-all duration-200"
              >
                {isSubmitting ? (
                  "Отправка..."
                ) : (
                  <>
                    Отправить сообщение
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Card>
          <aside className="space-y-6">
            <Card className="p-6 border border-white/10 rounded-3xl bg-text-secondary/10 transition-transform duration-200 flex flex-col gap-6 relative">
              <h3 className="text-xl text-text-primary font-bold">Социальные сети</h3>
              <div className="space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-text-secondary/10 transition-all rounded-2xl"
                    >
                      <Icon className="h-5 w-5 text-accent-purple" />
                      <span>{social.name}</span>
                    </Link>
                  );
                })}
              </div>
            </Card>
            <Card className="bg-linear-to-br from-accent-purple/20 to-accent-blue/10 rounded-3xl border border-accent-purple/30 p-8">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-accent-purple mt-2 animate-pulse" />
                <div>
                  <h4 className="text-lg font-bold text-text-primary mb-2">
                    Доступность
                  </h4>
                  <p className="text-text-secondary">
                    Я обычно отвечаю на сообщения в течение 24 часов. Спасибо за
                    ваше терпение!
                  </p>
                </div>
              </div>
            </Card>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Page;
