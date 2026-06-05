import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrustSafetyContent } from "@/components/pages/TrustSafetyContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trustSafety" });
  return { title: t("metaTitle") };
}

export default async function TrustSafetyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TrustSafetyContent />;
}
