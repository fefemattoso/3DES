// app.js (Backend)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Mockup de dados no lugar de um banco de dados real
const users = [
    { id: 1, email: 'joao@email.com', password: 'senha123', name: 'João' },
    { id: 2, email: 'maria@email.com', password: 'senha123', name: 'Maria' }
];

app.use(bodyParser.json());
app.use(express.static('public')); // Para servir os arquivos estáticos como HTML, CSS, JS

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validação simples
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Autenticação bem-sucedida
        res.status(200).json({ message: 'Login bem-sucedido', userId: user.id });
    } else {
        // Falha na autenticação
        res.status(401).json({ message: 'Email ou senha inválidos' });
    }
});

// Página principal do professor (rota de exemplo)
app.get('/professor/dashboard', (req, res) => {
    res.send('<h1>Bem-vindo ao painel do professor!</h1>');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
