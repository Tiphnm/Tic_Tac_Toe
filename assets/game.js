function $(element) {
  return document.querySelector(element);
}
let gameTable = $(".gametable");
let elements = document.querySelectorAll(".element");

for (const element of elements) {
  element.addEventListener("click", (e) => {
    console.log(e.target);
    let value = e.target.querySelector("span");
    value.innerText = "X";
  });
}
