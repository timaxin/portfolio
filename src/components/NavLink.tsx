"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Активной считается ссылка на текущий раздел. Для корня языка сравниваем строго,
 * иначе «Чат» подсвечивался бы и на страницах проектов.
 */
export function NavLink({ href, exact = false, children }: {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "rounded-md bg-accent-soft px-2.5 py-1.5 font-medium text-accent"
          : "rounded-md px-2.5 py-1.5 text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
      }
    >
      {children}
    </Link>
  );
}
