const apiUrl = 'http://localhost:3000';

async function fetchAreas() {
  const response = await fetch(`${apiUrl}/areas`);
  const areas = await response.json();

  areas.forEach(area => {
    const areaDiv = document.createElement('div');
    areaDiv.classList.add('area');
    areaDiv.innerText = `Área ${area.numero}`;
    document.body.appendChild(areaDiv);
  });
}

fetchAreas();

// Mock dos dados em JSON
const automoveisData = {
    "areas": [
        { "id": 5, "automoveis": [] },
        { "id": 6, "automoveis": [] },
        { "id": 10, "automoveis": [
            { "modelo": "XYZ", "preco": "R$ 50.000,00", "qtd": 1 },
            { "modelo": "XYZ5", "preco": "R$ 75.000,00", "qtd": 2 }
        ]}
    ]
};

const clientesData = [
    { "id": 1, "nome": "Cliente A" },
    { "id": 2, "nome": "Cliente B" }
];

const concessionariasData = [
    { "id": 1, "nome": "Concessionária 1" },
    { "id": 2, "nome": "Concessionária 2" }
];

// Função para abrir modal de detalhes da área
function abrirModal(areaId) {
    const area = automoveisData.areas.find(a => a.id === areaId);
    const modal = document.getElementById('areaModal');
    const modalTitle = document.getElementById('modalTitle');
    const automoveisList = document.getElementById('automoveisList');
    
    modalTitle.textContent = `Área ${areaId}`;
    automoveisList.innerHTML = ''; // Limpa a lista

    if (area.automoveis.length === 0) {
        automoveisList.textContent = 'Essa área está vazia.';
    } else {
        area.automoveis.forEach(automovel => {
            const automovelItem = document.createElement('div');
            automovelItem.innerHTML = `
                <p>Modelo: ${automovel.modelo} | Preço: ${automovel.preco}</p>
                <button onclick="venderAutomovel('${automovel.modelo}', ${areaId})">Vender</button>
            `;
            automoveisList.appendChild(automovelItem);
        });
    }
    
    modal.style.display = 'block';
}

// Função para abrir modal de venda
function venderAutomovel(modelo, areaId) {
    const vendaModal = document.getElementById('vendaModal');
    const vendaTitle = document.getElementById('vendaTitle');
    const clienteSelect = document.getElementById('cliente');
    const concessionariaSelect = document.getElementById('concessionaria');
    
    vendaTitle.textContent = `Venda de ${modelo}`;
    
    // Populando o select de clientes
    clienteSelect.innerHTML = '';
    clientesData.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.id;
        option.textContent = cliente.nome;
        clienteSelect.appendChild(option);
    });

    // Populando o select de concessionárias
    concessionariaSelect.innerHTML = '';
    concessionariasData.forEach(concessionaria => {
        const option = document.createElement('option');
        option.value = concessionaria.id;
        option.textContent = concessionaria.nome;
        concessionariaSelect.appendChild(option);
    });

    vendaModal.style.display = 'block';
}

// Função para fechar os modais
function fecharModal() {
    document.getElementById('areaModal').style.display = 'none';
    document.getElementById('vendaModal').style.display = 'none';
}

// Fechar os modais ao clicar no 'x'
document.querySelectorAll('.close').forEach(btn => {
    btn.onclick = fecharModal;
});

// Fechar os modais ao clicar fora do conteúdo
window.onclick = function(event) {
    const areaModal = document.getElementById('areaModal');
    const vendaModal = document.getElementById('vendaModal');
    if (event.target === areaModal || event.target === vendaModal) {
        fecharModal();
    }
}
