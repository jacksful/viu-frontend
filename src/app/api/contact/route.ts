import { NextRequest, NextResponse } from "next/server";
import { getZipApiBase } from "@/lib/zipAvailability";

function messageFromUnknownBody(body: Record<string, unknown> | null): string {
  if (!body) return "Request failed.";
  if (typeof body.message === "string" && body.message.trim())
    return body.message;
  const errors = body.errors;
  if (errors && typeof errors === "object" && errors !== null) {
    const first = Object.values(errors)[0];
    if (Array.isArray(first) && typeof first[0] === "string") return first[0];
  }
  return "Request failed.";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, zip_of_interest: zipInterest, zipCode } =
      body as Record<string, unknown>;

    const zip_of_interest =
      typeof zipInterest === "string"
        ? zipInterest
        : typeof zipCode === "string"
          ? zipCode
          : "";

    if (!name || !email || typeof name !== "string" || typeof email !== "string") {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const base = getZipApiBase();
    const url = `${base}/interested-people`;

    const payload = {
      name,
      email,
      phone: typeof phone === "string" ? phone : "",
      zip_of_interest,
      message: typeof message === "string" ? message : "",
    };

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(typeof process.env.API_KEY === "string" &&
      process.env.API_KEY.length > 0
        ? { Authorization: `Bearer ${process.env.API_KEY}` }
        : {}),
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    let parsed: Record<string, unknown> | null = null;
    try {
      parsed = (await response.json()) as Record<string, unknown>;
    } catch {
      parsed = null;
    }

    if (!response.ok) {
      const msg = messageFromUnknownBody(parsed);
      return NextResponse.json(
        { success: false, error: msg, message: msg },
        { status: response.status >= 500 ? 502 : response.status },
      );
    }

    const success = parsed?.success === true;
    const messageText =
      typeof parsed?.message === "string"
        ? parsed.message
        : success
          ? "Thank you! A territory specialist will contact you shortly."
          : "Could not submit your request.";

    return NextResponse.json({
      success,
      message: messageText,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
