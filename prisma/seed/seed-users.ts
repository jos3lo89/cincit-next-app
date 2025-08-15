import { PrismaClient, InscriptionState, Role } from "@prisma/client";

const prisma = new PrismaClient();

const participantsData = [
  {
    dni: "71234567",
    name: "Juan",
    lastname: "Perez Quispe",
    email: "ganbaru743@gmail.com",
    phone: "987654321",
    institution: "UNMSM",
    voucherPath:
      "https://i.pinimg.com/736x/d6/76/21/d676216ecdec8474c8f611fb5394575d.jpg",
  },
  {
    dni: "72345678",
    name: "Maria",
    lastname: "Garcia Lopez",
    email: "maria.garcia@example.com",
    phone: "912345678",
    institution: "UNI",
    voucherPath:
      "https://i.pinimg.com/736x/b8/61/d1/b861d1ffa5f900d77e7773556f9af2d7.jpg",
  },
  {
    dni: "73456789",
    name: "Carlos",
    lastname: "Rodriguez Mamani",
    email: "carlos.r@example.com",
    phone: "923456789",
    institution: "PUCP",
    voucherPath:
      "https://i.pinimg.com/1200x/6d/5e/10/6d5e1074c585564a7184969b585155ac.jpg",
  },
  {
    dni: "74567890",
    name: "Ana",
    lastname: "Martinez Flores",
    email: "ana.martinez@example.com",
    phone: "934567890",
    institution: "UNAJMA",
    voucherPath:
      "https://i.pinimg.com/736x/18/00/93/18009397d25850968664554523bfe73a.jpg",
  },
  {
    dni: "75678901",
    name: "Luis",
    lastname: "Hernandez Gonzales",
    email: "luis.h@example.com",
    phone: "945678901",
    institution: "UNSA",
    voucherPath:
      "https://i.pinimg.com/736x/11/11/81/1111817a38a4fa7fc75f9a1667fa04cd.jpg",
  },
  {
    dni: "76789012",
    name: "Sofia",
    lastname: "Diaz Torres",
    email: "sofia.diaz@example.com",
    phone: "956789012",
    institution: "UNAP",
    voucherPath:
      "https://i.pinimg.com/736x/87/68/53/8768531873addae505b1b3b144564ca3.jpg",
  },
  {
    dni: "77890123",
    name: "Diego",
    lastname: "Vargas Rojas",
    email: "diego.vargas@example.com",
    phone: "967890123",
    institution: "UNTRM",
    voucherPath:
      "https://i.pinimg.com/736x/a9/fe/c2/a9fec2d4ea46f1d293bcaa8ecb9bfda3.jpg",
  },
  {
    dni: "78901234",
    name: "Camila",
    lastname: "Mendoza Castillo",
    email: "camila.m@example.com",
    phone: "978901234",
    institution: "UNAMAD",
    voucherPath:
      "https://i.pinimg.com/736x/d0/29/6d/d0296d594b4088b69db7a5bb609a1ae7.jpg",
  },
  {
    dni: "79012345",
    name: "Javier",
    lastname: "Soto Cruz",
    email: "javier.soto@example.com",
    phone: "989012345",
    institution: "UNAP",
    voucherPath:
      "https://i.pinimg.com/736x/07/84/88/0784886b016ff8eba6fdb80df34d9ff0.jpg",
  },
  {
    dni: "80123456",
    name: "Valentina",
    lastname: "Reyes Rios",
    email: "valentina.r@example.com",
    phone: "990123456",
    institution: "UNAJMA",
    voucherPath:
      "https://i.pinimg.com/1200x/b0/24/d2/b024d24e5590696b2d0c5aa4d53fc8b1.jpg",
  },
  {
    dni: "81234567",
    name: "Mateo",
    lastname: "Morales Guzman",
    email: "mateo.morales@example.com",
    phone: "911234567",
    institution: "UNMSM",
    voucherPath:
      "https://i.pinimg.com/736x/29/34/60/293460f7f5994a9fa698cf94d5179124.jpg",
  },
  {
    dni: "82345678",
    name: "Luciana",
    lastname: "Ortega Paredes",
    email: "luciana.o@example.com",
    phone: "922345678",
    institution: "UNI",
    voucherPath:
      "https://i.pinimg.com/736x/ce/2c/95/ce2c95953e79a22dad4acc1d89cde345.jpg",
  },
  {
    dni: "83456789",
    name: "Daniel",
    lastname: "Salazar Vega",
    email: "daniel.s@example.com",
    phone: "933456789",
    institution: "PUCP",
    voucherPath:
      "https://i.pinimg.com/1200x/ab/30/a5/ab30a59a1eb777bb81d001a88813942d.jpg",
  },
  {
    dni: "84567890",
    name: "Isabella",
    lastname: "Guerrero Luna",
    email: "isabella.g@example.com",
    phone: "944567890",
    institution: "UNSA",
    voucherPath:
      "https://i.pinimg.com/736x/a3/6e/0e/a36e0eff65ebe58c495c6614f51a8438.jpg",
  },
  {
    dni: "85678901",
    name: "Nicolas",
    lastname: "Cabrera Ramos",
    email: "nicolas.c@example.com",
    phone: "955678901",
    institution: "UNAJMA",
    voucherPath:
      "https://i.pinimg.com/736x/27/cb/7b/27cb7b9f36a85d463f3db03dec107745.jpg",
  },
];

async function main() {
  console.log("🚀 Iniciando el seeding de participantes...");

  for (const participant of participantsData) {
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
        role: Role.PARTICIPANT,
      },
    });

    const voucher = await prisma.voucher.create({
      data: {
        userId: user.id,
        urlfull: participant.voucherPath,
      },
    });

    await prisma.inscription.create({
      data: {
        userId: user.id,
        voucherId: voucher.id,
        state: InscriptionState.pending,
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
