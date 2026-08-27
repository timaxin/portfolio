import { Chat } from "@/components/Chat";
import { profile } from "@/content/profile";

export default function HomePage() {
  return (
    <>
      <section className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {profile.name}
        </h1>
        <p className="mt-1 text-sm text-muted">{profile.headline}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed">{profile.summary}</p>
        <p className="mt-3 text-sm text-muted">{profile.availability}</p>
      </section>

      <Chat />
    </>
  );
}
