const prisma = require('../services/prismaService');

const getConcessionarias = async (req, res) => {
  try {
    const concessionarias = await prisma.concessionaria.findMany();
    res.status(200).json(concessionarias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar concessionárias' });
  }
};

module.exports = { getConcessionarias };
