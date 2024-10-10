const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criar concessionárias
  const concessionaria1 = await prisma.concessionaria.create({
    data: {
      nome: "Concessionária A",
    },
  });

  const concessionaria2 = await prisma.concessionaria.create({
    data: {
      nome: "Concessionária B",
    },
  });

  // Criar áreas
  const area1 = await prisma.area.create({
    data: {
      numero: 5,
    },
  });

  const area2 = await prisma.area.create({
    data: {
      numero: 10,
    },
  });

  // Criar automóveis
  await prisma.automovel.create({
    data: {
      modelo: "XYZ",
      preco: 50000.00,
      areaId: area1.id,
      concessionariaId: concessionaria1.id,
    },
  });

  await prisma.automovel.create({
    data: {
      modelo: "XYZ5",
      preco: 45000.00,
      areaId: area2.id,
      concessionariaId: concessionaria2.id,
    },
  });

  // Criar clientes
  await prisma.cliente.create({
    data: {
      nome: "Cliente 1",
    },
  });

  await prisma.cliente.create({
    data: {
      nome: "Cliente 2",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
