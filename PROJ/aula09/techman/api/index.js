const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

const SECRET_KEY = 'seu_segredo_aqui';

app.post('/login', async (req, res) => {
    const { nome, senha } = req.body;
    const user = await prisma.user.findUnique({ where: { nome }, include: { perfil: true } });
    if (!user) return res.status(403).json({ error: "Usuário ou senha inválidos" });
    const isValid = await bcrypt.compare(senha, user.senha);
    if (!isValid) return res.status(403).json({ error: "Usuário ou senha inválidos" });
    const token = jwt.sign({ userId: user.id, perfil: user.perfil.nome }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, perfil: user.perfil.nome });
});

app.get('/equipments', async (req, res) => {
    const equipments = await prisma.equipment.findMany({ where: { status: true }, include: { comments: true } });
    res.json(equipments);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
