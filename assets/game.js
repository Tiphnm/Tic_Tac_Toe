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

function ticTacToe_solo(input) {
  let value = input.target.querySelector("span");
  console.log(input.target.id);
  if (value.innerText == "") {
    if (!player_1) {
      value.classList.add("animation");
      value.innerText = "X";
      player_x.play();
      player_1 = true;
    }

    if (player_1) {
      // the player has played what?
      let player_move = parseInt(input.target.id);
      // what combinations are related to that move
      let iaCombinations = winning_combinations.filter((combination) => {
        return combination.includes(player_move);
      });
      // now we have all the N posible combinations for the
      // player if he wants to win
      let numberOfCombinations = iaCombinations.length;
      console.log(iaCombinations);
      // seven winning combinations
      let n = Math.floor(Math.random() * 7);
      //console.log(winning_combinations[n]);
      let combination = winning_combinations[n];
      // select one of them ex: 0,4,8
      //console.log(combination);
      while (player_1) {
        if (cell(combination[0]) == "") {
          elements[combination[0]].querySelector("span").innerText = "O";
          player_1 = false;
        } else if (cell(combination[1]) == "") {
          elements[combination[1]].querySelector("span").innerText = "O";
          player_1 = false;
        } else if (cell(combination[2]) == "") {
          elements[combination[0]].querySelector("span").innerText = "O";
          player_1 = false;
        } else {
          n = Math.floor(Math.random() * 7);
        }
      }
    }
    /* else {
       value.classList.add("animation");
      value.innerText = "O";
      player_1 = false;
      player_o.play(); 
    } */
    is_winner();
  }
  // console.log(gameIsOn);
}

function kill_event() {
  for (const element of elements) {
    element.removeEventListener("click", ticTacToe, { capture: false });
  }
}

function cell(n) {
  return elements[n].querySelector("span").innerText;
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

//btnPlay = document.querySelector();
