// app/api/reports/route.ts
import { NextResponse } from "next/server";
import { PrismaClient, CincitEdition } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const currentEdition = CincitEdition.E2025; // Puedes hacer esto dinámico si lo necesitas

    // 1. Obtener todas las "ranuras" de asistencia posibles para el evento actual
    const possibleAttendances = await prisma.attendance.findMany({
      where: {
        cincitEdition: currentEdition,
        attendanceState: "visible", // Solo contamos las asistencias visibles/activas
      },
      orderBy: {
        date: "asc",
      },
    });

    const totalPossibleAttendances = possibleAttendances.length;

    // 2. Obtener todos los usuarios con inscripción aprobada para el evento actual
    const usersWithApprovedInscription = await prisma.user.findMany({
      where: {
        inscriptions: {
          some: {
            state: "approved",
            cincitEdition: currentEdition,
          },
        },
      },
      include: {
        // Incluimos sus asistencias para procesarlas
        userAttendances: {
          include: {
            attendance: true, // Incluimos el detalle de la asistencia
          },
        },
      },
    });

    // 3. Procesar los datos para cada usuario
    const reportData = usersWithApprovedInscription.map((user) => {
      const userAttendanceIds = new Set(
        user.userAttendances.map((ua) => ua.attendanceId)
      );

      const totalAttendances = user.userAttendances.filter(
        (ua) =>
          ua.attendance.cincitEdition === currentEdition &&
          ua.attendance.attendanceState === "visible"
      ).length;

      const totalAbsences = totalPossibleAttendances - totalAttendances;

      // Crear un detalle de asistencia para cada ranura posible
      const attendanceDetails: { [key: number]: boolean } = {};
      possibleAttendances.forEach((slot) => {
        attendanceDetails[slot.id] = userAttendanceIds.has(slot.id);
      });

      return {
        id: user.id,
        dni: user.dni,
        fullName: `${user.name} ${user.lastname}`,
        email: user.email,
        institution: user.institution,
        totalAttendances,
        totalAbsences,
        attendanceDetails, // ej: { 1: true, 2: false, 3: true, ... }
      };
    });

    // 4. Devolver la respuesta
    return NextResponse.json({
      reportData,
      eventDetails: {
        totalPossibleAttendances,
        attendanceSlots: possibleAttendances, // Enviamos las ranuras para construir las columnas en el front
      },
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
