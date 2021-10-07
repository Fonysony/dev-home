const btn = document.querySelector('button');

btn.onclick = scream;





function scream() {
    console.log("OK NOOBOBOB");
    console.log("YOu're more trashier than TRASH!!");
}

const rgbText = document.querySelector('#rgbText');
const colorBtn = document.querySelector('#changeColor');

colorBtn.addEventListener('click', () => {
    const randColor = randomColor();
    rgbText.innerText = randColor;
    document.body.style.backgroundColor = randColor;
    console.log(randColor);
});


const randomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

// All buttons that are click get a random background color
const buttons = document.querySelectorAll('button');
for (let button of buttons) {
    console.log('Button RAN!')
    button.addEventListener('click', colorize);
}



function colorize() {
    this.style.backgroundColor = randomColor();
}

// Whereever you click a key on the page it will output the key

const keyText = document.querySelector('#keyText');

window.addEventListener('keydown', function (e) {
    console.log(e);
    console.log(e.key);
    console.log(e.code);
    switch(e.code) {
        case 'ArrowUp':
            keyText.innerText = 'Up!!';
            break;
        case 'ArrowDown':
            keyText.innerText = 'DOwn!!!';
            break;
        case 'ArrowLeft':
            keyText.innerText = 'Lefr!';
            break;
        case 'ArrowRight':
            keyText.innerText = 'RIghl!!';
            break;
    }
})