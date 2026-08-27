import type { Localized } from "@/i18n/config";

/** Starter prompts: they set the tone and show what the bot can actually be asked. */
export const suggestedQuestions: Localized<string[]> = {
  ru: [
    "Какой у него основной стек?",
    "Что он сделал в Godel Technologies?",
    "Есть ли бэкенд-опыт или он только фронтендер?",
    "Чего в его опыте нет?",
    "Какой формат работы и контракт он рассматривает?",
  ],
  en: [
    "What's his main stack?",
    "What did he ship at Godel Technologies?",
    "Does he have backend experience, or is he frontend-only?",
    "What's missing from his experience?",
    "What work format and contract is he after?",
  ],
  pl: [
    "Jaki jest jego główny stack?",
    "Co dowiózł w Godel Technologies?",
    "Czy ma doświadczenie backendowe, czy tylko frontend?",
    "Czego brakuje w jego doświadczeniu?",
    "Jaki format pracy i kontrakt rozważa?",
  ],
};
