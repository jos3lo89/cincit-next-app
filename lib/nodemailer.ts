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
