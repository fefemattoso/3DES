// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma'); // Ajuste o caminho conforme necessário

const router = express.Router();
const SECRET_KEY = 'seu_segredo_aqui'; // Use a mesma chave secreta

// Rota de login
router.post('/login', async (req, res) => {
    const { nome, senha } = req.body;

    const user = await prisma.user.findUnique({
        where: { nome },
        include: { perfil: true },
    });

    if (!user) return res.status(403).json({ error: "Usuário ou senha inválidos" });

    const isValid = await bcrypt.compare(senha, user.senha);
    if (!isValid) return res.status(403).json({ error: "Usuário ou senha inválidos" });

    const token = jwt.sign({ userId: user.id, perfil: user.perfil.nome }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, perfil: user.perfil.nome });
});

// Exporta o router
module.exports = router;
