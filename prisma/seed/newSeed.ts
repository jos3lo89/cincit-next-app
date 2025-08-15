import {
  PrismaClient,
  Role,
  InscriptionState,
  CincitEdition,
  AttendanceType,
  AttendanceState,
  Prisma,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

// Inicializar el cliente de Prisma
const prisma = new PrismaClient();

// Definir el tipo explícito para el usuario con sus inscripciones
type UserWithInscriptions = Prisma.UserGetPayload<{
  include: {
    inscriptions: true;
  };
}>;

async function main() {
  console.log("🌱 Comenzando el proceso de siembra...");

  // 1. Limpiar la base de datos para evitar duplicados
  console.log("🧹 Limpiando datos antiguos...");
  // await prisma.userAttendance.deleteMany();
  // await prisma.inscription.deleteMany();
  // await prisma.voucher.deleteMany();
  // await prisma.attendance.deleteMany();
  // await prisma.user.deleteMany();
  console.log("✅ Base de datos limpia.");

  // 2. Crear usuarios, vouchers e inscripciones
  console.log("👤 Creando 20 usuarios con sus vouchers e inscripciones...");
  const users: UserWithInscriptions[] = [];
  const inscriptionStates = [
    InscriptionState.approved,
    InscriptionState.rejected,
    InscriptionState.pending,
  ];

  for (let i = 0; i < 20; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    // --- CORRECCIÓN: Crear en secuencia para asegurar las relaciones ---

    // Paso A: Crear el Usuario primero
    const user = await prisma.user.create({
      data: {
        dni: faker.string.numeric(8),
        name: firstName,
        lastname: lastName,
        email: faker.internet
          .email({ firstName, lastName, provider: "example.com" })
          .toLowerCase(),
        phone: faker.string.numeric(9),
        institution: faker.company.name(),
        role: Role.PARTICIPANT,
      },
    });

    // Paso B: Crear el Voucher, conectándolo al usuario recién creado
    const voucher = await prisma.voucher.create({
      data: {
        userId: user.id, // Conexión explícita
        url: `/uploads/${faker.string.uuid()}.jpg`,
        urlfull: `https://example.com/uploads/${faker.string.uuid()}.jpg`,
        imgId: `${faker.string.uuid()}.jpg`,
      },
    });

    // Paso C: Crear la Inscripción, conectándola al usuario y al voucher
    const inscription = await prisma.inscription.create({
      data: {
        userId: user.id, // Conexión explícita
        voucherId: voucher.id, // Conexión explícita
        state:
          inscriptionStates[
            Math.floor(Math.random() * inscriptionStates.length)
          ],
        cincitEdition: CincitEdition.E2025,
      },
    });

    // Guardamos el usuario junto con su inscripción para usarlo después
    users.push({ ...user, inscriptions: [inscription] });
  }
  console.log("✅ 20 usuarios creados exitosamente.");

  // 3. Crear registros de Asistencia para el evento
  console.log("🗓️ Creando registros de asistencia para el evento...");
  const attendanceDay1Entry = await prisma.attendance.create({
    data: {
      date: new Date("2025-08-17T09:00:00Z"),
      cincitEdition: CincitEdition.E2025,
      attendanceType: AttendanceType.entrance,
      attendanceState: AttendanceState.visible,
    },
  });

  const attendanceDay1Exit = await prisma.attendance.create({
    data: {
      date: new Date("2025-08-17T18:00:00Z"),
      cincitEdition: CincitEdition.E2025,
      attendanceType: AttendanceType.exit,
      attendanceState: AttendanceState.visible,
    },
  });
  console.log("✅ Registros de asistencia creados.");

  // 4. Registrar la asistencia SÓLO para usuarios con inscripción aprobada
  console.log("🙋‍♂️ Registrando asistencia para usuarios aprobados...");
  const approvedUsers = users.filter((user) =>
    user.inscriptions.some((insc) => insc.state === InscriptionState.approved)
  );

  for (const user of approvedUsers) {
    // Registrar entrada para el día 1
    await prisma.userAttendance.create({
      data: {
        userId: user.id,
        attendanceId: attendanceDay1Entry.id,
        date: faker.date.between({
          from: "2025-08-17T09:00:00Z",
          to: "2025-08-17T10:00:00Z",
        }),
      },
    });

    // 50% de probabilidad de que también registren su salida
    if (Math.random() > 0.5) {
      await prisma.userAttendance.create({
        data: {
          userId: user.id,
          attendanceId: attendanceDay1Exit.id,
          date: faker.date.between({
            from: "2025-08-17T17:00:00Z",
            to: "2025-08-17T18:00:00Z",
          }),
        },
      });
    }
  }
  console.log(
    `✅ Asistencia registrada para ${approvedUsers.length} usuarios.`
  );
}

// Ejecutar la función principal y manejar errores
main()
  .catch((e) => {
    console.error("❌ Error durante el proceso de siembra:", e);
    process.exit(1);
  })
  .finally(async () => {
    // Cerrar la conexión con la base de datos
    await prisma.$disconnect();
    console.log("🏁 Proceso de siembra finalizado.");
  });
