const container = document.querySelector('#container');
const input = document.querySelector('input');
const pokeRepos = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const pokedex = 'https://www.pokemon.com/us/pokedex/';

createPoke();

input.addEventListener('input', () => {
    removePoke();
    createPoke();
});


function createPoke() {
    for(let i = 1; i <= input.value; i++) {
        appendPoke(i);
    };
};

function appendPoke(i) {
    const pokemon = document.createElement('div');
    const a = document.createElement('a');
    const label = document.createElement('span');
    const pokeImg = document.createElement('img');

    a.setAttribute('href', `${pokedex}${i}`);
    a.setAttribute('target', '_blank');
    label.innerText = `#${i}`;
    pokeImg.src = `${pokeRepos}${i}.png`;
    a.append(pokeImg);
    a.append(label);
    pokemon.append(a);
    pokemon.classList.toggle('pokemon');
    container.append(pokemon);
};

function removePoke() {
    const allPokemon = document.querySelectorAll('.pokemon');
    
    for (let poke of allPokemon) {
        poke.remove();
    };
};
