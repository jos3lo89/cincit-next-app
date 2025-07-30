import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/jwt";
import { JWTPayload } from "@/interfaces/jwt.interface";

const verifyOtpSchema = z.object({
  email: z.email({ message: "El correo no es válido." }),
  code: z.string().min(4, { message: "El código es requerido." }),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const result = verifyOtpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Datos requeridos no proporcionados." },
        { status: 400 }
      );
    }

    const { email, code } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "El correo electrónico ya se encuentra registrado." },
        { status: 409 }
      );
    }

    const verificationCode = await prisma.verificationToken.findUnique({
      where: { email },
    });

    if (!verificationCode) {
      return NextResponse.json(
        { message: "No se encontró un código de verificación." },
        { status: 404 }
      );
    }

    const now = new Date();
    if (verificationCode.expires < now) {
      await prisma.verificationToken.delete({
        where: { id: verificationCode.id },
      });
      return NextResponse.json(
        { message: "El código de verificación ha expirado." },
        { status: 400 }
      );
    }

    const isCorrect = verificationCode.token === code;
    if (!isCorrect) {
      return NextResponse.json(
        { message: "El código de verificación no es correcto." },
        { status: 400 }
      );
    }

    await prisma.verificationToken.delete({
      where: { id: verificationCode.id },
    });

    const token = await generateToken<JWTPayload>({
      email,
      purpose: "complete-registration",
    });

    const qki = await cookies();

    qki.set("registration_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 900,
      path: "/",
    });

    return NextResponse.json({
      message: "Tu correo ha sido verificado.",
    });
  } catch (error) {
    console.log("Error en /api/register/verify-otp:", error);
    return NextResponse.json(
      { message: "Ocurrió un error en el servidor." },
      { status: 500 }
    );
  }
};
