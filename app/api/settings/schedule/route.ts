import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const settingsSchema = z.object({
  key: z.string(),
  value: z.string(),
});

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const result = settingsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const { key, value } = result.data;

    const updateSettings = await prisma.settings.upsert({
      where: {
        key,
      },
      update: {
        value,
      },
      create: {
        key,
        value,
      },
    });

    return NextResponse.json(updateSettings);
  } catch (error) {
    console.log("error: /api/settings/schedule", error);
    return NextResponse.json(
      { message: "Error interno del  servidor." },
      { status: 500 },
    );
  }
};

export const GET = async (_: NextRequest) => {
  try {
    const value = await prisma.settings.findUnique({
      where: {
        key: "showSpeakersPage",
      },
    });

    return NextResponse.json(value);
  } catch (error) {
    console.log("error: /api/settings/schedule", error);
    return NextResponse.json(
      { message: "Error interno del  servidor." },
      { status: 500 },
    );
  }
};
