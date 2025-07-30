import { sendOtpCode } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { randomInt } from "crypto";

const requestOtpSchema = z.object({
  email: z.email(),
});

const OTP_RESEND_DELAY_SECONDS = 60;

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const result = requestOtpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "El formato del email no es válido." },
        { status: 400 }
      );
    }

    const { email } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "No existe un usuario registrado con ese correo." },
        { status: 404 }
      );
    }
    const existingToken = await prisma.verificationToken.findUnique({
      where: { email },
    });

    if (existingToken) {
      const timeSinceLastRequest =
        new Date().getTime() - existingToken.expires.getTime() + 10 * 60 * 1000;
      const timeRemaining =
        OTP_RESEND_DELAY_SECONDS * 1000 - timeSinceLastRequest;

      if (timeRemaining > 0) {
        return NextResponse.json(
          {
            message: `Por favor, espera ${Math.ceil(
              timeRemaining / 1000
            )} segundos antes de solicitar otro código.`,
          },
          { status: 429 }
        );
      }
    }

    const otpCode = randomInt(100000, 999999).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    try {
      await sendOtpCode(email, otpCode);
    } catch (error) {
      console.log("Error al enviar el código de verificación:", error);
      return NextResponse.json(
        { message: "no se pudo enviar el correo" },
        { status: 500 }
      );
    }

    await prisma.verificationToken.upsert({
      where: { email },
      update: {
        token: otpCode,
        expires,
      },
      create: {
        email,
        token: otpCode,
        expires,
      },
    });

    return NextResponse.json({
      message: "Código de verificación enviado a tu correo.",
    });
  } catch (error: any) {
    console.log("Error en /api/request-opt:", error);

    return NextResponse.json(
      { message: "Ocurrió un error en el servidor." },
      { status: 500 }
    );
  }
};
