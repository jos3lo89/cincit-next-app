"use server";

import { generateToken } from "@/lib/jwt";
import { sendVerificationOtp } from "@/lib/nodemailer";
import prisma from "@/lib/prisma";
import { randomInt } from "crypto";
import { cookies } from "next/headers";

interface JWTPayloadStatus {
  email: string;
  purpose: string;
}

export interface JWTDecodedPayloadStatus extends JWTPayloadStatus {
  exp: number;
  iat: number;
}

export const getCodeState = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return { error: "usuario no existe" };
  }

  const otpCode = randomInt(1000, 9999).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  try {
    await sendVerificationOtp(email, otpCode);
  } catch (error) {
    return { error: "no se pudo enviar el correo" };
  }

  try {
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
    return { success: true };
  } catch (error) {
    return { error: "no se pudo guardar el token" };
  }
};

export const verifyOtp = async (email: string, code: string) => {
  try {
    // const existingUser = await prisma.user.findUnique({
    //   where: { email },
    // });

    // if (existingUser) {
    //   return { error: "El correo electrónico ya se encuentra registrado." };
    // }
    const verificationCode = await prisma.verificationToken.findUnique({
      where: { email },
    });

    if (!verificationCode) {
      return { error: "No se encontró un código de verificación." };
    }

    const now = new Date();
    if (verificationCode.expires < now) {
      await prisma.verificationToken.delete({
        where: { id: verificationCode.id },
      });
      return { error: "El código de verificación ha expirado." };
    }

    const isCorrect = verificationCode.token === code;
    if (!isCorrect) {
      return { error: "El código de verificación no es correcto." };
    }

    await prisma.verificationToken.delete({
      where: { id: verificationCode.id },
    });

    const token = await generateToken<JWTPayloadStatus>({
      email,
      purpose: "verify_inscription",
    });

    const qki = await cookies();

    qki.set("verify_inscription", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 900,
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return { error: "Ocurrió un error en el servidor." };
  }
};
