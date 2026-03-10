"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-slate-100">
      <h1 className="text-xl font-semibold text-slate-50">Something went wrong</h1>
      <p className="mt-2 max-w-md text-center text-sm text-slate-400">
        The site couldn’t load properly. Try refreshing the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400"
      >
        Try again
      </button>
    </div>
  );
}
