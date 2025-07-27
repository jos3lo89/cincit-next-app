// "use server";

// import { sendOtpCode } from "@/lib/nodemailer";
// import prisma from "@/lib/prisma";
// import { z } from "zod";

// const EmailSchema = z.email({
//   message: "Por favor, ingresa un correo válido.",
// });

// export async function checkEmailStatus(prevState: any, formData: FormData) {
//   const email = formData.get("email") as string;

//   console.log("Verificando correo:", email);

//   const validatedEmail = EmailSchema.safeParse(email);

//   if (!validatedEmail.success) {
//     return { error: "correo no válido" };
//   }

//   try {
//     const userFound = await prisma.user.findUnique({
//       where: {
//         email: validatedEmail.data,
//       },
//     });

//     if (!userFound) {
//       return { error: "El correo electrónico no se encuentra registrado." };
//     }

//     const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

//     await prisma.otp.upsert({
//       where: {
//         userId: userFound.id,
//       },
//       update: {
//         otpCode: otpCode,
//         expiresAt: expiresAt,
//         isUsed: false,
//       },
//       create: {
//         userId: userFound.id,
//         otpCode: otpCode,
//         expiresAt: expiresAt,
//       },
//     });

//     await sendOtpCode(email, otpCode);

//     return {
//       success: "¡Excelente! Se ha enviado un código de ingreso a tu correo.",
//     };
//   } catch (dbError) {
//     console.error("Error de base de datos:", dbError);
//     return {
//       error: "Ocurrió un error al verificar tu estado. Inténtalo de nuevo.",
//     };
//   }
// }
