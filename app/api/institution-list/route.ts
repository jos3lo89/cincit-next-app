import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const institutionList = await prisma.user.findMany({
    distinct: ["institution"],
    select: {
      id: true,
      institution: true,
    },
  });

  return NextResponse.json(institutionList);
}
