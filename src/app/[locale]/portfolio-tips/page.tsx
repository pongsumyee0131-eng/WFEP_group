import { getTranslations, setRequestLocale } from "next-intl/server";
import { PortfolioTipsContent } from "@/components/pages/PortfolioTipsContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolioTips" });
  return { title: t("metaTitle") };
}

export default async function PortfolioTipsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PortfolioTipsContent />;
}
