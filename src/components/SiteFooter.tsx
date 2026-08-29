import { profile } from "@/content/profile";

/** Baked at build time; a redeploy is what moves it, which is often enough. */
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-5 text-xs text-muted">
        {profile.contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            className="transition-colors hover:text-accent"
            target={contact.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            {contact.label}: {contact.value}
          </a>
        ))}

        <span className="ml-auto">
          © {year} {profile.name}
        </span>
      </div>
    </footer>
  );
}
