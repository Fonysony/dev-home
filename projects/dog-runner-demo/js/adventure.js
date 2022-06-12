const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const playerImage = new Image();
playerImage.src = './sprites/adventure_sprites.png';
// 6876*5230
const spriteWidth = playerImage.width / 13;
const spriteHeight = playerImage.height / 8;
console.log(`${playerImage.width}*${playerImage.height}`);
let playerState = 'idle';
const dropdown = document.querySelector('#adventure');

dropdown.addEventListener('change', (event) => {
    playerState = event.target.value;
});

let gameFrame = 0;
const staggerFrame = 3;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 13
    },
    {
        name: 'run',
        frames: 8,
    },
    {
        name: 'attack',
        frames: 10,
    },
    {
        name: 'attack_2',
        frames: 10,
    },
    {
        name: 'attack_3',
        frames: 10,
    },
    {
        name: 'jump',
        frames: 6,
    },
    {
        name: 'dizzy',
        frames: 4,
    },
    {
        name: 'KO',
        frames: 7,
    },
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(playerImage, frameX , frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();