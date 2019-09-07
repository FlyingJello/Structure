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

class Circle {
  constructor(x, y, mainColor, offColor) {
    this.pos = new Point(x, y);
    this.mainColor = mainColor;
    this.offColor = offColor;
  }

  rotate() {
    return true;
  }

  draw(context) {
    context.fillStyle = this.offColor;
    context.fillRect(this.pos.x * shapeWidth, this.pos.y * shapeWidth, shapeWidth, shapeWidth);

    context.fillStyle = this.mainColor;
    context.beginPath();
    context.arc(this.pos.x * shapeWidth + (shapeWidth / 2), this.pos.y * shapeWidth + (shapeWidth / 2), shapeWidth / 2, 0, 2 * Math.PI);
    context.fill();
  }
}

const width = height = 5;
const windowSize = 800;
const shapeWidth = windowSize / width;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.onclick = onCanvasClick;

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

function onCanvasClick(event) {
  let { x, y } = findClickedShapePosition(event.clientX, event.clientY);

  if (event.which === 3) {
    //rotate
  }
  else {
    shapes[x][y] = new Circle(x, y, "#646768", "#74e448")
  }

  shapes[x][y].draw(ctx)
}

function findClickedShapePosition(mouseX, mouseY) {
  let rect = canvas.getBoundingClientRect();
  let x = Math.floor((mouseX - rect.left) / shapeWidth);
  let y = Math.floor((mouseY - rect.top) / shapeWidth);
  return { x, y }
}
