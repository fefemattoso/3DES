// Exemplo de função para redirecionar ao clicar numa área
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('click', () => {
        const areaId = area.id.replace('area', '');
        window.location.href = `detalhes-area.html?area=${areaId}`;
    });
});
