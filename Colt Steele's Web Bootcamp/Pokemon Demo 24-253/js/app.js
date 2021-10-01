
let baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
let pokedex = 'https://www.pokemon.com/us/pokedex/';

for (let i = 1; i < 899; i++) {
    const pokemon = document.createElement('div');
    const label = document.createElement('span');
    label.innerText = `#${i}`;
    const container = document.querySelector('#container');
    const link = document.createElement('a');
    link.setAttribute('href', `${pokedex}${i}${'.png'}`);
    link.setAttribute('target', '_blank');
    const newImg = document.createElement('img');
    newImg.src = `${baseURL}${i}${'.png'}`;
    pokemon.appendChild(link);
    link.appendChild(newImg);
    pokemon.appendChild(label);
    container.appendChild(pokemon);

}