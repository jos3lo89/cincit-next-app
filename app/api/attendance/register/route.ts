import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const attendanceRegisterSchema = z.object({
  userId: z.string(),
  attendanceId: z.number(),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const result = attendanceRegisterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Datos inválidos." },
        {
          status: 400,
        }
      );
    }

    const { userId, attendanceId } = result.data;

    const userExist = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userExist) {
      return NextResponse.json(
        { message: "No se encontró el usuario." },
        { status: 404 }
      );
    }

    const existingRecord = await prisma.userAttendance.findUnique({
      where: {
        userId_attendanceId: {
          userId,
          attendanceId,
        },
      },
    });

    if (existingRecord) {
      return NextResponse.json(
        { message: "Este usuario ya registró su asistencia." },
        { status: 409 }
      );
    }

    const attendance = await prisma.attendance.findFirst({
      where: {
        id: attendanceId,
      },
    });

    if (!attendance) {
      return NextResponse.json({
        message: "No se encontró la asistencia.",
        status: 404,
      });
    }

    if (attendance.attendanceState !== "visible") {
      return NextResponse.json({
        message: "La asistencia ya no esta disponible.",
        status: 403,
      });
    }

    const userAttendance = await prisma.userAttendance.create({
      data: {
        userId: result.data.userId,
        attendanceId: result.data.attendanceId,
      },
    });

    return NextResponse.json(userAttendance, { status: 201 });
  } catch (error) {
    console.log("error: /api/attendance/register", error);
    return NextResponse.json(
      { message: "Error interno del  servidor." },
      { status: 500 }
    );
  }
};
