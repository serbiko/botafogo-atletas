document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchBar = document.getElementById('search-bar');
  const clearSearchButton = document.getElementById('clear-search');
  let atletas = [];

  // Load the saved filter state
  const savedFilter = localStorage.getItem('filter') || 'all';
  loadAtletas(savedFilter);

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      localStorage.setItem('filter', filter); // Save the filter state
      loadAtletas(filter);
    });
  });

  searchBar.addEventListener('input', filterAtletas);
  clearSearchButton.addEventListener('click', clearSearch);

  function clearAtletas() {
    const lista = document.getElementById('lista-atletas');
    lista.innerHTML = ''; // Clear any previous content
  }

  async function loadAtletas(filter) {
    clearAtletas(); // Clear the list before loading new data

    let url = 'https://botafogo-atletas.mange.li/2024-1/';
    if (filter === 'masculino') {
      url += 'masculino';
    } else if (filter === 'feminino') {
      url += 'feminino';
    } else {
      url += 'all';
    }

    try {
      const response = await fetch(url);
      atletas = await response.json();
      displayAtletas(atletas);
    } catch (error) {
      document.getElementById('lista-atletas').innerHTML = 'Erro ao carregar os dados';
    }
  }

  function filterAtletas() {
    const query = searchBar.value.toLowerCase();
    const filteredAtletas = atletas.filter(atleta =>
      atleta.nome.toLowerCase().includes(query) || atleta.posicao.toLowerCase().includes(query)
    );
    displayAtletas(filteredAtletas);
    toggleClearButton();
  }

  function clearSearch() {
    searchBar.value = '';
    filterAtletas();
  }

  function toggleClearButton() {
    if (searchBar.value) {
      clearSearchButton.style.display = 'block';
    } else {
      clearSearchButton.style.display = 'none';
    }
  }

  function displayAtletas(atletas) {
    const lista = document.getElementById('lista-atletas');
    lista.innerHTML = '';
    atletas.forEach(atleta => {
      const atletaDiv = document.createElement('div');
      atletaDiv.classList.add('atleta');
      const fotoUrl = `https://botafogo-atletas.mange.li/static/2024-1/${atleta.id}.png`;
      atletaDiv.innerHTML = `
        <img src="${fotoUrl}" alt="${atleta.nome}">
        <h2>${atleta.nome}</h2>
        <p>${atleta.posicao}</p>
        <a href="detalhes.html?id=${atleta.id}" class="detalhes-btn">Detalhes</a>
      `;
      lista.appendChild(atletaDiv);
    });
  }
});
