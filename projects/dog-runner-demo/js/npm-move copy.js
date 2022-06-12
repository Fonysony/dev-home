/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 1000;
const amountOfEnemies = 100;
const enemiesArray = [];
let gameFrame = 0;

class Enemy {
    constructor(image, frameX = 1, frameY = 1, spriteRatioX = 1, spriteRatioY = 1, x = 0, y = 0, speed = 0) {
        
        this.image = new Image();
        this.image.src = image;
        this.spriteWidth = this.image.width / frameX;
        this.spriteHeight = this.image.height / frameY;
        this.width = this.spriteWidth / spriteRatioX;
        this.height = this.spriteHeight / spriteRatioY;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.speed = speed;
    }
    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        // animate sprites
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    random() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 4 - 2;
    }
}

for (let i = 0; i < amountOfEnemies; i++) {
    const enemy = new Enemy('../sprites/enemy1.png', 6, 1, 3, 3);
    enemy.random();
    enemiesArray.push(enemy);
}
console.log(enemiesArray);
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();