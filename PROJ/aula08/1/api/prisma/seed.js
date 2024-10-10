const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const csv = require('csv-parser');

async function main() {
  // Seed de Concessionárias
  const concessionarias = [];
  fs.createReadStream('prisma/concessionarias.csv')
    .pipe(csv())
    .on('data', (row) => {
      concessionarias.push(row);
    })
    .on('end', async () => {
      for (let concessionaria of concessionarias) {
        await prisma.concessionaria.create({
          data: {
            nome: concessionaria.nome,
          },
        });
      }
    });

  // Seed de Clientes
  const clientes = [];
  fs.createReadStream('prisma/clientes.csv')
    .pipe(csv())
    .on('data', (row) => {
      clientes.push(row);
    })
    .on('end', async () => {
      for (let cliente of clientes) {
        await prisma.cliente.create({
          data: {
            nome: cliente.nome,
          },
        });
      }
    });

  // Seed de Áreas
  const areas = [];
  fs.createReadStream('prisma/areas.csv')
    .pipe(csv())
    .on('data', (row) => {
      areas.push(row);
    })
    .on('end', async () => {
      for (let area of areas) {
        await prisma.area.create({
          data: {
            numero: parseInt(area.numero),
          },
        });
      }
    });

  // Seed de Automóveis
  const automoveis = [];
  fs.createReadStream('prisma/automoveis.csv')
    .pipe(csv())
    .on('data', (row) => {
      automoveis.push(row);
    })
    .on('end', async () => {
      for (let automovel of automoveis) {
        await prisma.automovel.create({
          data: {
            modelo: automovel.modelo,
            preco: parseFloat(automovel.preco),
            areaId: parseInt(automovel.areaId),
            concessionariaId: parseInt(automovel.concessionariaId),
          },
        });
      }
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
