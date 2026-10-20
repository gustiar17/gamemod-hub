import { createContext, useContext, type ReactNode } from "react";
import { en, type Messages } from "./en";
import { id } from "./id";

export type Lang = "en" | "id";
export const LANGS: Record<Lang, { label: string; messages: Messages }> = {
  en: { label: "English", messages: en },
  id: { label: "Bahasa Indonesia", messages: id },
};

type Path<T, P extends string = ""> = {
  [K in keyof T & string]: T[K] extends string ? `${P}${K}` : Path<T[K], `${P}${K}.`>;
}[keyof T & string];
export type MessageKey = Path<Messages>;

export function translate(lang: Lang, key: MessageKey, vars: Record<string, string | number> = {}): string {
  const found = key.split(".").reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], LANGS[lang].messages);
  const text = typeof found === "string" ? found : key;
  return text.replace(/\{(\w+)\}/g, (_, v: string) => String(vars[v] ?? `{${v}}`));
}

const Ctx = createContext<Lang>("en");

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <Ctx.Provider value={lang}>{children}</Ctx.Provider>;
}

export function useT() {
  const lang = useContext(Ctx);
  return (key: MessageKey, vars?: Record<string, string | number>) => translate(lang, key, vars);
}
