const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 700;

let gameSpeed = 5;
// let gameFrame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = '../background/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '../background/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '../background/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '../background/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = '../background/layer-5.png';

window.addEventListener('load', () => {
    const slider = document.querySelector('.slider');
    const html = document.querySelector('html');
    slider.value = gameSpeed;
    const showGameSpeed = document.querySelector('#showGameSpeed');
    showGameSpeed.textContent = gameSpeed;
    html.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowUp') {
            slider.value++;
            gameSpeed = slider.value;
            showGameSpeed.textContent = slider.value;
            console.log(slider.value);
        }
        if (event.code === 'ArrowDown') {
            slider.value--;
            gameSpeed = slider.value;
            showGameSpeed.textContent = slider.value;
            console.log(slider.value);
        }
    });
    
    slider.addEventListener('change', (event) => {
        gameSpeed = event.target.value;
        showGameSpeed.textContent = event.target.value;
    });

    

    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.x2 = this.width;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
    
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x  <= -this.width) {
                this.x = 0;
            }
            this.x = this.x - this.speed;
            // this.x = gameFrame * this.speed % this.width;
        }
    
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    
        }
    }
    
    const layer1 = new Layer(backgroundLayer1, 0.4);
    const layer2 = new Layer(backgroundLayer2, 0.5);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);
    
    const gameObjects = [layer1, layer2, layer3, layer4, layer5];
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameObjects.forEach(object => {
            object.update();
            object.draw();
        });
    
        requestAnimationFrame(animate);
    }
    animate();
});