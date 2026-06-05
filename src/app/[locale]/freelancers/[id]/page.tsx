import { notFound } from "next/navigation";
import { getMockFreelancer } from "@/lib/mock-data";
import { FreelancerProfileView } from "@/components/freelancer/FreelancerProfileView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FreelancerPage({ params }: PageProps) {
  const { id } = await params;

  let freelancer: ReturnType<typeof getMockFreelancer> = getMockFreelancer(id);

  if (!freelancer && process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          freelancerProfile: {
            include: { portfolioItems: true, servicePackages: true },
          },
        },
      });
      if (user?.freelancerProfile) {
        freelancer = user as NonNullable<typeof freelancer>;
      }
    } catch {
      // DB unavailable
    }
  }

  if (!freelancer?.freelancerProfile) notFound();

  return <FreelancerProfileView freelancer={freelancer} />;
}
