"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpCode = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: '"CINCIT 2025" <noreply@cincit.com>',
    to: email,
    subject: "Bienvenido a CINCIT - Tu código de acceso",
    html: `<b>Tu código para iniciar sesión es: ${otp}</b>`,
  });
};

export const sendVerificationOtp = async (to: string, otp: string) => {
  const mailOptions = {
    from: `"Registro CINCIT" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Tu código de verificación de CINCIT",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
        <h2>Verificación de Correo Electrónico</h2>
        <p>Gracias por registrarte en CINCIT 2025.</p>
        <p>Usa el siguiente código para completar tu registro. El código es válido por 10 minutos.</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; background-color: #f0f0f0; padding: 10px 20px; border-radius: 5px; display: inline-block;">
          ${otp}
        </p>
        <p style="font-size: 12px; color: #777;">Si no solicitaste este código, puedes ignorar este correo.</p>
      </div>
    `,
    text: `Tu código de verificación es: ${otp}`,
  };

  // **Manejo de errores en el envío**
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo de verificación enviado a: ${to}`);
  } catch (error) {
    console.error(`Fallo al enviar correo a ${to}:`, error);
    // Lanzamos el error para que la función que llama (la ruta API) sepa que algo salió mal.
    throw new Error("No se pudo enviar el correo electrónico.");
  }
};
