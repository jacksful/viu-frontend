import { mergeCmsSections, type CmsResponse } from "@/lib/cms";
import { NextResponse } from "next/server";

/** Proxies Laravel `GET /api/cms` JSON for tooling and same-origin fetch. Page SSR uses `getHomeSections()` with `CMS_API_URL` directly. */
export async function GET() {
  const url = process.env.NEXT_PUBLIC_ZIP_API_BASE_URL?.trim() + "/cms";
  if (!url) {
    const body: CmsResponse = {
      version: "static-fallback",
      sections: mergeCmsSections(undefined),
    };
    return NextResponse.json(body);
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      const body: CmsResponse = {
        version: "fallback",
        sections: mergeCmsSections(undefined),
      };
      return NextResponse.json(body, { status: 200 });
    }
    const remote = (await res.json()) as Partial<CmsResponse>;
    const body: CmsResponse = {
      version: remote.version ?? "",
      sections: mergeCmsSections(remote.sections),
    };
    return NextResponse.json(body);
  } catch {
    const body: CmsResponse = {
      version: "fallback",
      sections: mergeCmsSections(undefined),
    };
    return NextResponse.json(body);
  }
}
