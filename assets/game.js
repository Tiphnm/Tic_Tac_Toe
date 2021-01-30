////////////  GAME ZONE  ////////////////
const elements = document.querySelectorAll(".element");
let player_1 = false;
var gameIsOn = true;
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

let playerMoves = [];
const table = [[], [], []];
// audio objs
player_x = new Audio("./assets/audio/xplayer.mp3");
player_o = new Audio("./assets/audio/oplayer.mp3");

if (gameIsOn) {
  init_event();
}

function init_event() {
  for (const element of elements) {
    element.addEventListener("click", ticTacToe_solo, false);
  }
}

function ticTacToe(input) {
  let value = input.target.querySelector("span");
  console.log(value);
  if (value.innerText == "") {
    if (!player_1) {
      value.classList.add("animation");
      value.innerText = "X";
      player_x.play();
      player_1 = true;
    } else {
      value.classList.add("animation");
      value.innerText = "O";
      player_1 = false;
      player_o.play();
    }
    is_winner();
  }
  console.log(gameIsOn);
}

function fill_table(player_move, symbol) {
  if (player_move < 3) {
    table[0].push(symbol);
  }
}

function ticTacToe_solo(input) {
  let value = input.target.querySelector("span");
  if (value.innerText == "") {
    if (!player_1) {
      value.classList.add("animation");
      value.innerText = "X";
      player_x.play();
      player_1 = true;
    }
    if (player_1) {
      free_spaces = [];
      // the player has played what?
      let player_move = parseInt(input.target.id);
      playerMoves.push(player_move);
      //fill_table(player_move, "X");
      console.log("Player moves so far: " + playerMoves);
      // what combinations are related to that move
      // function ia(player_last_move)
      // now that we have only two posibilites, lets play the first one
      // lets verify if the space is empty
      const last_move = playerMoves[playerMoves.length - 1];
      console.log("player last move is:" + last_move);

      /*    do {
        free_spaces = ia(last_move);
      } while (free_spaces == []);

      console.log("------------");
      console.log(free_spaces);
      console.log("------------");
 */
      computerPlay(last_move);
    }
    is_winner();
  }
}

function computerPlay(last_move) {
  do {
    free_spaces = ia(last_move);
  } while (free_spaces == []);
  // we have two spaces left in our strategy
  let one = free_spaces[0];
  let two = free_spaces[1];
  if (cell(one) == "") {
    let play = setTimeout(() => {
      iaFillSpace(one);
    }, 1000);
    player_1 = false;
  } else if (cell(two) == "") {
    let play = setTimeout(() => {
      iaFillSpace(two);
    }, 1000);
    player_1 = false;
  } else {
    // When both of the free spaces of the selected strategy are busy, we betters
    //select another strategy
    console.log("i better think another thing");
  }
}

// -------------- IA SELECT STRATEGY ---------
function ia(player_last_move) {
  // include maybe player move
  let iaCombinations = winning_combinations.filter((combination) => {
    return combination.includes(player_last_move);
  });

  // now we have all the N posible combinations for the
  // player if he wants to win
  let numberOfCombinations = iaCombinations.length;
  console.log("The player can win in this " + numberOfCombinations + " ways");
  console.log(iaCombinations);

  let selectedCombination;
  let free_spaces;
  for (i = 0; i < numberOfCombinations; i++) {
    selectedCombination = iaCombinations[i];
    console.log("nepe" + selectedCombination);
    free_spaces = selectedCombination.filter((spaces) => {
      if (spaces != player_last_move && cell(spaces) == "") {
        return spaces;
      }
    });
  }
  // 3 or 4 winning combinations lets pick a random one
  let n = Math.floor(Math.random() * numberOfCombinations);
  console.log("im selecting the strategy number " + n);
  // Now we have selected one combination of 3 numbers
  //let selectedCombination = iaCombinations[n];
  // one of them includes the number of the player, so we have two spaces left.
  // lets filter and return those 2 free spaces

  //let free_spaces = selectedCombination.filter((spaces) => {
  /*     if (spaces !== player_last_move && cell(spaces) == "") {
      return spaces;
    } else {
      do {
        m = Math.floor(Math.random() * numberOfCombinations);
      } while (m != n);
      selectedCombination = iaCombinations[m];
      if (spaces !== player_last_move && cell(spaces) == "") {
        return spaces;
      }
    }
  });
 */
  if (free_spaces == []) {
    console.log("i must to something");
  }
  return free_spaces;
}

function iaFillSpace(space) {
  elements[space].querySelector("span").innerText = "O";
  elements[space].querySelector("span").classList.add("animation");
  player_1 = false;
  player_o.play();
}

// --------- END OF IA SELECT STRATEGIE ---------

function kill_event() {
  for (const element of elements) {
    element.removeEventListener("click", ticTacToe, { capture: false });
  }
}

function cell(n) {
  try {
    return elements[n].querySelector("span").innerText;
  } catch (TypeError) {
    return false;
  }
}

function is_winner() {
  let player_x = ["X", "X", "X"];
  let player_o = ["O", "O", "O"];

  winning_combinations.forEach((combination) => {
    winning_cells = [
      cell(combination[0]),
      cell(combination[1]),
      cell(combination[2]),
    ];
    if (arraysEqual(winning_cells, player_x)) {
      // alert("win");
      print_winner(combination, "x");
      // KILL THE EVENT
      return true;
    }
    if (arraysEqual(winning_cells, player_o)) {
      print_winner(combination, "o");
      alert("win");
      return true;
    }
  });

  return false;
}

function arraysEqual(a, b) {
  if (JSON.stringify(a) == JSON.stringify(b)) {
    return true;
  } else {
    return false;
  }
}

function print_winner(winnerArray, symbol) {
  for (i = 0; i < 3; i++) {
    elements[winnerArray[i]].classList.add("rouge");
  }
  gameIsOn = false;
  kill_event();
  let my_div = document.querySelector(".winner");
  let my_p = document.createElement("p");
  my_p.innerText = "The winner is " + symbol;
  my_div.appendChild(my_p);
}

/* function computer_turn() {
  let n = Math.floor(Math.random() * 10);
  console.log(elements[n]);
  elementValue = elements[n].querySelector("span");

  array.forEach((element) => {});

  if (elementValue.innerText == "") {
    elementValue.innerText = "O";
  } else {
    let n = Math.floor(Math.random() * 10);
    computer_turn(n);
  }
} */

//////////// END OF  GAME ZONE  ////////////////

/// GAMERS FORM ////

//btnPlay = document.querySelector()
