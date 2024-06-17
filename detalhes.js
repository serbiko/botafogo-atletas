document.addEventListener('DOMContentLoaded', () => {
  const detalhesContainer = document.getElementById('detalhes-atleta');
  const voltarButton = document.getElementById('voltar');
  const urlParams = new URLSearchParams(window.location.search);
  const atletaId = urlParams.get('id');

  async function loadAtletaDetalhes(id) {
    const url = `https://botafogo-atletas.mange.li/2024-1/${id}`;
    try {
      const response = await fetch(url);
      const atleta = await response.json();
      displayAtletaDetalhes(atleta);
    } catch (error) {
      detalhesContainer.innerHTML = 'Erro ao carregar os dados';
    }
  }

  function displayAtletaDetalhes(atleta) {
    detalhesContainer.innerHTML = `
      <div class="detalhes-foto-container">
        <img src="${atleta.imagem}" alt="${atleta.nome}" class="detalhes-foto">
      </div>
      <div class="detalhes-info-container">
        <p>${atleta.detalhes}</p>
        <p><strong>Posição:</strong> ${atleta.posicao}</p>
        <p><strong>Naturalidade:</strong> ${atleta.naturalidade}</p>
        <p><strong>Nascimento:</strong> ${atleta.nascimento}</p>
        <p><strong>Altura:</strong> ${atleta.altura}</p>
        <p><strong>No Botafogo desde:</strong> ${atleta.no_botafogo_desde}</p>
        <p><strong>Número de jogos:</strong> ${atleta.n_jogos}</p>
      </div>
    `;
  }

  voltarButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  loadAtletaDetalhes(atletaId);
});
