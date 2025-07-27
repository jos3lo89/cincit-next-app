import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const institutionList = await prisma.user.findMany({
    select: {
      id: true,
      institution: true,
    },
  });

  const uniqueMap = new Map<string, InstitutionUser>();
  for (const user of institutionList) {
    if (user.institution && !uniqueMap.has(user.institution)) {
      uniqueMap.set(user.institution, {
        id: user.id,
        institution: user.institution,
      });
    }
  }
  const result = Array.from(uniqueMap.values());
  return NextResponse.json(result);
}