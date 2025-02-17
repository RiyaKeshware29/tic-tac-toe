const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function updateGameInfo() {
    const color = (currentPlayer === "X") ? "#f5ce41" : "#3182e5"; // Orange for X, Blue for O
    gameInfo.innerHTML = `Current Player -  <span class="player" style="color:${color};"> ${currentPlayer}</span>`;
}

// Intialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) =>{
        box.innerHTML = "";
        box.style.pointerEvents = "all";
        box.classList.remove('win');
    })
    updateGameInfo();
    newGameBtn.classList.remove('active');
}
initGame();


function swapTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    updateGameInfo();
}

function checkGameOver() {
    let winner;
    // all 3 boxes should non-empty and same
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && 
        (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){
            
            // Check winner
            if(gameGrid[position[0]] === "X"){
                winner = "X";
            }else{
                winner = "O";
            }

            boxes.forEach((box,index) =>{
                box.style.pointerEvents = "none";
            })

            // Now we know the winner from X/O
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
           
        }
    });

    // when we got the winner 
    if(winner){
        newGameBtn.classList.add('active');
        gameInfo.innerHTML = `Winner Player - <span class="player" style="color:${winner === 'X' ? '#f5ce41' : '#3182e5'};">${winner}</span>`;
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if (box !== "") {
            fillCount++;
        }
    });

    // if board is full filled
    if(fillCount === 9){
        gameInfo.innerHTML = `Game tied!`;
        newGameBtn.classList.add('active');
    }
}



function handleClick(index) {
    if(gameGrid[index] === ''){
        boxes[index].innerHTML = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = currentPlayer;
        boxes[index].style.color = (currentPlayer === "X") ? "#f5ce41" : "#3182e5"; // Change box text color

        // Check if game is over BEFORE swapping turn
        checkGameOver();

        // If no winner, swap turn
        if (!newGameBtn.classList.contains('active')) {
            swapTurn();
        }
    }
}

boxes.forEach((box,index) =>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener('click',initGame);
