const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
    // Seed profiles (Admin and User)
    const adminProfile = await prisma.profile.upsert({
        where: { nome: 'admin' },
        update: {},
        create: { nome: 'admin' },
    });

    const userProfile = await prisma.profile.upsert({
        where: { nome: 'user' },
        update: {},
        create: { nome: 'user' },
    });

    // Seed users with hashed passwords
    const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
    const hashedPasswordUser = await bcrypt.hash('user123', 10);

    const adminUser = await prisma.user.upsert({
        where: { nome: 'Admin User' },
        update: {},
        create: {
            nome: 'Admin User',
            senha: hashedPasswordAdmin,
            perfilId: adminProfile.id,
        },
    });

    const normalUser = await prisma.user.upsert({
        where: { nome: 'Standard User' },
        update: {},
        create: {
            nome: 'Standard User',
            senha: hashedPasswordUser,
            perfilId: userProfile.id,
        },
    });

    // Seed equipment
    const equipment1 = await prisma.equipment.upsert({
        where: { nome: '3D Printer' },
        update: {},
        create: {
            nome: '3D Printer',
            descricao: 'An advanced 3D printer for creating prototypes.',
            imagemUrl: 'https://example.com/3d-printer.jpg',
            status: true,
        },
    });

    const equipment2 = await prisma.equipment.upsert({
        where: { nome: 'Laser Cutter' },
        update: {},
        create: {
            nome: 'Laser Cutter',
            descricao: 'Precision laser cutter for cutting and engraving materials.',
            imagemUrl: 'https://example.com/laser-cutter.jpg',
            status: true,
        },
    });

    // Seed comments
    await prisma.comment.createMany({
        data: [
            {
                comentario: 'This 3D printer works great for rapid prototyping.',
                userId: adminUser.id,
                equipmentId: equipment1.id,
            },
            {
                comentario: 'Laser cutter is precise and efficient!',
                userId: normalUser.id,
                equipmentId: equipment2.id,
            },
        ],
    });

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
