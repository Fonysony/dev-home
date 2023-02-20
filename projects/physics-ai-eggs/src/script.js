import { Game } from './modules/Game.js';

window.addEventListener('load', function() {

  const canvas = document.querySelector('canvas');
  canvas.width = 1280;
  canvas.height = 720;

  const game = new Game(canvas);
  game.context.strokeStyle = 'white';
  game.context.fillStyle = 'white';
  game.context.lineWidth = 3;

  console.log(game);
  console.log('player.game', game.player);
  
  function animate() {
    game.context.clearRect(0, 0, canvas.width, canvas.height); 
    game.render();
    window.requestAnimationFrame(animate);
  }
  animate();
});
