export async function getPublicJsonClient<T>(pathname: string): Promise<T> {
  const res = await fetch(pathname);
  if (!res.ok) {
    throw new Error(`Failed to load JSON from ${pathname}: ${res.status}`);
  }
  return (await res.json()) as T;
}

