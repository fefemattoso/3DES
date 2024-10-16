async function carregarMesas() {
    const response = await fetch('http://localhost:3000/mesas');
    const mesas = await response.json();
    const listaMesas = document.getElementById('lista-mesas');
  
    mesas.forEach(mesa => {
      const li = document.createElement('li');
      li.textContent = `${mesa.nome} - ${mesa.descricao}`;
      listaMesas.appendChild(li);
    });
  }
  
  window.onload = carregarMesas;
  