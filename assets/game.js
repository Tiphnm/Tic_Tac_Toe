////////////  GAME ZONE  ////////////////
function $(element) {
  return document.querySelector(element);
}
let gameTable = $(".gametable");
let elements = document.querySelectorAll(".element");
let n = Math.floor(Math.random() * 10);
let player_1 = false;
let who_play = "";

for (const element of elements) {
  element.addEventListener("click", (e) => {
    let value = element.querySelector("span");
    if (!player_1) {
      value.innerText = "X";
      player_1 = true;
    } else {
      value.innerText = "O";
      player_1 = false;
    }
    is_winner();
  });
}

function cell(n) {
  return elements[n].querySelector("span").innerText;
}

function is_winner() {
  let players = ["X", "O"];
  players.forEach((player) => {
    if (cell(0) == player && cell(1) == player && cell(2) == player) {
      alert("You won !");
    } else if (cell(4) == player && cell(5) == player && cell(6) == player) {
      alert("You won !");
    } else {
      console.log(elements[0].querySelector("span"));
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
