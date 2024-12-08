import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

interface ErrorResponse {
  error: {
    message: string;
    code?: string;
  };
}

export function handleError(error: unknown): NextResponse<ErrorResponse> {
  console.error("Error:", error);

  // Handle validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: {
          message: error.errors.map((e) => e.message).join(", "),
          code: "VALIDATION_ERROR",
        },
      },
      { status: 400 }
    );
  }

  // Handle known application errors
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
        },
      },
      { status: error.statusCode }
    );
  }

  // Handle unknown errors
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return NextResponse.json(
    {
      error: {
        message,
        code: "INTERNAL_SERVER_ERROR",
      },
    },
    { status: 500 }
  );
}

// Helper function to wrap route handlers with error handling
export function withErrorHandler(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleError(error);
    }
  };
}
