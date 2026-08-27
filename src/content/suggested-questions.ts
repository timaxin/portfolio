import type { Localized } from "@/i18n/config";

/** Starter prompts: they set the tone and show what the bot can actually be asked. */
export const suggestedQuestions: Localized<string[]> = {
  ru: [
    "Какой у него основной стек?",
    "Расскажи про самый сложный проект",
    "Есть ли опыт с Nest.js и на каких задачах?",
    "Чего в его опыте нет?",
    "Готов ли он к релокации и как с ним связаться?",
  ],
  en: [
    "What's his main stack?",
    "Tell me about his hardest project",
    "Does he have Nest.js experience, and on what kind of work?",
    "What's missing from his experience?",
    "Is he open to relocation, and how do I reach him?",
  ],
  pl: [
    "Jaki jest jego główny stack?",
    "Opowiedz o najtrudniejszym projekcie",
    "Czy ma doświadczenie z Nest.js i przy jakich zadaniach?",
    "Czego brakuje w jego doświadczeniu?",
    "Czy jest otwarty na relokację i jak się z nim skontaktować?",
  ],
};
