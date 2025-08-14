import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { registerSchemaApi } from "@/schemas/register.schema";
import { JWTDecodedPayload } from "@/interfaces/jwt.interface";
import { verifyToken } from "@/lib/jwt";
import path from "node:path";
import { randomInt } from "node:crypto";
import fs from "node:fs/promises";

export const POST = async (req: Request) => {
  try {
    const qki = await cookies();
    const tokenCookie = qki.get("registration_token");
    const formData = await req.formData();

    const file = formData.get("file");

    // if (!file || !(file instanceof File) || file.size === 0) {
    //   return NextResponse.json(
    //     { message: "El voucher es requerido." },
    //     { status: 400 }
    //   );
    // }

    // ----- INICIO DE LA CORRECCIÓN -----

    // 1. Guarda de Tipo (Type Guard)
    // Verificamos si 'file' es un string o si no existe. En ambos casos, es inválido.
    if (!file || typeof file === "string") {
      return NextResponse.json(
        { message: "El voucher es un campo requerido." },
        { status: 400 }
      );
    }

    // 2. Validaciones de tamaño
    // Después de la guarda, TypeScript ya sabe que 'file' es un objeto tipo File.
    // Ahora podemos acceder a 'file.size' de forma segura.
    if (file.size === 0) {
      return NextResponse.json(
        { message: "El archivo del voucher no puede estar vacío." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      return NextResponse.json(
        { message: "El archivo no debe superar los 5MB." },
        { status: 400 }
      );
    }

    // ----- FIN DE LA CORRECCIÓN -----

    const data = Object.fromEntries(formData.entries());

    const result = registerSchemaApi.safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        { message: "Datos del formulario inválidos." },
        { status: 400 }
      );
    }

    const values = result.data;

    // if (!tokenCookie) {
    //   return NextResponse.json(
    //     { message: "No autorizado: falta el token de verificación." },
    //     { status: 401 }
    //   );
    // }

    // const payload = await verifyToken<JWTDecodedPayload>(tokenCookie.value);

    // if (!payload) {
    //   return NextResponse.json(
    //     { message: "No autorizado: falta el token de verificación." },
    //     { status: 401 }
    //   );
    // }

    // if (
    //   payload.purpose !== "complete-registration" ||
    //   payload.email !== values.email
    // ) {
    //   return NextResponse.json(
    //     { message: "No autorizado: el token no es válido." },
    //     { status: 401 }
    //   );
    // }

    const emailExists = await prisma.user.findUnique({
      where: { email: values.email },
    });

    if (emailExists) {
      return NextResponse.json(
        { message: "Este correo electrónico ya se encuentra registrado." },
        { status: 409 }
      );
    }

    const dniExists = await prisma.user.findUnique({
      where: { dni: values.dni },
    });

    if (dniExists) {
      return NextResponse.json(
        { message: "Este DNI ya se encuentra registrado." },
        { status: 409 }
      );
    }

    // const buffer = Buffer.from(await values.file.arrayBuffer());
    // const buffer = Buffer.from(await file.arrayBuffer());
    // const uploadFile = await uploadToCloudinary(buffer, "vouchers");

    // ----------------- lolcal en vps
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadDir = path.join(process.cwd(), "public/uploads");

    const randomNum = randomInt(1000, 9999).toString();

    const uniqueFilename = `${Date.now()}-${randomNum}${path.extname(
      file.name
    )}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);
    // -----------------

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
          path: `/uploads/${uniqueFilename}`,
          amount: 0,
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

    if (error.message === "CloudinaryUploadError") {
      return NextResponse.json(
        { message: "No se pudo subir el voucher." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Ocurrió un error inesperado en el servidor." },
      { status: 500 }
    );
  }
};
