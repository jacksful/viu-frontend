import { client } from "./client";

// Get site settings (nav, footer, logo, etc.)
export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]{
    siteName,
    "logoUrl": logo.asset->url,
    "logoDarkUrl": logoDark.asset->url,
    navLinks,
    socialLinks,
    footerDescription,
    contactEmail,
    location,
    seo
  }`);
}

// Get a page by slug with all sections
export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      title,
      slug,
      seo,
      sections[]{
        _type,
        _key,
        ...,
        image{ asset->{ url, metadata } },
        backgroundImage{ asset->{ url, metadata } }
      }
    }`,
    { slug }
  );
}

// Get all page slugs (for static generation)
export async function getAllPageSlugs() {
  return client.fetch(`*[_type == "page"].slug.current`);
}
