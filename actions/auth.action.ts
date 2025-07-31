"use server";
import { signOut, signIn } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function handleSignOut() {
  await signOut();
  redirect("/");
}

export async function abortRegistration() {
  const qki = await cookies();
  qki.delete("registration_token");
  redirect("/");
}

export async function verifyOTPCode(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const otp = formData.get("otp") as string;

    if (!email || !otp) {
      return { success: false, message: "Falta información requerida." };
    }

    await signIn("credentials", {
      email,
      otp,
      redirect: false,
    });

    return {
      success: true,
      message: "¡Verificación exitosa! Redirigiendo...",
    };
  } catch (error: any) {
    if (error instanceof AuthError) {
      console.log("error.cause?.err?.message", error.cause?.err?.message);
      console.log("error.message", error.message);

      return {
        success: false,
        message: error.cause?.err?.message || "Error desconocido.",
      };
    }
    console.error("Errro en signin action:", error);
    return { success: false, message: "Ocurrió un error en el servidor." };
  }
}
