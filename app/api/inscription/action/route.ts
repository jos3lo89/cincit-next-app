import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idInscription = searchParams.get("id");
    const state = searchParams.get("state");

    return NextResponse.json({ idInscription, state });
  } catch (error) {
    console.log("error: /api/inscription/action:", error);
    return NextResponse.json(
      { message: "Error interno del  servidor." },
      { status: 500 }
    );
  }
};
