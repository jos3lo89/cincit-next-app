import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const credentialsSchema = z.object({
  email: z.email(),
  otp: z.string(),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const result = credentialsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Falta información requerida." },
        { status: 400 }
      );
    }

    const { email, otp } = result.data;

    const dbToken = await prisma.verificationToken.findUnique({
      where: { email },
    });

    if (!dbToken) {
      return NextResponse.json(
        { message: "No se encontró una solicitud de código para este email." },
        { status: 404 }
      );
    }

    if (new Date(dbToken.expires) < new Date()) {
      return NextResponse.json(
        { message: "El código de verificación ha expirado." },
        { status: 400 }
      );
    }

    if (dbToken.token !== otp) {
      return NextResponse.json(
        { message: "El código de verificación no es válido." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    await prisma.verificationToken.delete({
      where: { email },
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("error: /**/signin/route.ts", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
};
