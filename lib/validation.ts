import { z } from "zod";

// Domain validation
export const domainSchema = z
  .string()
  .min(1, "Domain is required")
  .regex(
    /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
    "Invalid domain format"
  );

// Offer validation
export const offerSchema = z.object({
  email: z.string().email("Invalid email format"),
  amount: z.number().positive("Amount must be positive"),
  description: z.string().optional(),
  domain: domainSchema,
  name: z.string().min(1, "Name is required"),
});

// Payment validation
export const paymentSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
});

// Collaborator validation
export const collaboratorSchema = z.object({
  username: z.string().min(1, "Username is required"),
  sessionId: z.string().min(1, "Session ID is required"),
});

// Threshold validation
export const thresholdSchema = z.object({
  threshold: z.number().positive("Threshold must be positive"),
});

// Helper function to validate data against a schema
export async function validateData<T>(
  schema: z.Schema<T>,
  data: unknown
): Promise<T> {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map((e) => e.message).join(", ");
      throw new Error(message);
    }
    throw error;
  }
}
