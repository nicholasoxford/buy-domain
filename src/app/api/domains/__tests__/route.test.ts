import { POST } from "../route";
import { auth } from "@/lib/auth";
import { addDomain } from "@/lib/supabase/actions";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";

// Mock dependencies
jest.mock("@/lib/auth");
jest.mock("@/lib/supabase/actions");

describe("Domains API", () => {
  const mockAuth = auth as jest.MockedFunction<typeof auth>;
  const mockAddDomain = addDomain as jest.MockedFunction<typeof addDomain>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if user is not authenticated", async () => {
    mockAuth.mockResolvedValueOnce(null);

    const request = new Request("http://localhost:3000/api/domains", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": "test-secret",
      },
      body: JSON.stringify({ domain: "test.com" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data).toEqual({ error: "Unauthorized" });
  });

  it("should return 403 if CSRF token is invalid", async () => {
    mockAuth.mockResolvedValueOnce({
      user: { id: "test-user", email: "test@example.com" },
    });

    const request = new Request("http://localhost:3000/api/domains", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": "invalid-token",
      },
      body: JSON.stringify({ domain: "test.com" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data).toEqual({ error: "Invalid CSRF token" });
  });

  it("should return 400 if domain is invalid", async () => {
    mockAuth.mockResolvedValueOnce({
      user: { id: "test-user", email: "test@example.com" },
    });

    const request = new Request("http://localhost:3000/api/domains", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": "test-secret",
      },
      body: JSON.stringify({ domain: "invalid domain" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error.message).toContain("Invalid domain format");
  });

  it("should successfully add a domain", async () => {
    mockAuth.mockResolvedValueOnce({
      user: { id: "test-user", email: "test@example.com" },
    });
    mockAddDomain.mockResolvedValueOnce({
      domain: "test.com",
      user_id: "test-user",
      created_at: "2024-03-20T00:00:00Z",
      metadata: {},
      notification_frequencies: ["daily"],
      notification_threshold: 0,
      vercel_project_id: null,
      verification_details: {},
      verified: false,
    });

    const request = new Request("http://localhost:3000/api/domains", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": "test-secret",
      },
      body: JSON.stringify({ domain: "test.com" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockAddDomain).toHaveBeenCalledWith("test.com", "test-user");
  });
});
