/**
 * Browser storage adapter for Supabase authentication.
 *
 * Lovable preview authentication has been removed.
 * The application now uses standard browser localStorage.
 */

export function brokeredPreviewStorage(): Storage | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    return window.localStorage;
  } catch (error) {
    console.warn(
      "[Supabase] Browser storage is unavailable. Authentication persistence is disabled.",
      error,
    );

    return undefined;
  }
}
