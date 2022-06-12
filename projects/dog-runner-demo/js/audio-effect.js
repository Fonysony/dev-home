/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 700;
canvas.height = 500;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosions {
    constructor( x, y) {
        this.image = new Image();
        this.image.src = '/sprites/boom.png';
        this.spriteWidth = this.image.width / 5;
        this.spriteHeight = this.image.height;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = '/sfx/fire-impact.wav';
    }
    update() {
        this.timer++;
        if (this.timer % 7 === 0) {
            this.frame++;
        }
        if (this.frame === 0 ) this.sound.play();
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width/2, 0 - this.height/2, this.width, this.height);
        ctx.restore();
    }
}

window.addEventListener('click', (event) => {
    createAnimation(event);
});

function createAnimation(event) {
    let positionX = event.x - canvasPosition.left;
    let positionY = event.y - canvasPosition.top;
    explosions.push(new Explosions(positionX, positionY));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}
animate();