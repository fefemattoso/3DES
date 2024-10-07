// Usuários pré-configurados (exemplo)
const usuarios = [
    {
        email: 'professor1@email.com',
        senha: '123',
        nome: 'Professor 1'
    },
    {
        email: 'professor2@email.com',
        senha: 'senha456',
        nome: 'Professor 2'
    }
];

// Lidar com o evento de envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pegando os valores do input de email e senha
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    // Checar se o usuário existe e se a senha está correta
    const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

    // Verificar se as credenciais são válidas
    if (usuarioEncontrado) {
        // Redirecionar para a tela principal do professor ou exibir mensagem de sucesso
        alert(`Bem-vindo, ${usuarioEncontrado.nome}`);
        window.location.href = 'telas/principal.html'; // Redireciona para a página principal
    } else {
        // Exibir mensagem de erro se o login falhar
        document.getElementById('error-message').textContent = 'E-mail ou senha inválidos!';
    }
});
