import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@prisma/client";

export async function getAuthUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { freelancerProfile: true },
  });

  return user;
}

export async function syncUserFromClerk() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email =
    clerkUser.emailAddresses[0]?.emailAddress ?? `${clerkUser.id}@craftlink.local`;

  const user = await prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    create: {
      clerkId: clerkUser.id,
      email,
      name: clerkUser.fullName ?? clerkUser.firstName ?? "User",
      avatarUrl: clerkUser.imageUrl,
    },
    update: {
      email,
      name: clerkUser.fullName ?? clerkUser.firstName ?? undefined,
      avatarUrl: clerkUser.imageUrl,
    },
    include: { freelancerProfile: true },
  });

  return user;
}

export async function setUserRole(clerkId: string, role: UserRole) {
  return prisma.user.update({
    where: { clerkId },
    data: { role },
  });
}
