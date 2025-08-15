import {
  PrismaClient,
  Role,
  CincitEdition,
  AttendanceType,
  AttendanceState,
  InscriptionState,
} from "@prisma/client";

const prisma = new PrismaClient();

function getAttendanceDates(): Date[] {
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

  console.log("✍️  Creando inscripciones para usuarios esenciales...");

  await prisma.inscription.deleteMany({
    where: { userId: { in: [adminUser.id, inscriberUser.id] } },
  });
  await prisma.voucher.deleteMany({
    where: { userId: { in: [adminUser.id, inscriberUser.id] } },
  });

  const adminVoucher = await prisma.voucher.create({
    data: {
      userId: adminUser.id,
      urlfull:
        "https://i.pinimg.com/736x/3d/be/40/3dbe40e21f2ab6c4514c24d9e8a04d45.jpg",
    },
  });
  await prisma.inscription.create({
    data: {
      userId: adminUser.id,
      voucherId: adminVoucher.id,
      state: InscriptionState.approved,
    },
  });

  const inscriberVoucher = await prisma.voucher.create({
    data: {
      userId: inscriberUser.id,
      urlfull:
        "https://i.pinimg.com/736x/5d/d3/07/5dd307b9ea068cf7b5346344ed9fa84a.jpg",
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

  console.log("🧹 Limpiando registros de asistencia previos...");
  await prisma.attendance.deleteMany({});
  console.log("🗑️ Registros de asistencia eliminados.");

  const [monday, tuesday, wednesday] = getAttendanceDates();

  await prisma.attendance.createMany({
    data: [
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
