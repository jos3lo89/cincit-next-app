import {
  PrismaClient,
  Role,
  CincitEdition,
  AttendanceType,
  AttendanceState,
  InscriptionState, // <-- 1. Importa el enum necesario
} from "@prisma/client";

const prisma = new PrismaClient();

function getAttendanceDates(): Date[] {
  // Hoy es 1 de agosto de 2025
  const today = new Date("2025-08-01T12:00:00Z");
  const twoWeeksFromNow = new Date(today);
  twoWeeksFromNow.setDate(today.getDate() + 14);

  const dayOfWeek = twoWeeksFromNow.getDay();
  const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
  const monday = new Date(twoWeeksFromNow);
  monday.setDate(monday.getDate() + daysUntilMonday);
  monday.setHours(8, 0, 0, 0);

  const tuesday = new Date(monday);
  tuesday.setDate(monday.getDate() + 1);

  const wednesday = new Date(monday);
  wednesday.setDate(monday.getDate() + 2);

  return [monday, tuesday, wednesday];
}

async function main() {
  console.log("🚀 Iniciando el proceso de seeding...");

  // --- 1. Seed de Usuarios Esenciales ---

  const adminUser = await prisma.user.upsert({
    where: { email: "ganbaru743@gmail.com" },
    update: {},
    create: {
      dni: "11111111",
      name: "Admin",
      lastname: "CINCIT",
      email: "ganbaru743@gmail.com",
      phone: "987654321",
      institution: "UNAJMA",
      role: Role.ADMINISTRATOR,
    },
  });

  const inscriberUser = await prisma.user.upsert({
    where: { email: "evilain999@gmail.com" },
    update: {},
    create: {
      dni: "22222222",
      name: "Inscriptor",
      lastname: "CINCIT",
      email: "evilain999@gmail.com",
      phone: "987654322",
      institution: "UNAJMA",
      role: Role.INSCRIBER,
    },
  });

  console.log("✅ Usuarios esenciales (admin e inscriptor) creados con éxito.");

  // --- 2. Seed de Inscripciones para Usuarios Esenciales (NUEVA SECCIÓN) ---
  console.log("✍️  Creando inscripciones para usuarios esenciales...");

  // Para asegurar que el script se pueda ejecutar múltiples veces,
  // eliminamos las inscripciones y vouchers previos de estos usuarios.
  await prisma.inscription.deleteMany({
    where: { userId: { in: [adminUser.id, inscriberUser.id] } },
  });
  await prisma.voucher.deleteMany({
    where: { userId: { in: [adminUser.id, inscriberUser.id] } },
  });

  // Crear Voucher e Inscripción para el Admin
  const adminVoucher = await prisma.voucher.create({
    data: {
      userId: adminUser.id,
      amount: 0, // Monto simbólico para el seed
      path: "/seed/admin_voucher.png",
    },
  });
  await prisma.inscription.create({
    data: {
      userId: adminUser.id,
      voucherId: adminVoucher.id,
      state: InscriptionState.approved, // Inscribirlos como 'aprobados'
    },
  });

  // Crear Voucher e Inscripción para el Inscriptor
  const inscriberVoucher = await prisma.voucher.create({
    data: {
      userId: inscriberUser.id,
      amount: 0,
      path: "/seed/inscriber_voucher.png",
    },
  });
  await prisma.inscription.create({
    data: {
      userId: inscriberUser.id,
      voucherId: inscriberVoucher.id,
      state: InscriptionState.approved,
    },
  });

  console.log("✅ Inscripciones para admin e inscriptor creadas con éxito.");

  // --- 3. Seed de Asistencias ---
  console.log("🧹 Limpiando registros de asistencia previos...");
  await prisma.attendance.deleteMany({});
  console.log("🗑️ Registros de asistencia eliminados.");

  const [monday, tuesday, wednesday] = getAttendanceDates();

  await prisma.attendance.createMany({
    data: [
      // Día 1: Lunes
      {
        date: monday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.entrance,
        attendanceState: AttendanceState.visible,
      },
      {
        date: monday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.exit,
        attendanceState: AttendanceState.visible,
      },
      // Día 2: Martes
      {
        date: tuesday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.entrance,
        attendanceState: AttendanceState.visible,
      },
      {
        date: tuesday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.exit,
        attendanceState: AttendanceState.visible,
      },
      // Día 3: Miércoles
      {
        date: wednesday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.entrance,
        attendanceState: AttendanceState.visible,
      },
      {
        date: wednesday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.exit,
        attendanceState: AttendanceState.visible,
      },
    ],
  });

  console.log(
    `✅ Franjas de asistencia creadas para 3 días (entrada y salida) a partir del ${monday.toLocaleDateString()}.`
  );

  console.log("🎉 ¡Seeding finalizado con éxito!");
}

main()
  .catch((e) => {
    console.error("❌ Ocurrió un error durante el seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
