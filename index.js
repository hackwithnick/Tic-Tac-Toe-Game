let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnX = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [2, 4, 6],
];

const enableButtons = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#ffffc7";
    box.style.color = "rgb(61, 59, 59)";
  }
};

const disableButtons = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const resetGame = () => {
  turnX = true;
  enableButtons();
  msgContainer.classList.add("hide");
  count = 0;
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, the winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableButtons();
};
const drawMatch = () => {
  msg.innerText = "The match is drawn!";
  msgContainer.classList.remove("hide");
  disableButtons();
};

const winColors = (box1, box2, box3) => {
  box1.style.backgroundColor = "green";
  box2.style.backgroundColor = "green";
  box3.style.backgroundColor = "green";
  box1.style.color = "white";
  box2.style.color = "white";
  box3.style.color = "white";
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val == pos3Val) {
        winColors(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);
        showWinner(pos1Val);
      } else if (count === 9) {
        drawMatch();
      }
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turnX === true ? "X" : "O";
    box.style.backgroundColor = "#F0EBD8";
    turnX = !turnX;
    box.disabled = true;
    count++;

    checkWinner();
  });
});

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
