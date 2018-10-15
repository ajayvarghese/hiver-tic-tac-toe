/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 *
 * Winner has to be decided and has to be flashed
 *
 * Extra points will be given for the Creativity
 *
 * Use of Google is not encouraged
 *
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = "X";

let count = 0;

const classes = {
  win: "win",
  lose: "lose",
  tie: "tie"
};

function initializeGrid() {
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    const tempArray = [];
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      tempArray.push(0);
    }
    grid.push(tempArray);
  }
}

function getRowBoxes(colIdx) {
  let rowDivs = "";

  for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
    let additionalClass = "darkBackground";
    let content = "";
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      additionalClass = "lightBackground";
    }
    const gridValue = grid[colIdx][rowIdx];
    if (gridValue === 1) {
      content = '<span class="cross">X</span>';
    } else if (gridValue === 2) {
      content = '<span class="cross">O</span>';
    }
    rowDivs =
      rowDivs +
      '<div colIdx="' +
      colIdx +
      '" rowIdx="' +
      rowIdx +
      '" class="box ' +
      additionalClass +
      '">' +
      content +
      "</div>";
  }
  return rowDivs;
}

function getColumns() {
  let columnDivs = "";
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    let coldiv = getRowBoxes(colIdx);
    coldiv = '<div class="rowStyle">' + coldiv + "</div>";
    columnDivs = columnDivs + coldiv;
  }
  return columnDivs;
}

function renderMainGrid() {
  const parent = document.getElementById("grid");
  const columnDivs = getColumns();
  parent.innerHTML = '<div class="columnsStyle">' + columnDivs + "</div>";
}

function showTieMessage() {
  populateResult("Tie", classes.tie);
}

function populateResult(msg, classN) {
  const resultEl = document.getElementById("result");
  const resultTextEl = document.getElementById("resultText");
  resultTextEl.innerHTML = msg;
  resultTextEl.classList.add(classN);
  resultEl.style.display = "flex";
  initializeGrid();
  count = 0;
}

function declareWinner({ result, value }) {
  if (value === 1) populateResult("BRAVO.. You Won", classes.win);
  else populateResult("You Lose", classes.lose);
}

function checkWinCombos(value) {
  let combo = null;
  console.log(grid, value, [grid[0][0], grid[0][1], grid[0][2]]);
  switch (true) {
    case [grid[0][0], grid[0][1], grid[0][2]].every(i => i === value):
      combo = [[0, 0], [0, 1], [0, 2]];
      return [[0, 0], [0, 1], [0, 2]];
      break;
    case [grid[1][0], grid[1][1], grid[1][2]].every(i => i === value):
      combo = [[1, 0], [1, 1], [1, 2]];
      return [[1, 0], [1, 1], [1, 2]];
      break;
    case [grid[2][0], grid[2][1], grid[2][2]].every(i => i === value):
      combo = [[2, 0], [2, 1], [2, 2]];
      return [[2, 0], [2, 1], [2, 2]];
      break;
    case [grid[0][0], grid[1][0], grid[2][0]].every(i => i === value):
      combo = [[0, 0], [1, 0], [2, 0]];
      return [[0, 0], [1, 0], [2, 0]];
      break;
    case [grid[0][1], grid[1][1], grid[2][1]].every(i => i === value):
      combo = [[0, 1], [1, 1], [2, 1]];
      return [[0, 1], [1, 1], [2, 1]];
      break;
    case [grid[0][2], grid[1][2], grid[2][2]].every(i => i === value):
      combo = [[0, 2], [1, 2], [2, 2]];
      return [[0, 2], [1, 2], [2, 2]];
      break;
    case [grid[0][0], grid[1][1], grid[2][2]].every(i => i === value):
      combo = [[0, 0], [1, 1], [2, 2]];
      return [[0, 0], [1, 1], [2, 2]];
      break;
    case [grid[2][0], grid[1][1], grid[0][2]].every(i => i === value):
      combo = [[2, 0], [1, 1], [0, 2]];
      return [[2, 0], [1, 1], [0, 2]];
      break;
  }
  return null;
}

function checkGameStatus(value) {
  let result = null,
    combo = null;
  result = checkWinCombos(value);
  console.log("Count", count);

  if (result) {
    declareWinner({ result, value });
    return true;
  }

  if (count === 9) {
    showTieMessage();
    return true;
  }
  return false;
}

function compTurn(value) {
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    let flag = false;
    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
      if (grid[colIdx][rowIdx] === 0) {
        grid[colIdx][rowIdx] = value;
        count++;
        const gameOver = checkGameStatus(value);
        flag = true;
        break;
      }
    }
    if (flag) break;
  }
}

function onBoxClick() {
  var rowIdx = this.getAttribute("rowIdx");
  var colIdx = this.getAttribute("colIdx");
  if (grid[colIdx][rowIdx] === 0) {
    let newValue = 1;
    console.log("GRID", grid);
    grid[colIdx][rowIdx] = newValue;
    count++;
    const gameOver = checkGameStatus(newValue);
    if (!gameOver) {
      compTurn(2);
    }

    renderMainGrid();
    addClickHandlers();
  }
}

function addClickHandlers() {
  var boxes = document.getElementsByClassName("box");
  for (var idx = 0; idx < boxes.length; idx++) {
    boxes[idx].addEventListener("click", onBoxClick, false);
  }
}

function init() {
  initializeGrid();
  renderMainGrid();
  addClickHandlers();
  document.getElementById("result").style.display = "none";
}

init();

document.getElementById("playBtn").addEventListener("click", () => {
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      grid[colIdx][rowidx] = 0;
    }
  }
  renderMainGrid();
  addClickHandlers();
  document.getElementById("result").style.display = "none";
  document
    .getElementById("resultText")
    .classList.remove(classes.win, classes.lose, classes.tie);
});
