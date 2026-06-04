import type {
  FreelancerProfile,
  Milestone,
  Order,
  PortfolioItem,
  ServicePackage,
  User,
} from "@prisma/client";

export type FreelancerWithProfile = User & {
  freelancerProfile:
    | (FreelancerProfile & {
        portfolioItems: PortfolioItem[];
        servicePackages: ServicePackage[];
      })
    | null;
};

export type OrderWithRelations = Order & {
  client: User;
  freelancer: User & { freelancerProfile: FreelancerProfile | null };
  milestones: Milestone[];
  servicePackage: ServicePackage | null;
};

export const CATEGORIES = [
  "Graphic Design",
  "Illustration",
  "Brand Design",
  "Web Design",
  "UI/UX Design",
  "Motion Graphics",
  "Packaging",
  "Typography",
] as const;

export const POPULAR_SKILLS = [
  "Logo Design",
  "Brand Identity",
  "Illustration",
  "Figma",
  "Adobe Illustrator",
  "Web Design",
  "Print Design",
  "Social Media",
] as const;
