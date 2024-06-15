const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const newGameBtn = document.querySelector(".newGame");
let msgContainer = document.querySelector(".msg");
let msg = document.querySelector("#win-msg");

let turnX = true;
let count = 0;

const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnX) {
                box.innerText = "X";
                box.classList.add("glow"); // Apply glow1 class for X
                turnX = false;
            } else {
                box.innerText = "O";
                box.classList.add("glow2"); // Apply glow2 class for O
                turnX = true;
            }
            count++;
            box.disabled = true;
            checkWinner();
        }
    });
});
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("glow","glow2");
    }
}

const showWinner = (winner) => {
    msg.innerText = `${winner} Won the Game !!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    count = 0;

}

const checkWinner = () => {
    let pos1, pos2, pos3;
    for (const pattern of winPatterns) {
        pos1 = boxes[pattern[0]].innerText;
        pos2 = boxes[pattern[1]].innerText;
        pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return; // Exit the function early if there's a winner
            }
        }
    }
    if (count === 9) {
        gameDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const gameDraw = () => {
    msg.innerText = "It's a Tie !!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    count = 0;
}
