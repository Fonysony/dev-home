/** @type {HTMLCanvasElement} */

window.addEventListener('load', function() {

    class Canvas {
        constructor(element, canvasWidth, canvasHeight, amountOfEnemies) {
            this.element = document.querySelector(element);
            this.ctx = this.element.getContext('2d');
            this.width = canvasWidth;
            this.height = canvasHeight;
            this.element.width = this.width;
            this.element.height = this.height;
            this.amountOfEnemies = amountOfEnemies;
            this.enemiesArray = [];
            this.gameFrame = 0;
        }
    }
    
    const canvas1 = new Canvas('.canvas1', 500, 1000, 20);
    
    class Enemy {
        constructor(image, canvas, frameX = 1, frameY = 1, spriteRatioX = 1, spriteRatioY = 1, x = 0, y = 0) {
            this.canvas = canvas;
            this.image = new Image();
            this.image.src = image;
            this.spriteWidth = this.image.width / frameX;
            this.spriteHeight = this.image.height / frameY;
            this.width = this.spriteWidth / spriteRatioX;
            this.height = this.spriteHeight / spriteRatioY;
            this.x = Math.random() * (this.canvas.width - this.width);
            this.y = Math.random() * (this.canvas.height - this.height);
            this.frame = 0;
            this.speed = Math.random() * 4 + 1;
            this.flapSpeed = Math.floor(Math.random() * 3 + 1);
            this.angle = 0;
            this.angleSpeed = Math.random() * 0.2;
            this.curve = Math.random() * 7;
        }
        update() {
            this.x -= this.speed;
            this.y += this.curve * Math.sin(this.angle);
            this.angle += this.angleSpeed;
            if (this.x + this.width < 0) this.x = this.canvas.width;
            // animate sprites
            if (this.canvas.gameFrame % this.flapSpeed === 0) {
                this.frame > 4 ? this.frame = 0 : this.frame++;
            }
        }
        draw() {
            this.canvas.ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        random() {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.speed = Math.random() * 4 - 2;
        }
    }
    
    
    
    for (let i = 0; i < canvas1.amountOfEnemies; i++) {
        const enemy = new Enemy('../sprites/enemy2.png', canvas1, 6, 1, 2.5, 2.5);
        canvas1.enemiesArray.push(enemy);
    }
    console.log(canvas1.enemiesArray);
    
    function animate() {
        canvas1.ctx.clearRect(0, 0, canvas1.width, canvas1.height);
        canvas1.enemiesArray.forEach(enemy => {
            enemy.update();
            enemy.draw();
        });
        canvas1.gameFrame++;
        requestAnimationFrame(animate);
    }
    
    animate();    
});
