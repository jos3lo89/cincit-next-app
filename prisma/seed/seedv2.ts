import { PrismaClient, InscriptionState, Role } from "@prisma/client";

const prisma = new PrismaClient();

// Array de datos falsos para los 15 participantes
const participantsData = [
  {
    dni: "71234567",
    name: "Juan",
    lastname: "Perez Quispe",
    email: "juan.perez@example.com",
    phone: "987654321",
    institution: "UNMSM",
    voucherPath: "/seed/vouchers/voucher_jperez.png",
  },
  {
    dni: "72345678",
    name: "Maria",
    lastname: "Garcia Lopez",
    email: "maria.garcia@example.com",
    phone: "912345678",
    institution: "UNI",
    voucherPath: "/seed/vouchers/voucher_mgarcia.png",
  },
  {
    dni: "73456789",
    name: "Carlos",
    lastname: "Rodriguez Mamani",
    email: "carlos.r@example.com",
    phone: "923456789",
    institution: "PUCP",
    voucherPath: "/seed/vouchers/voucher_crodriguez.png",
  },
  {
    dni: "74567890",
    name: "Ana",
    lastname: "Martinez Flores",
    email: "ana.martinez@example.com",
    phone: "934567890",
    institution: "UNAJMA",
    voucherPath: "/seed/vouchers/voucher_amartinez.png",
  },
  {
    dni: "75678901",
    name: "Luis",
    lastname: "Hernandez Gonzales",
    email: "luis.h@example.com",
    phone: "945678901",
    institution: "UNSA",
    voucherPath: "/seed/vouchers/voucher_lhernandez.png",
  },
  {
    dni: "76789012",
    name: "Sofia",
    lastname: "Diaz Torres",
    email: "sofia.diaz@example.com",
    phone: "956789012",
    institution: "UNAP",
    voucherPath: "/seed/vouchers/voucher_sdiaz.png",
  },
  {
    dni: "77890123",
    name: "Diego",
    lastname: "Vargas Rojas",
    email: "diego.vargas@example.com",
    phone: "967890123",
    institution: "UNTRM",
    voucherPath: "/seed/vouchers/voucher_dvargas.png",
  },
  {
    dni: "78901234",
    name: "Camila",
    lastname: "Mendoza Castillo",
    email: "camila.m@example.com",
    phone: "978901234",
    institution: "UNAMAD",
    voucherPath: "/seed/vouchers/voucher_cmendoza.png",
  },
  {
    dni: "79012345",
    name: "Javier",
    lastname: "Soto Cruz",
    email: "javier.soto@example.com",
    phone: "989012345",
    institution: "UNAP",
    voucherPath: "/seed/vouchers/voucher_jsoto.png",
  },
  {
    dni: "80123456",
    name: "Valentina",
    lastname: "Reyes Rios",
    email: "valentina.r@example.com",
    phone: "990123456",
    institution: "UNAJMA",
    voucherPath: "/seed/vouchers/voucher_vreyes.png",
  },
  {
    dni: "81234567",
    name: "Mateo",
    lastname: "Morales Guzman",
    email: "mateo.morales@example.com",
    phone: "911234567",
    institution: "UNMSM",
    voucherPath: "/seed/vouchers/voucher_mmorales.png",
  },
  {
    dni: "82345678",
    name: "Luciana",
    lastname: "Ortega Paredes",
    email: "luciana.o@example.com",
    phone: "922345678",
    institution: "UNI",
    voucherPath: "/seed/vouchers/voucher_lortega.png",
  },
  {
    dni: "83456789",
    name: "Daniel",
    lastname: "Salazar Vega",
    email: "daniel.s@example.com",
    phone: "933456789",
    institution: "PUCP",
    voucherPath: "/seed/vouchers/voucher_dsalazar.png",
  },
  {
    dni: "84567890",
    name: "Isabella",
    lastname: "Guerrero Luna",
    email: "isabella.g@example.com",
    phone: "944567890",
    institution: "UNSA",
    voucherPath: "/seed/vouchers/voucher_iguerrero.png",
  },
  {
    dni: "85678901",
    name: "Nicolas",
    lastname: "Cabrera Ramos",
    email: "nicolas.c@example.com",
    phone: "955678901",
    institution: "UNAJMA",
    voucherPath: "/seed/vouchers/voucher_ncabrera.png",
  },
];

async function main() {
  console.log("🚀 Iniciando el seeding de participantes...");

  for (const participant of participantsData) {
    // 1. Crear o actualizar el usuario
    const user = await prisma.user.upsert({
      where: { email: participant.email },
      update: {},
      create: {
        dni: participant.dni,
        name: participant.name,
        lastname: participant.lastname,
        email: participant.email,
        phone: participant.phone,
        institution: participant.institution,
        role: Role.PARTICIPANT, // Todos son participantes
      },
    });

    // 2. Crear un voucher para el usuario
    const voucher = await prisma.voucher.create({
      data: {
        userId: user.id,
        amount: 100, // Monto de ejemplo
        path: participant.voucherPath,
      },
    });

    // 3. Crear una inscripción pendiente para el usuario
    await prisma.inscription.create({
      data: {
        userId: user.id,
        voucherId: voucher.id,
        state: InscriptionState.pending, // Todas las inscripciones estarán pendientes
      },
    });

    console.log(`✅ Creado participante: ${user.name} ${user.lastname}`);
  }

  console.log("🎉 ¡Seeding de 15 participantes finalizado con éxito!");
}

main()
  .catch((e) => {
    console.error("❌ Ocurrió un error durante el seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
