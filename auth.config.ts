import type { NextAuthConfig } from "next-auth";
import z from "zod";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";

const credentialsSchema = z.object({
  email: z.email(),
  otp: z.string(),
});

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Correo", type: "email" },
        otp: { label: "Código de verificación", type: "text" },
      },
      authorize: async (credentials) => {
        const result = credentialsSchema.safeParse(credentials);

        if (!result.success) {
          throw new Error("Falta información requerida.");
        }

        const { email, otp } = result.data;

        const dbToken = await prisma.verificationToken.findUnique({
          where: { email },
        });

        if (!dbToken) {
          throw new Error(
            "No has solicitado un código o el usuario no existe."
          );
        }

        if (new Date(dbToken.expires) < new Date()) {
          await prisma.verificationToken.delete({ where: { email } });
          throw new Error(
            "Tu código de verificación ha expirado. Solicita uno nuevo."
          );
        }

        if (dbToken.token !== otp) {
          throw new Error("El código de verificación es incorrecto.");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error(
            "El usuario asociado a este correo no fue encontrado."
          );
        }

        await prisma.verificationToken.delete({
          where: { email },
        });

        return {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.lastname = user.lastname;
      }
      return token;
    },
    session({ session, user, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.name = token.name as string;
        session.user.lastname = token.lastname as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;
