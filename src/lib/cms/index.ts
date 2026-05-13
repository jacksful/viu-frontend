/** Types and loaders for Laravel `/api/cms` home payload. */

export type CmsStrategicFeature = {
  title: string;
  icon_path: string | null;
  description: string;
  icon_url: string | null;
};

export type CmsTerritoryChecklistItem = { text: string };

export type CmsTerritoryColumn = {
  label: string;
  icon_path: string | null;
  icon_url: string | null;
};

export type CmsPricingFeatureLine = { text: string };

export type CmsFaqItem = {
  question: string;
  answer: string;
  opened: boolean;
};

export type CmsHeroSection = {
  id?: number;
  title: string;
  description: string;
  image_path?: string | null;
  image_url: string | null;
};

export type CmsStrategicWindowSection = {
  id?: number;
  badge_text: string;
  headline_primary: string;
  headline_accent: string;
  intro: string;
  features: CmsStrategicFeature[];
  visual_image_path?: string | null;
  card_icon_path?: string | null;
  card_kicker: string;
  card_title: string;
  card_metric_label: string;
  card_metric_percent: number;
  card_quote: string;
  visual_image_url: string | null;
  card_icon_url: string | null;
};

export type CmsTerritoryZipSection = {
  id?: number;
  badge_text: string;
  headline_primary: string;
  headline_accent: string;
  intro: string;
  checklist_items: CmsTerritoryChecklistItem[];
  feature_columns: CmsTerritoryColumn[];
  left_visual_image_path?: string | null;
  left_card_icon_path?: string | null;
  card_kicker: string;
  card_title: string;
  checklist_check_icon_path?: string | null;
  quote_icon_path?: string | null;
  quote_text: string;
  left_visual_image_url: string | null;
  left_card_icon_url: string | null;
  quote_icon_url: string | null;
  checklist_check_icon_url: string | null;
};

export type CmsRecognitionSection = {
  id?: number;
  badge_text: string;
  headline_line_1: string;
  headline_line_2: string;
  headline_line_3: string;
  intro: string;
  box_top_left: string;
  box_top_right: string;
  box_wide_body: string;
  box_wide_accent: string;
  right_image_path?: string | null;
  card_logo_path?: string | null;
  card_kicker: string;
  card_title: string;
  card_progress_label_left: string;
  card_progress_label_right: string;
  card_progress_percent: number;
  right_image_url: string | null;
  card_logo_url: string | null;
};

export type CmsPricingSection = {
  id?: number;
  left_image_path?: string | null;
  card_label_starting: string;
  card_price_display: string;
  card_price_period: string;
  card_per_label: string;
  card_footer_note: string;
  badge_text: string;
  heading: string;
  intro: string;
  feature_lines: CmsPricingFeatureLine[];
  cta_label: string;
  cta_href: string;
  left_image_url: string | null;
};

export type CmsQaSection = {
  id?: number;
  badge_text: string;
  heading: string;
  intro: string;
  support_label: string;
  support_email: string;
  support_icon_path?: string | null;
  faq_items: CmsFaqItem[];
  support_icon_url: string | null;
};

export type CmsSections = {
  hero: CmsHeroSection;
  strategic_window: CmsStrategicWindowSection;
  territory_zip: CmsTerritoryZipSection;
  recognition: CmsRecognitionSection;
  pricing: CmsPricingSection;
  qa: CmsQaSection;
};

export type CmsResponse = {
  version: string;
  sections: CmsSections;
};

const defaultSections: CmsSections = {
  hero: {
    title: "OWN THE MARKET BEFORE THEY SELL",
    description:
      "Viu uses predictive modeling to place your brand in front of homeowners up to 90 days before they decide to sell — securing your position before search even begins.",
    image_url: "/images/hero-bg.jpg",
  },
  strategic_window: {
    badge_text: "The 90-day strategic window",
    headline_primary: "Be first.",
    headline_accent: "Be known.",
    intro:
      "Homeowners don't decide to sell overnight. There's a window — often 90 days or more — where they're observing the market before any formal action.",
    features: [
      {
        title: "Identification",
        icon_path: null,
        description:
          "Viu identifies homeowners likely to sell during that critical window using predictive behavior analytics.",
        icon_url: null,
      },
      {
        title: "Consistent presence",
        icon_path: null,
        description:
          "Your brand appears daily on the platforms they trust, building familiarity long before search begins.",
        icon_url: null,
      },
      {
        title: "Market advantage",
        icon_path: null,
        description:
          "When they finally decide to reach out, your name isn't new — it's already the market authority.",
        icon_url: null,
      },
    ],
    card_kicker: "Predictive signal",
    card_title: "90210 market intensity",
    card_metric_label: "Early interest",
    card_metric_percent: 42,
    card_quote: "Capturing attention 3 months before listing behavior peaks.",
    visual_image_url: "/images/section-1.jpg",
    card_icon_url: null,
  },
  territory_zip: {
    badge_text: "Territory lock engaged",
    headline_primary: "One ZIP.",
    headline_accent: "One agent.",
    intro:
      "Every ZIP inside Viu is assigned to a single agent at a time. While active, no other agent can enter that ZIP.",
    checklist_items: [
      { text: "Predictive homeowner targeting active" },
      { text: "Daily brand reinforcement running" },
      { text: "Competitor lockout engaged" },
      { text: "Market share compounding" },
    ],
    feature_columns: [
      { label: "No sharing", icon_path: null, icon_url: null },
      { label: "No overlap", icon_path: null, icon_url: null },
      { label: "No congestion", icon_path: null, icon_url: null },
    ],
    card_kicker: "ZIP Territory: 90210",
    card_title: "Market Ownership",
    quote_text: "When a ZIP is live, it's yours. Period.",
    left_visual_image_url: "/images/section-2.jpg",
    left_card_icon_url: null,
    quote_icon_url: null,
    checklist_check_icon_url: null,
  },
  recognition: {
    badge_text: "Permanent brand authority",
    headline_line_1: "Built for",
    headline_line_2: "Long-term",
    headline_line_3: "Recognition",
    intro:
      "Viu places your brand across the sites homeowners already visit, creating consistent visibility over time.",
    box_top_left: "Some homeowners engage quickly.",
    box_top_right: "Others take longer.",
    box_wide_body:
      "What matters is that when the moment arrives, your name isn't new — it's already known.",
    box_wide_accent: "Familiarity creates trust",
    card_kicker: "Market authority",
    card_title: "Continuous visibility",
    card_progress_label_left: "Brand domination",
    card_progress_label_right: "Compounding",
    card_progress_percent: 98,
    right_image_url: "/images/section-3.jpg",
    card_logo_url: null,
  },
  pricing: {
    badge_text: "Investment structure",
    heading: "Pricing",
    intro:
      "Secure your territory today. Your access remains exclusive for as long as you're active.",
    feature_lines: [
      { text: "Your access remains exclusive for as long as you're active." },
      {
        text: "If you cancel, the ZIP becomes available again.",
      },
      { text: "Onboarding begins immediately." },
      {
        text: "Your brand typically goes live within one week.",
      },
    ],
    cta_label: "Check ZIP availability",
    cta_href: "#hero-zip",
    card_label_starting: "Starting",
    card_price_display: "$199",
    card_price_period: "/mo",
    card_per_label: "Per ZIP code",
    card_footer_note:
      "Locked-in pricing for the duration of your active status.",
    left_image_url: "/images/section-4.jpg",
  },
  qa: {
    badge_text: "Information center",
    heading: "Common inquiries",
    intro:
      "Everything you need to know about territory ownership and our predictive visibility network.",
    support_label: "Email support",
    support_email: "support@fullviu.com",
    faq_items: [
      {
        question: "How early does Viu reach homeowners?",
        answer:
          "Everything you need to know about territory ownership, market timing, and our structural control model.",
        opened: true,
      },
      {
        question: "How often does my brand appear?",
        answer:
          "Your brand appears daily across the platforms that homeowners in your ZIP code visit most.",
        opened: false,
      },
      {
        question: "How many agents can use the same ZIP?",
        answer:
          "Only one agent per ZIP code. This exclusivity ensures you are the only agent building brand presence in your territory.",
        opened: false,
      },
      {
        question: "What happens if I cancel?",
        answer:
          "If you cancel, your ZIP code becomes available for another agent to claim.",
        opened: false,
      },
    ],
    support_icon_url: null,
  },
};

function mergeHero(patch: Partial<CmsHeroSection> | undefined): CmsHeroSection {
  if (!patch) return { ...defaultSections.hero };
  return {
    ...defaultSections.hero,
    ...patch,
    image_url:
      patch.image_url !== undefined && patch.image_url !== ""
        ? patch.image_url
        : defaultSections.hero.image_url,
  };
}

function mergeStrategic(
  patch: Partial<CmsStrategicWindowSection> | undefined,
): CmsStrategicWindowSection {
  const d = defaultSections.strategic_window;
  if (!patch) return { ...d };
  return {
    ...d,
    ...patch,
    features:
      patch.features && patch.features.length > 0 ? patch.features : d.features,
    visual_image_url: patch.visual_image_url ?? d.visual_image_url,
    card_icon_url: patch.card_icon_url ?? d.card_icon_url,
  };
}

function mergeTerritory(
  patch: Partial<CmsTerritoryZipSection> | undefined,
): CmsTerritoryZipSection {
  const d = defaultSections.territory_zip;
  if (!patch) return { ...d };
  return {
    ...d,
    ...patch,
    checklist_items:
      patch.checklist_items && patch.checklist_items.length > 0
        ? patch.checklist_items
        : d.checklist_items,
    feature_columns:
      patch.feature_columns && patch.feature_columns.length > 0
        ? patch.feature_columns
        : d.feature_columns,
    left_visual_image_url:
      patch.left_visual_image_url ?? d.left_visual_image_url,
    left_card_icon_url: patch.left_card_icon_url ?? d.left_card_icon_url,
    quote_icon_url: patch.quote_icon_url ?? d.quote_icon_url,
    checklist_check_icon_url:
      patch.checklist_check_icon_url ?? d.checklist_check_icon_url,
  };
}

function mergeRecognition(
  patch: Partial<CmsRecognitionSection> | undefined,
): CmsRecognitionSection {
  const d = defaultSections.recognition;
  if (!patch) return { ...d };
  return {
    ...d,
    ...patch,
    right_image_url: patch.right_image_url ?? d.right_image_url,
    card_logo_url: patch.card_logo_url ?? d.card_logo_url,
  };
}

function mergePricing(
  patch: Partial<CmsPricingSection> | undefined,
): CmsPricingSection {
  const d = defaultSections.pricing;
  if (!patch) return { ...d };
  return {
    ...d,
    ...patch,
    feature_lines:
      patch.feature_lines && patch.feature_lines.length > 0
        ? patch.feature_lines
        : d.feature_lines,
    left_image_url: patch.left_image_url ?? d.left_image_url,
  };
}

function mergeQa(patch: Partial<CmsQaSection> | undefined): CmsQaSection {
  const d = defaultSections.qa;
  if (!patch) return { ...d };
  return {
    ...d,
    ...patch,
    faq_items:
      patch.faq_items && patch.faq_items.length > 0
        ? patch.faq_items
        : d.faq_items,
    support_icon_url: patch.support_icon_url ?? d.support_icon_url,
  };
}

export function mergeCmsSections(
  remote: Partial<CmsSections> | undefined,
): CmsSections {
  const s = remote;
  return {
    hero: mergeHero(s?.hero),
    strategic_window: mergeStrategic(s?.strategic_window),
    territory_zip: mergeTerritory(s?.territory_zip),
    recognition: mergeRecognition(s?.recognition),
    pricing: mergePricing(s?.pricing),
    qa: mergeQa(s?.qa),
  };
}

export async function getHomeSections(): Promise<CmsSections> {
  const url = process.env.NEXT_PUBLIC_ZIP_API_BASE_URL?.trim() + "/cms";
  if (!url) {
    return mergeCmsSections(undefined);
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    console.log("res", res);
    if (!res.ok) {
      console.error("[cms] fetch failed", res.status);
      return mergeCmsSections(undefined);
    }
    const data = (await res.json()) as Partial<CmsResponse>;
    return mergeCmsSections(data.sections);
  } catch (e) {
    console.error("[cms]", e);
    return mergeCmsSections(undefined);
  }
}

export function heroTitleLines(title: string): string[] {
  const lower = title.toLowerCase();
  const idx = lower.indexOf(" before ");
  if (idx !== -1) {
    const a = title.slice(0, idx).trim();
    const b = title.slice(idx).trim();
    return [a, b];
  }
  return [title];
}
