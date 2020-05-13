const canvas_size = 400;

const size = 19;
const cell_size = canvas_size/size;

let board = Array(size).fill().map(() => Array(size).fill().map(() => [null, true, true]))

function setup() {
  createCanvas(canvas_size, canvas_size);
  background(232, 179, 88);
  drawBoard();
}

function drawBoard() {
  background(232, 179, 88);
  
  stroke(0);
  strokeWeight(1);
  for (let x = 0; x < size; x++) {
    line(x*cell_size+(cell_size/2), cell_size/2, x*cell_size+(cell_size/2), canvas_size-(cell_size/2))
  }
  for (let y = 0; y < size; y++) {
    line(cell_size/2, y*cell_size+(cell_size/2), canvas_size-(cell_size/2), y*cell_size+(cell_size/2))
  }
  
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const cell = board[x][y];
      if (cell[0] === 'black') {
        strokeWeight(1);
        fill(0);
        ellipse(x*cell_size+(cell_size/2), y*cell_size+(cell_size/2), cell_size*0.9);
      }
      else if (cell[0] === 'white') {
        strokeWeight(1);
        fill(255);
        ellipse(x*cell_size+(cell_size/2), y*cell_size+(cell_size/2), cell_size*0.9);
      }
    }
  }
}

function isGroupAlive(x, y) {
  let stack = [];
  let alive = false;
  
  const check = (x, y) => {
    stack.push([x, y].toString());
    let cell = board[x][y];
    
    if (x !== 0 && board[x-1][y][0] === null) alive = true;
    else if (x !== 0 && board[x-1][y][0] === cell[0] && stack.includes([x-1, y].toString)) check(x-1, y);
    
    if (x !== size-1 && board[x+1][y][0] === null) alive = true;
    else if (x !== size-1 && board[x+1][y][0] === cell[0] && stack.includes([x+1, y].toString)) check(x+1, y);
    
    if (y !== 0 && board[x][y-1][0] === null) alive = true;
    else if (y !== 0 && board[x][y-1][0] === cell[0] && stack.includes([x, y-1].toString)) check(x, y-1);
    
    if (y !== size-1 && board[x][y+1][0] === null) alive = true;
    else if (y !== size-1 && board[x][y+1][0] === cell[0] && stack.includes([x, y+1].toString)) check(x, y+1);
  }
  
  check(x, y);
  return alive;
}

function updateBoard(x, y) {
  isGroupAlive(x, y);
}

let current_player = 'black';

function mousePressed() {
  let clicked_cell = board[Math.floor(mouseX/cell_size)][Math.floor(mouseY/cell_size)];
  if (!clicked_cell[0]) {
    clicked_cell[0] = current_player;
    current_player = (current_player == 'black') ? 'white' : 'black';
    drawBoard();
    updateBoard(Math.floor(mouseX/cell_size), Math.floor(mouseY/cell_size));
  }
}
