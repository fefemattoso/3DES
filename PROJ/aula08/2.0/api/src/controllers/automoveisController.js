const prisma = require('../services/prismaService');

const getAutomoveis = async (req, res) => {
  try {
    const automoveis = await prisma.automovel.findMany();
    res.status(200).json(automoveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar automóveis' });
  }
};

const createAutomovel = async (req, res) => {
  const { modelo, preco, areaId, concessionariaId } = req.body;

  try {
    const automovel = await prisma.automovel.create({
      data: {
        modelo,
        preco,
        areaId,
        concessionariaId,
      },
    });
    res.status(201).json(automovel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar automóvel' });
  }
};

module.exports = { getAutomoveis, createAutomovel };
