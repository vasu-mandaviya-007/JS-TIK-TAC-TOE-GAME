

////////////////////////////////////////////////// WELCOME PAGE JS START  //////////////////////////////////////////////////


let input_box = document.querySelectorAll(".input-box");
let errors = document.querySelectorAll(".error");
let players = document.querySelectorAll(".player");
let label = document.querySelectorAll(".icon i");
 

let player1 = "player1";
let player2 = "player2";

players.forEach((player, index) => {

    player.addEventListener("keyup", () => {

        pattern = /^[a-zA-Z]{3,}/;

        if (player.value.match(pattern)) {
            input_box[index].style.outline = "3px solid rgb(15, 189, 56)";
            errors[index].innerHTML = "";
            label[index].classList.replace("fa-user", "fa-circle-check")
        }

        if (!(player.value.match(pattern)) || player.value == "") {
            input_box[index].style.outline = "3px solid red";
            errors[index].innerHTML = "Please Enter Valid Name";
            label[index].classList.replace("fa-circle-check", "fa-user")
        }

        if (player.value == "") {
            input_box[index].style.outline = "none";
            errors[index].innerHTML = "";
        }

        if (index == 0) {
            player1 = player.value;
        } else {
            player2 = player.value;
        }

        if (player1 == player2) {
            input_box[index].style.outline = "3px solid red";
            label[index].classList.replace("fa-circle-check", "fa-user")
            errors[index].innerHTML = "Name Cannot Be Same";
            if (index == 0) {
                player1 = player.value;
            } else {
                player2 = player.value;
            }
        }
    });


    player.addEventListener("focus", () => {
        if (player.value == "") {
            input_box[index].style.outline = "3px solid black";
        }
    });

    player.addEventListener("blur", () => {
        if (player.value == "") {
            input_box[index].style.outline = "none";
        }
    });

});

let Start = document.querySelector(".start-page");
let Container = document.querySelector(".container");

document.querySelector(".skip-btn").addEventListener("click", () => {
    Start.classList.add("hide");
    Container.classList.remove("hide");
});

function StartGame() {
    Start.classList.add("hide");
    Container.classList.remove("hide");
}


////////////////////////////////////////////////// WELCOME PAGE JS OVER  //////////////////////////////////////////////////



let boxes = document.querySelectorAll(".btn");
let resetButton = document.getElementById("reset-btn");

let TurnO = true;
let TurnX = false;

let WiningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let count = 0;

boxes.forEach(box => {
    box.addEventListener("click", () => {
        // console.log(this);
        if (TurnO) {
            box.innerText = "X";
            TurnO = false;
            count++;
        } else {
            box.innerText = "O";
            TurnX = false;
            TurnO = true;
            count++;
        }
        box.disabled = true;
        resetButton.style.display = "block";
        checkWinner();
    });
})


const Draw = () => {
    if (count == 9) {
        winner_msg.innerHTML = "Draw";
        WinnerBox.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
        overlay.classList.add("overlay");
    }
}


let WinnerBox = document.getElementById("winner");
let winner_msg = document.querySelector(".winner-msg");
let overlay = document.getElementById("overlay");


const checkWinner = () => {
    for (let pattern of WiningPattern) {

        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                ShowWinner(pos1Val);
                break;
            } else {
                Draw()
            }
        }
    }
}


// SHOW WHO IS WINNER

function ShowWinner(winner) {

    if (winner == "O") {
        winner = player1;
    }
    if (winner == "X") {
        winner = player2;
    }

    winner_msg.innerHTML = "Congratulations " + winner + ", You Are Winner";
    WinnerBox.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    overlay.classList.add("overlay");

    disabledBtn();

}

const disabledBtn = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const EnableBtn = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerHTML = "";
    }
}


// RESET GAME BUTTON

resetButton.addEventListener("click", () => {
    TurnO = true;
    TurnX = false;
    EnableBtn();
    count = 0;
});


// NEW GAME BUTTON

let NewGame = document.getElementById("newgame");
NewGame.addEventListener("click", () => {
    TurnO = true;
    TurnX = false;
    count = 0;
    overlay.classList.remove("overlay");
    WinnerBox.style.clipPath = "polygon(0 0, 100% 0, 100% 0, 0 0)";
    EnableBtn();
});