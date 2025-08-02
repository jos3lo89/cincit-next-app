import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    console.log("id: ", id);

    return NextResponse.json({ message: "id: " + id });
  } catch (error) {
    console.log("error: /api/inscription/[id]/approved:", error);
  }
};
