import { NextResponse } from "next/server";

export async function GET() {
  try {
    const zipUrl = "https://assets.bigskydevcon.com/domain-dash-template.zip";

    // Fetch the zip file
    const response = await fetch(zipUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch template file");
    }

    // Get the file content as array buffer
    const fileBuffer = await response.arrayBuffer();

    // Create response with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition":
          'attachment; filename="domain-dash-template.zip"',
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download template" },
      { status: 500 }
    );
  }
}
