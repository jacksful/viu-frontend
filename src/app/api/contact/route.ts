import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, zipCode } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Forward to your external API/Dashboard
    const externalApiUrl = process.env.CONTACT_API_URL;

    if (externalApiUrl) {
      const response = await fetch(externalApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.API_KEY && {
            Authorization: `Bearer ${process.env.API_KEY}`,
          }),
        },
        body: JSON.stringify({ name, email, phone, message, zipCode }),
      });

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Fallback mock response
    return NextResponse.json({
      success: true,
      message: "Thank you! A territory specialist will contact you shortly.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
