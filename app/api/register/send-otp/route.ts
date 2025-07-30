import { sendVerificationOtp } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import { NextResponse } from "next/server";
import z from "zod";

const serverRegistrationSchema = z.object({
  email: z.email(),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const result = serverRegistrationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Falta información requerida." },
        { status: 400 }
      );
    }

    const { email } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "El correo electrónico ya se encuentra registrado." },
        { status: 409 }
      );
    }

    const otpCode = randomInt(1000, 9999).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    try {
      await sendVerificationOtp(email, otpCode);
    } catch (error) {
      return NextResponse.json(
        { message: "no se pudo enviar el correo" },
        { status: 500 }
      );
    }
    await prisma.verificationToken.upsert({
      where: { email },
      update: {
        token: otpCode,
        expires: expiresAt,
      },
      create: {
        email,
        token: otpCode,
        expires: expiresAt,
      },
    });

    return NextResponse.json(
      {
        message: "Código de verificación enviado a tu correo.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error en /api/register/send-otp:", error);

    return NextResponse.json(
      { message: "Ocurrió un error en el servidor." },
      { status: 500 }
    );
  }
};
