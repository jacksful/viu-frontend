/**
 * Client-side ZIP availability check against the Laravel API.
 * Configure `NEXT_PUBLIC_ZIP_API_BASE_URL` (e.g. https://portal.fullviu.com/api) for production.
 */

export type ZipCodeDetails = {
  id: number;
  code: string;
  city: string;
  state: string;
  label: string;
  monthly_price: string;
  yearly_price?: string | null;
  leads_count: number;
};

export type ZipAvailabilityResponse = {
  available: boolean;
  message: string;
  is_in_coverage_area: boolean;
  zipcode: ZipCodeDetails | null;
};

export function getZipApiBase(): string {
  return (
    process.env.NEXT_PUBLIC_ZIP_API_BASE_URL?.replace(/\/$/, "") ??
    "https://portal.fullviu.com/api"
  );
}

export async function checkZipAvailability(
  zip: string,
): Promise<ZipAvailabilityResponse> {
  const base = getZipApiBase();
  const url = `${base}/leads/check-availability`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ zipcode: zip }),
  });

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  const body = data as Record<string, unknown> | null;

  if (!res.ok) {
    const msg =
      (typeof body?.message === "string" && body.message) ||
      (typeof body?.error === "string" && body.error) ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }

  if (
    !body ||
    typeof body.available !== "boolean" ||
    typeof body.message !== "string"
  ) {
    throw new Error("Unexpected response from availability service.");
  }

  const isInCoverage =
    typeof body.is_in_coverage_area === "boolean"
      ? body.is_in_coverage_area
      : false;

  return {
    available: body.available,
    message: body.message,
    is_in_coverage_area: isInCoverage,
    zipcode: (body.zipcode as ZipCodeDetails | null | undefined) ?? null,
  };
}

export function formatMonthlyPriceMain(
  monthlyPrice: string | undefined,
): string {
  if (!monthlyPrice) return "199";
  const n = Number.parseFloat(monthlyPrice);
  if (Number.isNaN(n)) {
    return monthlyPrice.replace(/[^\d.]/g, "") || "199";
  }
  return String(Math.round(n));
}

/** Rounded display amount for an API price string; empty if missing / not parseable. */
export function formatPriceMainDisplay(price: string | undefined | null): string {
  if (price == null || String(price).trim() === "") return "";
  const raw = String(price);
  const n = Number.parseFloat(raw);
  if (Number.isNaN(n)) {
    return raw.replace(/[^\d.]/g, "") || "";
  }
  return String(Math.round(n));
}

function monthlyPriceIsZeroOrAbsent(
  monthlyPrice: string | undefined | null,
): boolean {
  if (monthlyPrice == null || String(monthlyPrice).trim() === "") return true;
  const n = Number.parseFloat(String(monthlyPrice));
  if (Number.isNaN(n)) return true;
  return n === 0;
}

/** Prefer monthly pricing; when it is null or 0, show yearly (if present). */
export function getZipPricingDisplay(zip: ZipCodeDetails | null | undefined): {
  amount: string;
  periodSuffix: string;
} {
  const monthly = zip?.monthly_price;
  const yearly = zip?.yearly_price;

  if (!monthlyPriceIsZeroOrAbsent(monthly)) {
    return {
      amount: formatMonthlyPriceMain(monthly),
      periodSuffix: "/MO",
    };
  }

  const yearlyAmount = formatPriceMainDisplay(yearly);
  if (yearlyAmount) {
    return { amount: yearlyAmount, periodSuffix: "/YR" };
  }

  return {
    amount: formatMonthlyPriceMain(monthly),
    periodSuffix: "/MO",
  };
}

/** POST /leads — Laravel territory lead capture */
export type SubmitLeadPayload = {
  name: string;
  email: string;
  phone: string;
  zipcodes: number[];
  initial_notes: string;
};

export type SubmitLeadResponse = {
  success: boolean;
  message: string;
  data?: {
    id: number;
    zipcode_ids: string;
  };
};

function formatLaravelError(
  body: Record<string, unknown> | null,
): string | null {
  if (!body) return null;
  if (typeof body.message === "string" && body.message.trim()) {
    return body.message;
  }
  const errors = body.errors;
  if (errors && typeof errors === "object" && errors !== null) {
    const first = Object.values(errors)[0];
    if (Array.isArray(first) && typeof first[0] === "string") {
      return first[0];
    }
  }
  return null;
}

export async function submitLead(
  payload: SubmitLeadPayload,
): Promise<SubmitLeadResponse> {
  const base = getZipApiBase();
  const url = `${base}/leads`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  const body = data as Record<string, unknown> | null;

  if (!res.ok) {
    const msg = formatLaravelError(body) || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  const parsed = body as SubmitLeadResponse | null;
  if (!parsed || typeof parsed.success !== "boolean") {
    throw new Error("Unexpected response from lead service.");
  }

  if (!parsed.success) {
    throw new Error(
      typeof parsed.message === "string" && parsed.message
        ? parsed.message
        : "Could not submit your request.",
    );
  }

  return parsed;
}
