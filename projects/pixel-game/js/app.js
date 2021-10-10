const inputX = document.querySelector('#input-x');
const inputY = document.querySelector('#input-y');
const canvas = document.querySelector('.canvas');
const button = document.querySelector('button');


button.addEventListener('click', function() {
    const canvasSize = {
        x: parseInt(inputX.value),
        y: parseInt(inputY.value),
    };
    appendToCanvas(canvasSize.x, canvasSize.y);
});

function appendToCanvas(x, y) {
    let totalPixels = x * y;
    console.log(totalPixels);
    for (let i = 1; i <= totalPixels; i++) {
        console.log(i);
        const pixelDiv = document.createElement('div');
        pixelDiv.classList.add('pixel');
        canvas.append(pixelDiv);
    };
};