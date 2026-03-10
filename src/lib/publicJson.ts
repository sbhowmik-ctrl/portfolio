import { headers } from "next/headers";

export async function getPublicJson<T>(
  pathname: string,
  revalidateSeconds: number = 300
): Promise<T> {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const origin = `${proto}://${host}`;
  const url = `${origin}${pathname}`;

  const res = await fetch(url, { next: { revalidate: revalidateSeconds } });
  if (!res.ok) {
    throw new Error(`Failed to load JSON from ${pathname}: ${res.status}`);
  }
  return (await res.json()) as T;
}
