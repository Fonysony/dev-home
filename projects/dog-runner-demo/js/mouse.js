const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const collisionCanvas = document.querySelector('#collision');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

ctx.imageSmoothingEnabled = false;
ctx.font = '50px Impact';

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;
let gameOver = false;

let ravens = [];

class Raven {
    constructor() {
        this.image = new Image();
        this.image.src = './sprites/raven.png';
        this.sizeModifer = Math.random() * 0.6 + 0.4;
        this.spriteWidth = this.image.width / 6;
        this.spriteHeight = this.image.height;
        this.width = this.spriteWidth * this.sizeModifer;
        this.height = this.spriteHeight * this.sizeModifer;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`;
        

    }
    update(deltatime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = -this.directionY;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
        if (this.x < 0 - this.width) gameOver = true;
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

const raven = new Raven();

let explosions = [];
class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = './sprites/boom.png';
        this.spriteWidth = this.image.width / 5;
        this.spriteHeight = this.image.height / 1;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = './sfx/fire-impact.wav';
        this.lastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    }
    update(deltatime) {
        if (this.frame === 0) this.sound.play();
        this.lastFrame += deltatime;
        if (this.lastFrame > this.frameInterval) {
            this.frame++;
            this.lastFrame = 0;
            if (this.frame > 5) this.markedForDeletion = true;
        }
    }
    draw() {
        console.log(this.spriteWidth, this.spriteHeight);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size/4, this.size, this.size);
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, 55, 80);
}
function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText(`GAME OVER! your score is ${score}`, canvas.width/2, canvas.height/2);
    ctx.fillStyle = 'white';
    ctx.fillText(`GAME OVER! your score is ${score}`, canvas.width/2, canvas.height/2 + 5);
}

window.addEventListener('click', (event) => {
    const detectPixelColor = collisionCtx.getImageData(event.x, event.y, 1, 1);
    console.log(detectPixelColor);
    const pc = detectPixelColor.data;
    ravens.forEach(raven => {
        if (raven.randomColors[0] === pc[0] && raven.randomColors[1] === pc[1] && raven.randomColors[2] === pc[2]) {
            raven.markedForDeletion = true;
            score++;
            explosions.push(new Explosion(raven.x, raven.y, raven.width));
        }
    });
});


function animate(timestap) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestap - lastTime;
    lastTime = timestap;
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort((ravenA, ravenB) => {
            return ravenA.width - ravenB.width;
        });
    }
    drawScore();
    [...ravens, ...explosions].forEach(object => object.update(deltatime));
    [...ravens, ...explosions].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.markedForDeletion);
    explosions = explosions.filter(object => !object.markedForDeletion);
     if (!gameOver) requestAnimationFrame(animate);
     else drawGameOver();
}
animate(0);