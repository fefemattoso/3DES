const prisma = require('../services/prismaService');

const getAreas = async (req, res) => {
  try {
    const areas = await prisma.area.findMany();
    res.status(200).json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar áreas' });
  }
};

module.exports = { getAreas };
