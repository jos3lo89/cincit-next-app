import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ dni: string }> }
) => {
  try {
    const { dni } = await params;

    if (!dni) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        dni,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error en /api/user/change-role/:id", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
