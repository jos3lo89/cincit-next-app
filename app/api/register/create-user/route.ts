import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { registerSchemaApi } from "@/schemas/register.schema";
import { JWTDecodedPayload } from "@/interfaces/jwt.interface";
import { verifyToken } from "@/lib/jwt";

export const POST = async (req: Request) => {
  try {
    const qki = await cookies();
    const tokenCookie = qki.get("registration_token");

    if (!tokenCookie) {
      return NextResponse.json(
        { message: "No autorizado: falta el token de verificación." },
        { status: 401 }
      );
    }

    const payload = await verifyToken<JWTDecodedPayload>(tokenCookie.value);

    if (!payload) {
      return NextResponse.json(
        { message: "No autorizado: error en la verificacion" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const result = registerSchemaApi.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Datos del formulario inválidos." },
        { status: 400 }
      );
    }

    const values = result.data;

    if (
      payload.purpose !== "complete-registration" ||
      payload.email !== values.email
    ) {
      return NextResponse.json(
        { message: "No autorizado: el token no es válido." },
        { status: 401 }
      );
    }

    //WARN: redundante
    /*
    const emailExists = await prisma.user.findUnique({
      where: { email: values.email },
    });

    if (emailExists) {
      return NextResponse.json(
        { message: "Este correo electrónico ya se encuentra registrado." },
        { status: 409 }
      );
    }
  */

    const dniExists = await prisma.user.findUnique({
      where: { dni: values.dni },
    });

    if (dniExists) {
      return NextResponse.json(
        { message: "Este DNI ya se encuentra registrado." },
        { status: 409 }
      );
    }

    await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name: values.name,
          lastname: values.lastname,
          dni: values.dni,
          email: values.email,
          phone: values.phone,
          institution: values.institution,
        },
      });

      const newVoucher = await tx.voucher.create({
        data: {
          url: values.voucher.url,
          urlfull: values.voucher.urlFull,
          imgId: values.voucher.id,
          userId: newUser.id,
        },
      });

      await tx.inscription.create({
        data: {
          userId: newUser.id,
          voucherId: newVoucher.id,
        },
      });
    });

    qki.delete("registration_token");

    return NextResponse.json(
      {
        message:
          "¡Registro exitoso! Tu inscripción está pendiente de revisión.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en /api/register/create-user:", error);

    if (error.message === "TokenExpiredError") {
      return NextResponse.json(
        { message: "No autorizado: el token ha expirado." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Ocurrió un error inesperado en el servidor." },
      { status: 500 }
    );
  }
};
