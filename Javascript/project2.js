var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
 
var grid = 16;
var count = 0;

var snake = {
x: 160,
y: 160,

// snake velocity. moves in either the x or y direction//
dx: grid,
dy: 0,


cells: [],

// snake growth//
maxCells: 4
};
var apple = {
x: 320,
y: 320
};


function getRandomInt(min, max) {
return Math.floor(Math.random() * (max - min)) + min;
}

// game loop//
function loop() {
requestAnimationFrame(loop);

if (++count < 4) {
  return;
}

count = 0;
context.clearRect(0,0,canvas.width,canvas.height);

// move snake //
snake.x += snake.dx;
snake.y += snake.dy;

// wrap snake position horizontally//
if (snake.x < 0) {
  snake.x = canvas.width - grid;
}
else if (snake.x >= canvas.width) {
  snake.x = 0;
}

// wrap snake position vertically//
if (snake.y < 0) {
  snake.y = canvas.height - grid;
}
else if (snake.y >= canvas.height) {
  snake.y = 0;
}

// keep track of where snake has been. front is always the head//
snake.cells.unshift({x: snake.x, y: snake.y});


if (snake.cells.length > snake.maxCells) {
  snake.cells.pop();
}

// apple//
context.fillStyle = 'red';
context.fillRect(apple.x, apple.y, grid-1, grid-1);

// snake //
context.fillStyle = 'green';
snake.cells.forEach(function(cell, index) {

  // helps see growth of snake//
  context.fillRect(cell.x, cell.y, grid-1, grid-1);

  // snake eats apple//
  if (cell.x === apple.x && cell.y === apple.y) {
    snake.maxCells++;

    // canvas is 25 x 25 grid //
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
  }

  // collision checker//
  for (var i = index + 1; i < snake.cells.length; i++) {

    // if snake touches itself. reset game//
    if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
      snake.x = 160;
      snake.y = 160;
      snake.cells = [];
      snake.maxCells = 4;
      snake.dx = grid;
      snake.dy = 0;

      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
  }
});
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function(e) {
// prevent snake from backtracking on itself by checking that it's
// not already moving on the same axis (pressing left while moving
// left won't do anything, and pressing right while moving left
// shouldn't let you collide with your own body)

// left arrow key
if (e.which === 37 && snake.dx === 0) {
  snake.dx = -grid;
  snake.dy = 0;
}
// up arrow key
else if (e.which === 38 && snake.dy === 0) {
  snake.dy = -grid;
  snake.dx = 0;
}
// right arrow key
else if (e.which === 39 && snake.dx === 0) {
  snake.dx = grid;
  snake.dy = 0;
}
// down arrow key
else if (e.which === 40 && snake.dy === 0) {
  snake.dy = grid;
  snake.dx = 0;
}
});

// start the game
requestAnimationFrame(loop);
   
  