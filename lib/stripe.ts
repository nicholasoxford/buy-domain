interface StripeRequestOptions {
  method: "GET" | "POST" | "DELETE";
  path: string;
  data?: any;
}

export async function stripeRequest<T>(
  { method, path, data }: StripeRequestOptions,
  secretKey: string
): Promise<T> {
  const response = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      "Stripe-Version": "2023-10-16",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = (await response.json()) as { error?: { message: string } };
    throw new Error(error.error?.message || "Stripe API error");
  }

  return response.json();
}
