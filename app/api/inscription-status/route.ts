import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // implementar la consula en base al id del usuario
    // por la cookie extraer el id del usuario
    const inscription = await prisma.inscription.findUnique({
      where: { id: 1 },
    });

    return NextResponse.json(inscription);
  } catch (error) {
    console.log("Error en /api/inscription-status:", error);
    return NextResponse.json(
      { message: "Ocurrió un error en el servidor." },
      { status: 500 }
    );
  }
};
