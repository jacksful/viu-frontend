import { notFound } from "next/navigation";
import { getPageBySlug, getAllPageSlugs } from "@/lib/sanity/queries";
import type { Metadata } from "next";

// Generate static pages from Sanity
export async function generateStaticParams() {
  try {
    const slugs = await getAllPageSlugs();
    return slugs?.map((slug: string) => ({ slug })) || [];
  } catch {
    return [];
  }
}

// Dynamic metadata from Sanity
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const page = await getPageBySlug(slug);
    if (!page) return {};
    return {
      title: page.seo?.title || page.title,
      description: page.seo?.description,
    };
  } catch {
    return {};
  }
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let page;
  try {
    page = await getPageBySlug(slug);
  } catch {
    // Sanity not configured yet — show placeholder
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-[#2a2d7c] mb-4">
            Page: {slug}
          </h1>
          <p className="text-[#6a7282]">
            This page will be loaded from Sanity CMS once configured. Create
            content in the Studio at{" "}
            <a href="/studio" className="text-[#f57f20] underline">
              /studio
            </a>
          </p>
        </div>
      </div>
    );
  }

  if (!page) notFound();

  return (
    <div>
      <h1>{page.title}</h1>
      {/* SectionRenderer will map page.sections to components */}
      {/* This will be fully implemented once Sanity is connected */}
    </div>
  );
}
