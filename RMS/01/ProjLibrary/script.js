const formBuscarLivro = document.getElementById('formBuscarLivro');
const resultadoBusca = document.getElementById('resultadoBusca');

formBuscarLivro.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(formBuscarLivro);
    const titulo = formData.get('titulo');

    try {
        const response = await fetch(`http://localhost:3000/api/buscarLivros?titulo=${titulo}`);
        const livrosEncontrados = await response.json();

        mostrarResultado(livrosEncontrados);
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
    }
});

function mostrarResultado(livros) {
    resultadoBusca.innerHTML = '';

    if (livros.length === 0) {
        resultadoBusca.innerHTML = '<p>Nenhum livro encontrado.</p>';
    } else {
        livros.forEach(livro => {
            const divLivro = document.createElement('div');
            divLivro.classList.add('livro');

            const imagem = document.createElement('img');
            imagem.src = livro.imagemCapa || 'placeholder.jpg'; // Imagem de placeholder caso não haja imagem disponível
            imagem.alt = livro.titulo;

            const titulo = document.createElement('p');
            titulo.textContent = livro.titulo;

            const autor = document.createElement('p');
            autor.textContent = `Autor(es): ${livro.autor}`;

            divLivro.appendChild(imagem);
            divLivro.appendChild(titulo);
            divLivro.appendChild(autor);

            resultadoBusca.appendChild(divLivro);
        });
    }
}
