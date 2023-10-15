const inputPlayer1 = document.querySelector('#inputPlayer-1')
const inputPlayer2 = document.querySelector('#inputPlayer-2')
const namePlayer1 = document.querySelector('#namePlayer1')
const namePlayer2 = document.querySelector('#namePlayer2')
const spanScorePlayer1 = document.querySelector('#scorePlayer1')
const spanScorePlayer2 = document.querySelector('#scorePlayer2')
let scorePlayer1 = 0
let scorePlayer2 = 0
let clickCounts = 0
let playerStarts = 1
let playerWin = ''
let startScoreNoRepeat = false

let positionArray = [[], [], []]

for (let i = 0; i < 9; i++) {
    positionArray[(i)%3].push(document.querySelector(`#position-${i+1}`));
}

function start(event) {
    event.preventDefault()

    spanScorePlayer1.innerText = '-'
    spanScorePlayer2.innerText = '-'

    if (inputPlayer1.value !== '' && inputPlayer2.value !== '') {
        disableHome()
        scoreBoardNames()
        playerStarts = 1

        if(startScoreNoRepeat === false){
            startScoreNoRepeat = true
            score()
        }
        
    }
}

function anableHome() {
    document.querySelector('#game').style.display = 'none'
    main = document.querySelector('main')
    main.classList.remove('disappear')
    main.classList.add('appear')
}

function disableHome() {
    document.querySelector('#home section button').classList.remove('active')
    document.querySelector('#home section button').classList.add('focus')
    main = document.querySelector('main')
    main.classList.remove('appear')
    main.classList.add('disappear')
    setTimeout(function () {
        const gameDisplay = document.querySelector('#game')
        document.querySelector('#home section button').classList.remove('focus')
        document.querySelector('#home section button').classList.add('active')
        gameDisplay.style.display = 'block'
        gameDisplay.classList.add('appear')
    }, 2000)
}

function scoreBoardNames() {
    namePlayer1.innerText = inputPlayer1.value
    namePlayer2.innerText = inputPlayer2.value

    setTimeout(function () {
        inputPlayer1.value = ''
        inputPlayer2.value = ''
    }, 3000)
}

function score() {
    document.querySelectorAll('#frames div button').forEach(function (buttonSelected) {
        buttonSelected.addEventListener('click', function () {
            if (playerStarts === 1) {
                buttonSelected.innerText = 'X'
                verifyPosition()
                youWin()

                playerStarts = 0
            } else if (playerStarts === 0) {
                buttonSelected.innerText = 'O'
                verifyPosition()
                youWin()

                playerStarts = 1
            }
        })
    })
}

function verifyPosition() {
    if (positionArray[0][0].innerText === positionArray[1][1].innerText && positionArray[0][0].innerText === positionArray[2][2].innerText) {
        if (positionArray[0][0].innerText === 'X') {
            playerWin = namePlayer1.innerText
            scorePlayer1 += 1
        } else if (positionArray[0][0].innerText === 'O') {
            scorePlayer2 += 1
            playerWin = namePlayer2.innerText
        }
    } else if (positionArray[0][2].innerText === positionArray[1][1].innerText && positionArray[0][2].innerText === positionArray[2][0].innerText) {
        if (positionArray[0][2].innerText === 'X') {
            scorePlayer1 += 1
            playerWin = namePlayer1.innerText
        } else if (positionArray[0][2].innerText === 'O') {
            scorePlayer2 += 1
            playerWin = namePlayer2.innerText
        }
    }

    for (let i = 0; i < positionArray.length; i++) {
        if (positionArray[i][0].innerText === positionArray[i][1].innerText && positionArray[i][1].innerText === positionArray[i][2].innerText) {
            if (positionArray[i][0].innerText === 'X') {
                scorePlayer1 += 1
                playerWin = namePlayer1.innerText
            } else if (positionArray[i][0].innerText === 'O') {
                scorePlayer2 += 1
                playerWin = namePlayer2.innerText
            }
        }

        if (positionArray[0][i].innerText === positionArray[1][i].innerText && positionArray[1][i].innerText === positionArray[2][i].innerText) {
            if (positionArray[0][i].innerText === 'X') {
                scorePlayer1 += 1
                playerWin = namePlayer1.innerText
            } else if (positionArray[0][i].innerText === 'O') {
                scorePlayer2 += 1
                playerWin = namePlayer2.innerText
            }
        }
    }
    clickCounts += 1
}

function youWin() {
    if (playerWin !== '') {
        resetGame()
        gameOver()
        clickCounts = 0

        const winningPlayer = document.querySelector('#winningPlayer')
        winningPlayer.innerText = playerWin

        playerWin = ''
    } else if (clickCounts === 9) {
        console.log(clickCounts)
        clickCounts = 0
        document.querySelector('#tied').style.display = 'flex'
        document.querySelector('#win').style.display = 'none'
        resetGame()
        gameOver()
        
    }

    
}

function gameOver() {
    document.querySelector('#game').style.display = 'none'
    const gameOverDisplay = document.querySelector('#gameOver')
    gameOverDisplay.style.display = 'block'
    gameOverDisplay.classList.add('appear')

    document.querySelector('#continue').addEventListener('click', function () {
        disableGameOverDisplay()
        document.querySelector('#tied').style.display = 'none'
        document.querySelector('#win').style.display = 'flex'

        if (scorePlayer1 !== 0) {
            spanScorePlayer1.innerText = String(scorePlayer1)
        }
        if (scorePlayer2 !== 0) {
            spanScorePlayer2.innerText = String(scorePlayer2)
        }

        setTimeout(() => {
            const gameDisplay = document.querySelector('#game')
            gameDisplay.style.display = 'block'
            gameDisplay.classList.add('appear')
        }, 800);
    })
    const backToHomeButton = document.querySelector('#backToHome').addEventListener('click', function () {
        disableGameOverDisplay()
        anableHome()
        document.querySelector('#tied').style.display = 'none'
        document.querySelector('#win').style.display = 'flex'
    })
}

function disableGameOverDisplay() {
    document.querySelector('#gameOver').style.display = 'none'
}

function resetGame() {
    positionArray.forEach(function (valor, i) {
        positionArray[i].forEach(function (valor, j) {
            positionArray[i][j].innerText = ''
        })
    })
}

if (inputPlayer1.value !== '' && inputPlayer2.value !== '') {
    document.querySelector('#home section button').classList.remove('active')
}

document.querySelector('form').addEventListener('submit', start)
document.querySelector('#game').style.display = 'none'
document.querySelector('#gameOver').style.display = 'none'
document.querySelector('#tied').style.display = 'none'