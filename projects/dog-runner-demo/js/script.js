window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    
    const playerImage = new Image();
    playerImage.src = '../sprites/shadow_dog.png';
    console.log(playerImage);
    // 6876*5230
    const spriteWidth = playerImage.width / 12;
    const spriteHeight = playerImage.height / 10;
    let playerState = 'idle';
    const dropdown = document.querySelector('#animations');
    
    dropdown.addEventListener('change', (event) => {
        playerState = event.target.value;
    });
    
    let gameFrame = 0;
    const staggerFrame = 3;
    const spriteAnimations = [];
    const animationStates = [
        {
            name: 'idle',
            frames: 7
        },
        {
            name: 'jump',
            frames: 7,
        },
        {
            name: 'fall',
            frames: 7,
        },
        {
            name: 'run',
            frames: 9,
        },
        {
            name: 'dizzy',
            frames: 11,
        },
        {
            name: 'sit',
            frames: 5,
        },
        {
            name: 'roll',
            frames: 7,
        },
        {
            name: 'bite',
            frames: 7,
        },
        {
            name: 'ko',
            frames: 12,
        },
        {
            name: 'getHit',
            frames: 4,
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
        window.requestAnimationFrame(animate);
    }
    animate();
});