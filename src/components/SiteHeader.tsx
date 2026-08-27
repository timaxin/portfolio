import Link from "next/link";
import { profile } from "@/content/profile";

const nav = [
  { href: "/", label: "Чат" },
  { href: "/projects", label: "Проекты" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-surface/70 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{profile.name}</span>
          <span className="text-xs text-muted">{profile.headline}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
