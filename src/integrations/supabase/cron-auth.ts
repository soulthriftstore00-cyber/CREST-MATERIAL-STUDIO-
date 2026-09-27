export async function authenticateCronRequest(
  request: Request,
): Promise<Response | null> {
  const currentSecret = process.env["CRON_SECRET"];
  const previousSecret = process.env["CRON_SECRET_PREVIOUS"];

  if (!currentSecret) {
    return new Response("Server configuration error", {
      status: 500,
    });
  }

  const match = /^Bearer ([^\s,]+)$/.exec(
    request.headers.get("authorization") ?? "",
  );

  const token = match?.[1];

  if (!token) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const { createHash, timingSafeEqual } = await import("node:crypto");

  const digest = (value: string) =>
    createHash("sha256")
      .update(value, "utf8")
      .digest();

  const providedDigest = digest(token);
  const currentDigest = digest(currentSecret);
  const previousDigest = digest(
    previousSecret ?? currentSecret,
  );

  const currentMatches = timingSafeEqual(
    providedDigest,
    currentDigest,
  );

  const previousMatches = timingSafeEqual(
    providedDigest,
    previousDigest,
  );

  if (!currentMatches && !previousMatches) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  return null;
}
