import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    console.log("id: ", id);

    // query
    const searchParams = req.nextUrl.searchParams;
    const idInscription = searchParams.get("id");
    const state = searchParams.get("state");

    return NextResponse.json({ message: "id: " + id });
  } catch (error) {
    console.log("error: /api/inscription/[id]/approved:", error);
  }
};
