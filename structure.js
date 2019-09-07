class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Square {
  constructor(x, y, mainColor, offColor) {
    this.pos = new Point(x, y);
    this.mainColor = mainColor;
    this.offColor = offColor;
  }

  rotate() {
    return true;
  }

  draw(context) {
    context.fillStyle = this.mainColor;
    context.fillRect(this.pos.x * shapeWidth, this.pos.y * shapeWidth, shapeWidth, shapeWidth);
  }
}

const width = height = 5;
const windowSize = 800;
const shapeWidth = windowSize / width;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

createBoard();
draw(ctx);

function createBoard() {
  shapes = [...Array(width).keys()].map(x => Array(height));
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      shapes[i][j] = new Square(i, j, "#74e448", "#000000");
    }
  }
}

function draw(context) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      shapes[i][j].draw(context);
    }
  }
}