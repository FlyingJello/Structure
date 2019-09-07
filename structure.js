class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Shape {
  constructor(x, y, mainColor, offColor) {
    this.pos = new Point(x, y);
    this.mainColor = mainColor;
    this.offColor = offColor;
    this.origin = new Point(x * shapeWidth, y * shapeWidth);
    this.right = new Point(x * shapeWidth + shapeWidth, y * shapeWidth);
    this.bottom = new Point(x * shapeWidth, y * shapeWidth + shapeWidth);
    this.center = new Point(x * shapeWidth + (shapeWidth / 2), y * shapeWidth + (shapeWidth / 2));
  }

  rotate() {
    this.origin = rotateClockwise(this.center, this.origin);
    this.right = rotateClockwise(this.center, this.right);
    this.bottom = rotateClockwise(this.center, this.bottom);
  }

  draw(context) {
    context.fillStyle = this.offColor;
    context.fillRect(this.pos.x * shapeWidth, this.pos.y * shapeWidth, shapeWidth, shapeWidth);
  }
}

class Square extends Shape {
  constructor(x, y, mainColor, offColor) {
    super(x, y, mainColor, offColor);
  }

  draw(context) {
    context.fillStyle = this.mainColor;
    context.fillRect(this.pos.x * shapeWidth, this.pos.y * shapeWidth, shapeWidth, shapeWidth);
  }
}

class Circle extends Shape {
  constructor(x, y, mainColor, offColor) {
    super(x, y, mainColor, offColor);
    this.origin = new Point(x * shapeWidth + (shapeWidth / 2), y * shapeWidth + (shapeWidth / 2));
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.radius = shapeWidth / 2;
  }

  rotate() {
    super.rotate();
    this.startAngle += 0.5 * Math.PI;
    this.endAngle += 0.5 * Math.PI;
  }

  draw(context) {
    super.draw(context);

    context.fillStyle = this.mainColor;
    context.beginPath();
    context.moveTo(this.origin.x, this.origin.y);
    context.arc(this.origin.x, this.origin.y, this.radius, this.startAngle, this.endAngle);
    context.moveTo(this.origin.x, this.origin.y);
    context.fill();
  }
}

class HalfCircle extends Circle {
  constructor(x, y, mainColor, offColor) {
    super(x, y, mainColor, offColor);
    this.origin = new Point(x * shapeWidth + (shapeWidth / 2), y * shapeWidth);
    this.endAngle = Math.PI;
  }
}

class QuarterCircle extends Circle {
  constructor(x, y, mainColor, offColor) {
    super(x, y, mainColor, offColor);
    this.origin = new Point(x * shapeWidth, y * shapeWidth);
    this.endAngle = 0.5 * Math.PI;
    this.radius = shapeWidth;
  }
}

class Triangle extends Shape {
  constructor(x, y, mainColor, offColor) {
    super(x, y, mainColor, offColor);
    this.right = new Point(x * shapeWidth + shapeWidth, y * shapeWidth + (shapeWidth / 2));
  }

  draw(context) {
    super.draw(context);

    context.fillStyle = this.mainColor;
    context.beginPath();
    context.moveTo(this.origin.x, this.origin.y);
    context.lineTo(this.right.x, this.right.y);
    context.lineTo(this.bottom.x, this.bottom.y);
    context.fill();
  }
}

class RightTriangle extends Triangle {
  constructor(x, y, mainColor, offColor) {
    super(x, y, mainColor, offColor);
    this.right = new Point(x * shapeWidth + shapeWidth, y * shapeWidth);
  }

  draw(context) {
    super.draw(context);
  }
}

function init() {  
  canvas.onclick = onCanvasClick;
  canvas.addEventListener('contextmenu', onCanvasClick);
  
  setupShapes();
  createBoard();
}

function setupShapes() {
  let shapes = document.getElementsByClassName("shape");
  document.querySelectorAll('.shape').forEach(shape => shape.onclick = onShapeSelection);
}

function onShapeSelection(event) {
  document.querySelectorAll('.shape').forEach(shape => shape.style.backgroundColor = neutralColor);
  event.target.style.backgroundColor = document.getElementById("primary").style.backgroundColor;
  selectedShape = event.target.id;
}

function createBoard() {
  let primaryColor = document.getElementById("primary").style.backgroundColor;
  let secondaryColor = document.getElementById("secondary").style.backgroundColor;

  board = [...Array(width).keys()].map(x => Array(height));
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      board[i][j] = new Square(i, j, secondaryColor, primaryColor);
      board[i][j].draw(ctx);
    }
  }
}

function onCanvasClick(event) {
  let { x, y } = findClickedShapePosition(event.clientX, event.clientY);
  let primaryColor = document.getElementById("primary").style.backgroundColor;
  let secondaryColor = document.getElementById("secondary").style.backgroundColor;

  if (event.which === 3) {
    board[x][y].rotate();
  }
  else {
    if (board[x][y] instanceof shapes[selectedShape]) {
      board[x][y].mainColor = primaryColor;
      board[x][y].offColor = secondaryColor;
    }
    else {
      board[x][y] = new shapes[selectedShape](x, y, primaryColor, secondaryColor)
    }
  }

  board[x][y].draw(ctx)
  event.preventDefault();
}

function findClickedShapePosition(mouseX, mouseY) {
  let rect = canvas.getBoundingClientRect();
  let x = Math.floor((mouseX - rect.left) / shapeWidth);
  let y = Math.floor((mouseY - rect.top) / shapeWidth);
  return { x, y }
}

function rotateClockwise(origin, point) {
  let deltaX = point.x - origin.x;
  let deltaY = point.y - origin.y;

  return {
    x: 0 - deltaY + origin.x,
    y: deltaX + origin.y
  }
}

const width = height = 5;
const windowSize = 800;
const shapeWidth = windowSize / width;
const neutralColor = "#38404e";
let board;

const shapes = {
  Square: Square,
  Triangle: Triangle,
  RightTriangle: RightTriangle,
  Circle: Circle,
  HalfCircle: HalfCircle,
  QuarterCircle: QuarterCircle
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let selectedShape = "Square";

document.addEventListener('DOMContentLoaded', init, false);