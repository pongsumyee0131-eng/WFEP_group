import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { setUserRole, syncUserFromClerk } from "@/lib/auth";
import type { UserRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await syncUserFromClerk();
    const body = await req.json();
    const role = body.role as UserRole;

    if (!["FREELANCER", "CLIENT"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const user = await setUserRole(userId, role);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Role update error:", error);
    return NextResponse.json(
      { error: "Failed to update role. Ensure database is configured." },
      { status: 500 }
    );
  }
}
