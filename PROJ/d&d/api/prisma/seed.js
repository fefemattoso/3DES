const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criar uma mesa de exemplo
  const mesa = await prisma.mesa.create({
    data: {
      nome: 'Aventura na Caverna do Dragão',
      descricao: 'Um grupo de heróis se reúne para enfrentar um dragão ancestral.',
    },
  });

  // Criar um personagem de exemplo
  await prisma.personagem.create({
    data: {
      nome: 'Thorn, o Guerreiro',
      classe: 'Guerreiro',
      raca: 'Humano',
      nivel: 3,
      vida: 30,
      mesaId: mesa.id,  // Relacionando com a mesa criada
    },
  });
}

main()
  .then(() => {
    console.log('Seed realizado com sucesso!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
