const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.get('/mesas', async (req, res) => {
  const mesas = await prisma.mesa.findMany({
    include: { personagens: true },
  });
  res.json(mesas);
});

app.post('/mesas', async (req, res) => {
  const { nome, descricao } = req.body;
  const mesa = await prisma.mesa.create({
    data: { nome, descricao },
  });
  res.json(mesa);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
