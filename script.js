let currentPokemonId = 1;

const pokemonContainer = document.getElementById('pokemonContainer');
const pokemonName = document.getElementById('pokemonName');
const pokemonImage = document.getElementById('pokemonImage');
const pokemonType = document.getElementById('pokemonType');
const pokemonInput = document.getElementById('pokemon');

// Função para buscar Pokémon pelo nome ou ID
function buscarPokemon() {
    const query = pokemonInput.value.toLowerCase().trim();
    if (query) {
        fetchPokemon(query);
    }
}

// Função para buscar Pokémon por ID ou nome
function fetchPokemon(query) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => response.json())
        .then(data => {
            displayPokemon(data);
        })
        .catch(error => {
            alert('Pokémon não encontrado!');
            console.error(error);
        });
}

// Exibe o Pokémon buscado
function displayPokemon(data) {
    currentPokemonId = data.id; // Atualiza o ID atual
    pokemonName.textContent = data.name.toUpperCase();
    pokemonImage.src = data.sprites.front_default;
    pokemonType.textContent = data.types.map(typeInfo => typeInfo.type.name).join(', ');

    const mainType = data.types[0].type.name;
    setBackground(mainType);
}

// Função para definir o fundo com base no tipo do Pokémon
function setBackground(type) {
    const colors = {
        fire: '#FF6347',
        water: '#4682B4',
        grass: '#7CFC00',
        electric: '#FFD700',
        psychic: '#FF69B4',
        ice: '#00FFFF',
        dragon: '#8A2BE2',
        dark: '#4F4F4F',
        fairy: '#FFB6C1',
        normal: '#A8A77A',
        fighting: '#C03028',
        flying: '#A890F0',
        poison: '#A040A0',
        ground: '#E0C068',
        rock: '#B8A038',
        bug: '#A8B820',
        ghost: '#705898',
        steel: '#B8B8D0'
    };

    pokemonContainer.style.backgroundColor = colors[type] || '#F5F5F5'; // Cor padrão se o tipo não for encontrado
}

// Função para ir para o próximo Pokémon
function nextPokemon() {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
}

// Função para ir para o Pokémon anterior
function previousPokemon() {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
}

// Inicia com o primeiro Pokémon
fetchPokemon(currentPokemonId);
