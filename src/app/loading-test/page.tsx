import Link from "next/link";

/**
 * Test route to verify the loading page.
 * Visit /loading-test — you should see the loading screen (logo + dots) for 3 seconds, then this message.
 * Delete this file and folder when done testing.
 */
export default async function LoadingTestPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Loading page works
      </h1>
      <p className="text-foreground">
        If you saw the white screen with logo and bouncing dots for about 3
        seconds, the loading page is working correctly.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-secondary font-semibold hover:underline"
      >
        ← Back to home
      </Link>
    </div>
  );
}
