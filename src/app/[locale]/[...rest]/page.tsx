import { notFound } from "next/navigation";

/**
 * Catches every path under a locale that no real route claimed, so an unknown
 * address gets the site's own 404 rather than the framework's. More specific
 * segments win over a catch-all, so nothing that exists is routed here.
 */
export default function CatchAll(): never {
  notFound();
}
