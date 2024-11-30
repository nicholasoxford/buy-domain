import { POST } from "../route";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import {
  createStripeClient,
  processStripeEvent,
  verifyStripeWebhook,
} from "@/lib/stripe";
import type Stripe from "stripe";

// Mock dependencies
jest.mock("@/lib/stripe");

describe("Stripe Webhook API", () => {
  const mockCreateStripeClient = createStripeClient as jest.MockedFunction<
    typeof createStripeClient
  >;
  const mockProcessStripeEvent = processStripeEvent as jest.MockedFunction<
    typeof processStripeEvent
  >;
  const mockVerifyStripeWebhook = verifyStripeWebhook as jest.MockedFunction<
    typeof verifyStripeWebhook
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 405 for non-POST requests", async () => {
    const request = new Request("http://localhost:3000/api/webhooks/stripe", {
      method: "GET",
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.error.message).toBe("Method not allowed");
  });

  it("should return 400 if stripe signature is missing", async () => {
    const request = new Request("http://localhost:3000/api/webhooks/stripe", {
      method: "POST",
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error.message).toBe("No Stripe signature found");
  });

  it("should process valid webhook events", async () => {
    const mockEvent = {
      id: "evt_test",
      object: "event",
      api_version: "2023-10-16",
      created: Date.now(),
      type: "checkout.session.completed",
      data: { object: {} },
      livemode: false,
      pending_webhooks: 0,
      request: { id: "req_test", idempotency_key: "test" },
    } as Stripe.Event;

    mockCreateStripeClient.mockReturnValueOnce({} as any);
    mockVerifyStripeWebhook.mockResolvedValueOnce({
      event: mockEvent,
      rawBody: JSON.stringify(mockEvent),
    });
    mockProcessStripeEvent.mockResolvedValueOnce(undefined);

    const request = new Request("http://localhost:3000/api/webhooks/stripe", {
      method: "POST",
      headers: {
        "stripe-signature": "test-signature",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ received: true });
    expect(mockProcessStripeEvent).toHaveBeenCalledWith(mockEvent, {});
  });

  it("should retry processing on failure", async () => {
    const mockEvent = {
      id: "evt_test",
      object: "event",
      api_version: "2023-10-16",
      created: Date.now(),
      type: "checkout.session.completed",
      data: { object: {} },
      livemode: false,
      pending_webhooks: 0,
      request: { id: "req_test", idempotency_key: "test" },
    } as Stripe.Event;

    mockCreateStripeClient.mockReturnValueOnce({} as any);
    mockVerifyStripeWebhook.mockResolvedValueOnce({
      event: mockEvent,
      rawBody: JSON.stringify(mockEvent),
    });
    mockProcessStripeEvent
      .mockRejectedValueOnce(new Error("First failure"))
      .mockRejectedValueOnce(new Error("Second failure"))
      .mockResolvedValueOnce(undefined);

    const request = new Request("http://localhost:3000/api/webhooks/stripe", {
      method: "POST",
      headers: {
        "stripe-signature": "test-signature",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ received: true });
    expect(mockProcessStripeEvent).toHaveBeenCalledTimes(3);
  });

  it("should fail after max retries", async () => {
    const mockEvent = {
      id: "evt_test",
      object: "event",
      api_version: "2023-10-16",
      created: Date.now(),
      type: "checkout.session.completed",
      data: { object: {} },
      livemode: false,
      pending_webhooks: 0,
      request: { id: "req_test", idempotency_key: "test" },
    } as Stripe.Event;

    mockCreateStripeClient.mockReturnValueOnce({} as any);
    mockVerifyStripeWebhook.mockResolvedValueOnce({
      event: mockEvent,
      rawBody: JSON.stringify(mockEvent),
    });
    mockProcessStripeEvent.mockRejectedValue(new Error("Persistent failure"));

    const request = new Request("http://localhost:3000/api/webhooks/stripe", {
      method: "POST",
      headers: {
        "stripe-signature": "test-signature",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error.message).toContain(
      "Failed to process Stripe event after 3 retries"
    );
    expect(mockProcessStripeEvent).toHaveBeenCalledTimes(3);
  });
});
