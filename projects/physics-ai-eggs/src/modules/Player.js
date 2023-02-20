export class Player {
  constructor(game) {
    this.game = game;
    this.x = 50;
    this.y = 50;
    this.radius = 20;
    this.speedModifier = 1;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.save();
    context.globalAlpha = 0.5;
    context.fill();
    context.restore();
    context.stroke();
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.game.mouse.x, this.game.mouse.y);
    context.stroke();
  }

  update() {
    const dx = this.game.mouse.x - this.x;
    const dy = this.game.mouse.y - this.y;
    const distance = this.game.findDistance([this.game.mouse.x, this.game.mouse.y], [this.x, this.y]);
    console.log('distance', distance, dx, dy);
    console.log('player', this.x, this.y);
    if (dx !== 0) {    
      this.x += (dx/distance) * this.speedModifier || 0;
    } else {
    }

    if (!dy === this.y) {
      this.y += (dy/distance) * this.speedModifier || 0;
    }
  }
}
