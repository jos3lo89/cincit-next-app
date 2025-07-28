"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { uploadToCloudinary } from "@/lib/cloudinary";

const serverRegistrationSchema = z.object({
  name: z.string().min(2),
  lastname: z.string().min(2),
  dni: z.string().length(8),
  email: z.email(),
  phone: z.string().length(9),
  institution: z.string().min(3),
  file: z.instanceof(File),
});

export async function registerUserAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validation = serverRegistrationSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, message: "Los datos enviados no son válidos." };
  }

  const {
    name,
    lastname,
    dni,
    email,
    phone,
    institution,
    file: voucherFile,
  } = validation.data;

  try {
    const userExists = await prisma.user.findFirst({
      where: { OR: [{ email }, { dni }] },
    });

    if (userExists) {
      return {
        success: false,
        message: "El correo electrónico o DNI ya se encuentra registrado.",
      };
    }

    // ----------------- cloudinary start
    const buffer = Buffer.from(await voucherFile.arrayBuffer());
    const cloudinaryResponse = await uploadToCloudinary(buffer, "vouchers");
    // ----------------- cloudinary end

    // ----------------- lolcal en vps
    // const buffer = Buffer.from(await voucherFile.arrayBuffer());
    // const uploadDir = path.join(process.cwd(), "public/uploads");
    // const randomNum = Math.floor(100 + Math.random() * 900);
    // const uniqueFilename = `${Date.now()}-${randomNum}${path.extname(
    //   voucherFile.name
    // )}`;
    // const filePath = path.join(uploadDir, uniqueFilename);

    // await fs.mkdir(uploadDir, { recursive: true });
    // await fs.writeFile(filePath, buffer);
    // -----------------

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newUser = await tx.user.create({
        data: { name, lastname, dni, email, phone, institution },
      });

      const newVoucher = await tx.voucher.create({
        data: {
          // path: `/uploads/${uniqueFilename}`,
          path: cloudinaryResponse.secure_url,
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

    return {
      success: true,
      message: "¡Registro exitoso! Tu inscripción está pendiente de revisión.",
    };
  } catch (error) {
    console.error("Error en registerUserAction:", error);
    return {
      success: false,
      message: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
    };
  }
}
