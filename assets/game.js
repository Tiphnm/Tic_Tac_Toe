////////////  GAME ZONE  ////////////////
function $(element) {
  return document.querySelector(element);
}
let gameTable = $(".gametable");
let elements = document.querySelectorAll(".element");
let n = Math.floor(Math.random() * 10);
let player_1 = false;
let who_play = "";
var gameIsOn = true;
// audio objs
player_x = new Audio("./assets/audio/xplayer.mp3");
player_o = new Audio("./assets/audio/oplayer.mp3");

for (const element of elements) {
  element.addEventListener("click", (e) => {
    let value = element.querySelector("span");
    if (value.innerText == "") {
      if (!player_1) {
        value.classList.add("animation");
        value.innerText = "X";
        player_x.play();
        player_1 = true;
        is_winner();
      } else {
        value.classList.add("animation");
        value.innerText = "O";
        player_1 = false;
        player_o.play();
        is_winner();
      }
    }
  });
}

function cell(n) {
  return elements[n].querySelector("span").innerText;
}

function is_winner() {
  let winning_combinations = [
    [cell(0), cell(1), cell(2)],
    [cell(3), cell(4), cell(5)],
    [cell(6), cell(7), cell(8)],
    [cell(0), cell(3), cell(6)],
    [cell(1), cell(4), cell(7)],
    [cell(2), cell(5), cell(8)],
    [cell(0), cell(4), cell(8)],
    [cell(6), cell(4), cell(2)],
  ];
  let player_x = ["X", "X", "X"];
  let player_o = ["O", "O", "O"];
  winning_combinations.forEach((combination) => {
    if (arraysEqual(combination, player_x)) {
      print_winner();
    }
    if (arraysEqual(combination, player_o)) {
      alert("win");
    }
  });
}

function arraysEqual(a, b) {
  if (JSON.stringify(a) == JSON.stringify(b)) {
    return true;
  } else {
    return false;
  }
}

function print_winner() {
  elements.forEach((element) => {
    let player = element.querySelector("span");
    if (player.innerText == "X") {
      player.classList.add("rouge");
    }
  });
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
