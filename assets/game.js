var gameTable = [];
const human = "O";
const ai = "X";
const winingCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const elements = document.querySelectorAll(".element");
// make a digital board
for (i = 0; i < 9; i++) {
  gameTable.push(i);
}
// ---------- Game start function ---------------
gameOn();

function gameOn() {
  // game over message
  document.querySelector(".endgame").style.display = "none";
  for (i = 0; i < elements.length; i++) {
    elements[i].innerText = "";
    // remove the color of the winner
    elements[i].classList.remove("background-color");
    elements[i].addEventListener("click", ticTacToe, false);
  }
}

function ticTacToe(event) {
  // check if the square is free, otherwise you cannot click in a played cell
  // game table is filled with numbers at the start, but replaced by string each turn
  if (typeof gameTable[event.target.id] == "number") {
    //Execute the turn function for a CLIC as human play and WHERE is clicked;
    turn(event.target.id, human);
    // null game means tie, so is THERE IS NOT A TIE, the computer will play
    if (!nullgame()) {
      // then ai will play in the best option square
      turn(bestOption(), ai);
    }
  }
}

// each player have a TURN to put and X or an O in the GAMETABLE BOARD
function turn(cellId, player) {
  gameTable[cellId] = player;
  document.querySelector(`#${CSS.escape(cellId)}`).innerText = player;
  console.log(gameTable);
  let isGameWon = checkForWinner(gameTable, player);
  // if game won is not null, then  execute game is over and transfer who won.
  if (isGameWon) {
    gameOver(isGameWon);
  }
}

function checkForWinner(board, player) {
  // just make a list of the human play, in wich index of element?
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  console.log(plays);
  // game won by default is null... unless
  let gameWon = null;
  // check for the index and who won. using constant desconstruction
  // loop for all every win combinantions and check if PLAYS is one of them
  for (let [index, win] of winingCombinations.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      // return who won?  player, index is the WINNING COMBINATION that made that player win
      gameWon = { index: index, player: player };
      break;
    }
  }
  //console.log(gameWon);
  return gameWon;
}

function gameOver(gameWon) {
  // get the winner combination of game won and select from the combinations
  for (let index of winingCombinations[gameWon.index]) {
    // if the human won , put a blue background in those elements
    document.querySelector(`#${CSS.escape(index)}`).style.backgroundColor =
      gameWon.player == human ? "blue" : "red";
  }
  // as the game is over, Kill the event click
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeEventListener("click", ticTacToe, false);
  }
  if (gameWon.player == human) {
    printWinner("You win");
  } else {
    printWinner("You loose");
  }
}

// print the winner
function printWinner(winner) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".text").innerText = winner;
}

// check what are the spaces/cells that are free to play (for the AI)
function freeCells() {
  let freeCelltoPlay = gameTable.filter((free) => {
    if (typeof free == "number") {
      // if the values of the arrays are numbers it means that is a free spot
      return free;
    }
  });
  //console.log(freeCelltoPlay);
  return freeCelltoPlay;
}

//
function bestOption() {
  // call the  min max function and return the index of the board that the ai should play in
  return minimax(gameTable, ai).index;
}

function nullgame() {
  if (freeCells().length == 0) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.backgroundColor = "green";
      elements[i].removeEventListener("click", ticTacToe, false);
    }
    printWinner("Tie game!");
    return true;
  }
  return false;
}

/// Start of min-max function ///

function minimax(newGameTable, player) {
  var availSpots = freeCells();

  if (checkForWinner(newGameTable, human)) {
    return { score: -10 };
  } else if (checkForWinner(newGameTable, ai)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  var moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newGameTable[availSpots[i]];
    newGameTable[availSpots[i]] = player;

    if (player === ai) move.score = minimax(newGameTable, human).score;
    else move.score = minimax(newGameTable, ai).score;
    newGameTable[availSpots[i]] = move.index;
    if (
      (player === ai && move.score === 10) ||
      (player === human && move.score === -10)
    )
      return move;
    else moves.push(move);
  }

  let bestMove, bestScore;
  if (player === ai) {
    bestScore = -1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    bestScore = 1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

// end of Min-max function
