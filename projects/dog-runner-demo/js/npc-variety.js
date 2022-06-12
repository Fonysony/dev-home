/** @type {HTMLCanvasElement} */
document.addEventListener('load', () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;

    class Game {
        constructor() {
            this.enemies = [];
            this.#addNewEnemy();
            console.log(this.enemies);
        }
        update() {

        }
        draw() {

        }
        #addNewEnemy() {
            this.enemies.push(new Enemy());
        }
    }

    class Enemy {
        constructor() {
            this.x = 100;
            this.y = 100;
            this.width = 100;
            this.height = 100;
        }
        update() {
            this.x--;
        }
        draw() {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    const game = new Game();

    let lastTime = 1;
    
    function animate(timestap) {
            const deltaTime = timestap - lastTime;
            lastTime = timestap;
            console.log(deltaTime);
            window.requestAnimationFrame(animate);
    }
    animate(0);
});