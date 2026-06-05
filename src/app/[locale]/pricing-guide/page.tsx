import { getTranslations, setRequestLocale } from "next-intl/server";
import { PricingGuideContent } from "@/components/pages/PricingGuideContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingGuide" });
  return { title: t("metaTitle") };
}

export default async function PricingGuidePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PricingGuideContent />;
}
