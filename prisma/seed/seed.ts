import {
  PrismaClient,
  Role,
  CincitEdition,
  AttendanceType,
  AttendanceState,
  InscriptionState,
} from "@prisma/client";

import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

function getAttendanceDates(): Date[] {
  const simpleEventDates = [
    "2025-08-16 08:00", // Lunes del evento a las 8:00 AM
    "2025-08-17 08:00", // Martes del evento a las 8:00 AM
    "2025-08-18 08:00", // Miércoles del evento a las 8:00 AM
  ];

  return simpleEventDates.map((dateStr) => {
    const isoDateStr = `${dateStr.replace(" ", "T")}:00-05:00`;
    return new Date(isoDateStr);
  });
}

async function userRegister() {
  const adminUser = await prisma.user.upsert({
    where: { email: "ganbaru743@gmail.com" },
    update: {},
    create: {
      dni: faker.string.numeric(8),
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: "ganbaru743@gmail.com",
      phone: faker.string.numeric(9),
      institution: "UNAJMA",
      role: Role.ADMINISTRATOR,
    },
  });

  const inscriberUser = await prisma.user.upsert({
    where: { email: "evilain999@gmail.com" },
    update: {},
    create: {
      dni: faker.string.numeric(8),
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: "evilain999@gmail.com",
      phone: faker.string.numeric(9),
      institution: "UNAJMA",
      role: Role.INSCRIBER,
    },
  });

  await prisma.inscription.deleteMany({
    where: { userId: { in: [adminUser.id, inscriberUser.id] } },
  });

  await prisma.voucher.deleteMany({
    where: { userId: { in: [adminUser.id, inscriberUser.id] } },
  });

  const adminVoucher = await prisma.voucher.create({
    data: {
      userId: adminUser.id,
      urlfull: "/robot.webp",
    },
  });

  await prisma.inscription.create({
    data: {
      userId: adminUser.id,
      voucherId: adminVoucher.id,
      state: InscriptionState.pending,
    },
  });

  const inscriberVoucher = await prisma.voucher.create({
    data: {
      userId: inscriberUser.id,
      urlfull: "/robot.webp",
    },
  });

  await prisma.inscription.create({
    data: {
      userId: inscriberUser.id,
      voucherId: inscriberVoucher.id,
      state: InscriptionState.pending,
    },
  });

  await prisma.attendance.deleteMany({});
}

async function attendanceCreate() {
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
        attendanceState: AttendanceState.hidden,
      },
      {
        date: tuesday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.entrance,
        attendanceState: AttendanceState.hidden,
      },
      {
        date: tuesday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.exit,
        attendanceState: AttendanceState.hidden,
      },
      {
        date: wednesday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.entrance,
        attendanceState: AttendanceState.hidden,
      },
      {
        date: wednesday,
        cincitEdition: CincitEdition.E2025,
        attendanceType: AttendanceType.exit,
        attendanceState: AttendanceState.hidden,
      },
    ],
  });
}

async function main() {
  console.log("¡Seeding inicializado con éxito!");
  await userRegister();
  await attendanceCreate();
  console.log("¡Seeding finalizado con éxito!");
}

main()
  .catch((e) => {
    console.error("Ocurrió un error durante el seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
