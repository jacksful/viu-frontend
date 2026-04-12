import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { zipCode } = await request.json();

    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
      return NextResponse.json(
        { error: "Please enter a valid 5-digit ZIP code." },
        { status: 400 },
      );
    }

    // Forward to your external API
    const externalApiUrl = process.env.ZIP_CHECK_API_URL;

    if (externalApiUrl) {
      const response = await fetch(externalApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.API_KEY && {
            Authorization: `Bearer ${process.env.API_KEY}`,
          }),
        },
        body: JSON.stringify({ zipCode }),
      });

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Fallback mock response when no external API is configured
    return NextResponse.json({
      available: true,
      zipCode,
      message: `ZIP code ${zipCode} is available for territory ownership!`,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
