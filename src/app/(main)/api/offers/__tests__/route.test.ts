import { POST } from "../route";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { cleanDomainName, submitDomainOffer } from "@/lib/supabase/actions";

// Mock dependencies
jest.mock("@/lib/supabase/actions");

describe("Offers API", () => {
  const mockSubmitDomainOffer = submitDomainOffer as jest.MockedFunction<
    typeof submitDomainOffer
  >;
  const mockCleanDomainName = cleanDomainName as jest.MockedFunction<
    typeof cleanDomainName
  >;

  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.clearAllMocks();
    mockCleanDomainName.mockImplementation((domain) => domain);
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should return 405 for non-POST requests", async () => {
    const request = new Request("http://localhost:3000/api/offers", {
      method: "GET",
    });

    const response = await POST(request);
    expect(response.status).toBe(405);
  });

  it("should validate origin in production", async () => {
    Object.defineProperty(process.env, "NODE_ENV", { value: "production" });
    Object.defineProperty(process.env, "ALLOWED_ORIGINS", {
      value: "https://example.com",
    });

    const request = new Request("http://localhost:3000/api/offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "https://malicious.com",
      },
      body: JSON.stringify({
        email: "test@example.com",
        amount: 1000,
        domain: "test.com",
        name: "Test User",
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(403);
  });

  it("should validate offer data", async () => {
    const request = new Request("http://localhost:3000/api/offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "invalid-email",
        amount: -100,
        domain: "invalid domain",
        name: "",
      }),
    });

    const response = await POST(request);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error.message).toContain("Invalid email format");
  });

  it("should successfully submit an offer", async () => {
    mockSubmitDomainOffer.mockResolvedValueOnce({
      domain: "test.com",
      offer: {
        timestamp: new Date().toISOString(),
        name: "Test User",
        domain: "test.com",
        amount: 1000,
        description: "Offer from Test User",
        email: "test@example.com",
      },
      totalOffers: 1,
    });

    const request = new Request("http://localhost:3000/api/offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        amount: 1000,
        domain: "test.com",
        name: "Test User",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({
      domain: "test.com",
      offer: expect.objectContaining({
        name: "Test User",
        domain: "test.com",
        amount: 1000,
        email: "test@example.com",
      }),
    });
    expect(mockSubmitDomainOffer).toHaveBeenCalledWith("test.com", {
      email: "test@example.com",
      amount: 1000,
      domain: "test.com",
      name: "Test User",
      description: "Offer from Test User",
    });
  });
});
