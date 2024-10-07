// Script para validação de login e interação com o backend
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita o comportamento padrão do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = { email, password };

    try {
        // Enviar dados para o backend para validação
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            // Redirecionar para a página principal do professor
            window.location.href = '/professor/dashboard';
        } else {
            // Exibir mensagem de erro
            document.getElementById('error-message').textContent = result.message || 'Erro de autenticação.';
        }
    } catch (error) {
        console.error('Erro ao enviar dados de login:', error);
        document.getElementById('error-message').textContent = 'Erro de conexão com o servidor.';
    }
});
