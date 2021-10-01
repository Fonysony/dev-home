const button = document.querySelector('button');
button.onclick = function() {
    console.log('THE BUTTON IS FIRE!!');
};

const tweetForm = document.querySelector('#tweetForm');
tweetForm.addEventListener('submit', function(e) {
  e.preventDefault();
});

const btn = document.querySelector('#btnColor');
const container = document.querySelector('#container');

btn.addEventListener('click', function() {
  container.style.backgroundColor = makeRandColor();
});

container.addEventListener('click', function() {
  container.classList.toggle('hide');
});

function makeRandColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};