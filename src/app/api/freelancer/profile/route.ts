import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { syncUserFromClerk } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await syncUserFromClerk();
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();

    const profile = await prisma.freelancerProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        title: body.title ?? "Creative Professional",
        tagline: body.tagline,
        skills: body.skills ?? [],
        categories: body.categories ?? ["Graphic Design"],
      },
      update: {
        title: body.title,
        tagline: body.tagline,
        skills: body.skills,
        categories: body.categories,
      },
    });

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Profile setup:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
