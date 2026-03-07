import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { BenefitsGrid } from "@/components/sections/benefits-grid";
import { BenefitsExpandable } from "@/components/sections/benefits-expandable";
import { ScienceTabs } from "@/components/sections/science-tabs";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { BrandMarquee } from "@/components/sections/brand-marquee";
import { VideoTestimonials } from "@/components/sections/video-testimonials";
import { IdealForYou } from "@/components/sections/ideal-for-you";
import { Journey } from "@/components/sections/journey";
import { CtaStatement } from "@/components/sections/cta-statement";
import { InstagramGrid } from "@/components/sections/instagram-grid";
import { FAQ } from "@/components/sections/faq";
import {
  getFAQPageSchema,
  getLocalBusinessSchema,
  getMedicalOrganizationSchema,
} from "@/lib/schemas";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQPageSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getLocalBusinessSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getMedicalOrganizationSchema()),
        }}
      />

      {/* Sections — AG1 flow order */}
      <Hero />
      <TrustBar />
      <BenefitsGrid />
      <BenefitsExpandable />
      <ScienceTabs />
      <ComparisonTable />
      <BrandMarquee />
      <VideoTestimonials />
      <IdealForYou />
      <Journey />
      <CtaStatement />
      <InstagramGrid />
      <FAQ />
    </>
  );
}
