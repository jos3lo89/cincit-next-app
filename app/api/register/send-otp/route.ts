import { sendVerificationOtp } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

const serverRegistrationSchema = z.object({
  email: z.email(),
});

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const values = serverRegistrationSchema.safeParse(body);

    if (!values.success) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const { email } = values.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "El correo electrónico ya se encuentra registrado." },
        { status: 409 }
      );
    }

    const otpCode = Math.floor(
      Math.random() * (9999 - 1000 + 1) + 1000
    ).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const verificationCode = await prisma.emailVerificationCode.upsert({
      where: { email },
      update: {
        code: otpCode,
        expiresAt,
      },
      create: {
        email,
        code: otpCode,
        expiresAt,
      },
    });

    try {
      await sendVerificationOtp(email, otpCode);
    } catch (emailError) {
      console.error("Error al enviar el correo de verificación:", emailError);

      await prisma.emailVerificationCode.delete({
        where: { id: verificationCode.id },
      });

      return NextResponse.json(
        {
          message:
            "No se pudo enviar el correo de verificación. Inténtalo de nuevo.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Código de verificación enviado a tu correo.",
    });
  } catch (error) {
    console.log("Error en /api/register/send-otp:", error);
    return NextResponse.json(
      { message: "Ocurrió un error en el servidor." },
      { status: 500 }
    );
  }
};
