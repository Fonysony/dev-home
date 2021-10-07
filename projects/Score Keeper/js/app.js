// The score board
const scoreOne = document.querySelector('#score-one');
const scoreTwo = document.querySelector('#score-two');
const maxPoint = document.querySelector('#max-point');
// All the buttons
playerBtns = document.querySelectorAll('.player-btn');
const btnReset = document.querySelector('#reset');

// Player points
let playerOne = 0;
let playerTwo = 0;
let maxTo = parseInt(document.querySelector('#play-to').value);
maxPoint.innerText = maxTo;
let hasWon = false;

initGame();

function initGame() {
    console.log(`max points: ${maxTo}, player One: ${playerOne}, player Two: ${playerTwo}, hasWon: ${hasWon}`);
    for (btn of playerBtns) {
        btn.addEventListener('click', addPoints);
    }

    btnReset.addEventListener('click', resetGame);
}

function addPoints() {
    if (!hasWon && playerOne < maxTo && playerTwo < maxTo) {

        const btnAttr = this.attributes[0].value;
        console.log(`btnAttr: ${btnAttr}`);
        if (btnAttr === 'player-one') {
            playerOne++;
            scoreOne.innerText = playerOne;
        }
        if (btnAttr === 'player-two') {
            playerTwo++;
            scoreTwo.innerText = playerTwo;
        }
        checkForWinner();
    }
    
}

function checkForWinner() {
    if (playerOne === maxTo) {
        hasWon = true;
        scoreOne.classList.toggle('winner');
        maxPoint.classList.toggle('winner');
        scoreTwo.classList.toggle('loser');
    }

    if (playerTwo === maxTo) {
        hasWon = true;
        scoreTwo.classList.toggle('winner');
        maxPoint.classList.toggle('winner');
        scoreOne.classList.toggle('loser');
    }
}

function resetGame() {
    playerOne = 0;
    playerTwo = 0;
    maxTo = parseInt(document.querySelector('#play-to').value);
    maxPoint.innerText = maxTo;
    hasWon = false;
    scoreOne.innerText = playerOne;
    scoreTwo.innerText = playerTwo;
    scoreOne.classList.remove('winner', 'loser');
    scoreTwo.classList.remove('winner', 'loser');
    maxPoint.classList.remove('winner');
    for (btn of playerBtns) {
        btn.removeEventListener('click', addPoints);
    }
    btnReset.removeEventListener('click', resetGame);
    console.log(`max points: ${maxTo}, player One: ${playerOne}, player Two: ${playerTwo}, hasWon: ${hasWon}`);
    initGame();
}