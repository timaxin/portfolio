"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * A link counts as active when it points at the current section. The language root is
 * matched exactly, otherwise "Chat" would stay highlighted on the project pages too.
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
