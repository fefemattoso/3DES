const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições de qualquer origem (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Rota para buscar livros por título
app.get('/api/buscarLivros', async (req, res) => {
    const { titulo } = req.query;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(titulo)}&maxResults=10`;

    try {
        const response = await axios.get(apiUrl);
        const livrosEncontrados = response.data.items.map(item => ({
            id: item.id,
            titulo: item.volumeInfo.title,
            autor: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor desconhecido',
            imagemCapa: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : null
        }));

        res.json(livrosEncontrados);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
