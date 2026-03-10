export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("reCAPTCHA secret key is not configured");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    if (data.success && data.score >= 0.5) {
      return true;
    }

    console.warn("reCAPTCHA verification failed:", {
      success: data.success,
      score: data.score,
      errorCodes: data["error-codes"],
    });

    return false;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}
