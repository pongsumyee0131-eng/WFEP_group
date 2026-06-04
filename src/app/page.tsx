import { HeroSection } from "@/components/landing/HeroSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { DualAudienceSection } from "@/components/landing/DualAudienceSection";
import { FeaturedFreelancers } from "@/components/landing/FeaturedFreelancers";

export default function HomePage() {
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
