import { Player } from './Player.js';
export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.imageSmoothingEnabled = false;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.player = new Player(this);
    this.mouse = {
      x: this.player.x,
      y: this.player.y,
      leftClick: false,
      rightClick: false 
    }
    console.log(this.mouse);

  // Mouse Events
    canvas.addEventListener('contextmenu', event => event.preventDefault());
    canvas.addEventListener('mousedown', event => {
        this.player.update();
        if (event.which === 1) {
          this.mouse.leftClick = true;
          this.mouse.x = event.offsetX;
          this.mouse.y = event.offsetY;
        } else {
          this.mouse.rightClick = true;
          
        }
    });

    canvas.addEventListener('mouseup', () => {
      this.mouse.leftClick = false;
      this.mouse.rightClick = false;
    });
    
    canvas.addEventListener('mousemove', event => {
      if (this.mouse.leftClick && !this.mouse.rightClick) {
        this.mouse.x = event.offsetX;
        this.mouse.y = event.offsetY;
      }
    });
  }

  render() {
    this.player.draw(this.context);
    this.player.update();
  }

  findDistance([x1, y1], [x2, y2]) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  }
}
