import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/landing/HeroSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { DualAudienceSection } from "@/components/landing/DualAudienceSection";
import { FeaturedFreelancers } from "@/components/landing/FeaturedFreelancers";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <FeaturedFreelancers />
      <CategoriesSection />
      <DualAudienceSection />
      <TrustSection />
    </>
  );
}
