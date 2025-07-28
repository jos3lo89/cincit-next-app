"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function abortRegistration() {
  const qki = await cookies();
  qki.delete("registration_token");
  redirect("/");
}
