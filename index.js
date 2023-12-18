// restart button
let startButton = document.getElementById("restart-game")
startButton.addEventListener("click", () => {
    main()
})

// generate a grid
function createGrid(n) {
    let grid = []
    for (let i = 0; i < n; i++) {
        grid.push([])
        for (let j = 0; j < n; j++) {
            grid[i].push(' ')
        }
    }

    return grid
}

// place snake's body
function createSnakeCords(n) {
    //check size of grid to place head in the middle
    let headPosition = (n - 1) / 2
    let snakeCooridnates = [[headPosition, headPosition], [headPosition + 1, headPosition], [headPosition + 2, headPosition]]
    return snakeCooridnates
}

// place snake on the grid
function placeSnakeOnGrid(grid, snakeCords) {
    for (let i = 0; i < snakeCords.length; i++) {
        grid[snakeCords[i][0]][snakeCords[i][1]] = "o"
    }
    return grid
}

// update snake on the grid
function updateSnakeOnGrid(grid, snakeCords, nextHead, nextIsApple) {

    if (nextIsApple === false) {
        grid[nextHead[0]][nextHead[1]] = 'o'
        grid[snakeCords[snakeCords.length - 1][0]][snakeCords[snakeCords.length - 1][1]] = ' '
    } else {
        grid[nextHead[0]][nextHead[1]] = 'o'
    }

    return grid
}

// place apple
function placeAppleOnGrid(grid) {
    let sizeOfGrid = grid.length - 1
    while (true) {
        let randomposition = randomPositionOnAGrid(sizeOfGrid)
        if (grid[randomposition[0]][randomposition[1]] == ' ') {
            grid[randomposition[0]][randomposition[1]] = 'a'
            // also color DOM-grid if it exists
            let div = document.getElementById(`${randomposition[0] * grid.length + randomposition[1] + 1}`)

            if (div !== null) {
                div.style.backgroundColor = "red"
            }
            return grid
        }
    }
}

// chose a random position on a grid
function randomPositionOnAGrid(n) {
    let x = Math.floor((Math.random() * n))
    let y = Math.floor((Math.random() * n))
    return [x, y]
}

// move snake function
function moveSnake(nextPosition, snakeCoordinates, nextIsApple) {
    let newSnakeCoordinates
    if (nextIsApple === false) {
        newSnakeCoordinates = snakeCoordinates.slice(0, -1)
    } else {
        newSnakeCoordinates = snakeCoordinates.slice()
    }
    newSnakeCoordinates.unshift(nextPosition)
    return newSnakeCoordinates
}

// add one point if next is an apple
function appleCounter(nextHeadPosition, gridWithSnakeAndApple, numberOfApples) {
    if (gridWithSnakeAndApple[nextHeadPosition[0]][nextHeadPosition[1]] == 'a') {
        let score = document.getElementById('current-score')
        score.textContent = `${numberOfApples + 1}`

        // check if current-score is higher than high-score
        let highScore = Number(localStorage.getItem("highScore"));
        if (highScore || highScore >= 0) {
            if (numberOfApples + 1 > (highScore)) {
                highScore = numberOfApples + 1
                localStorage.setItem('highScore', `${highScore}`)
                let highScoreParagraph = document.getElementById('high-score')
                highScoreParagraph.textContent = `${highScore}`
            }
        }
        return numberOfApples + 1
    }
    return numberOfApples
}

// check if next cell is an apple
function checkIfNextIsApple(nextHeadPosition, gridWithSnakeAndApple) {
    if (gridWithSnakeAndApple[nextHeadPosition[0]][nextHeadPosition[1]] == 'a') {
        return true
    }
    return false
}

// end the game
function endGame(numberOfApples) {
    let resultsParagraph = document.getElementById("results-paragraph")
    resultsParagraph.textContent = `Score: ${numberOfApples}`
}

// set high-score
function setHighScore() {
    let highScoreParaggraph = document.getElementById("high-score")
    let highScore = localStorage.getItem('highScore')
    if (highScore) {
        highScoreParaggraph.textContent = `${highScore}`
    } else {
        localStorage.setItem('highScore', '0')
        highScoreParaggraph.textContent = '0'
    }
}

// disable scrolling by arrow-keys
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

// check which cell the snake's head will move to next
function checkNextHeadPosition(snakeCoordinates, keyPressed) {
    let nextHead;
    if (keyPressed == "left" || keyPressed == "right" || keyPressed == "up" || keyPressed == "down") {
        if (keyPressed == "up") {
            if (!(snakeCoordinates[0][0] == snakeCoordinates[1][0] + 1)) {
                nextHead = [snakeCoordinates[0][0] - 1, snakeCoordinates[0][1]]
            } else {
                nextHead = [snakeCoordinates[0][0] + 1, snakeCoordinates[0][1]]
            }
        }
        else if (keyPressed == "down") {
            if (!(snakeCoordinates[0][0] == snakeCoordinates[1][0] - 1)) {
                nextHead = [snakeCoordinates[0][0] + 1, snakeCoordinates[0][1]]
            } else {
                nextHead = [snakeCoordinates[0][0] - 1, snakeCoordinates[0][1]]
            }
        }
        else if (keyPressed == "right") {
            if (!(snakeCoordinates[0][1] == snakeCoordinates[1][1] - 1)) {
                nextHead = [snakeCoordinates[0][0], snakeCoordinates[0][1] + 1]
            } else {
                nextHead = [snakeCoordinates[0][0], snakeCoordinates[0][1] - 1]
            }
        }
        else if (keyPressed == "left") {
            if (!(snakeCoordinates[0][1] == snakeCoordinates[1][1] + 1)) {
                nextHead = [snakeCoordinates[0][0], snakeCoordinates[0][1] - 1]
            } else {
                nextHead = [snakeCoordinates[0][0], snakeCoordinates[0][1] + 1]
            }
        }

        return nextHead;
    }
    else {
        // case 1
        if (snakeCoordinates[0][0] == snakeCoordinates[1][0] - 1) {
            nextHead = [snakeCoordinates[0][0] - 1, snakeCoordinates[0][1]]
        }
        // case 2
        else if (snakeCoordinates[0][0] == snakeCoordinates[1][0] + 1) {
            nextHead = [snakeCoordinates[0][0] + 1, snakeCoordinates[0][1]]
        }
        // case 3
        else if (snakeCoordinates[0][1] == snakeCoordinates[1][1] - 1) {
            nextHead = [snakeCoordinates[0][0], snakeCoordinates[0][1] - 1]
        }
        // case 4
        else if (snakeCoordinates[0][1] == snakeCoordinates[1][1] + 1) {
            nextHead = [snakeCoordinates[0][0], snakeCoordinates[0][1] + 1]
        }
        return nextHead
    }
}

// check if the next head position is an allowed position
function checkIfNextHeadPositionIsValid(nextHeadPosition, gridWithSnakeAndApple) {
    if (nextHeadPosition[0] < 0 || nextHeadPosition[0] > gridWithSnakeAndApple.length - 1 ||
        nextHeadPosition[1] < 0 || nextHeadPosition[1] > gridWithSnakeAndApple.length - 1) {
        return false
    }
    else if (gridWithSnakeAndApple[nextHeadPosition[0]][nextHeadPosition[1]] == 'o') {
        return false
    }
    return true

}

// render the grid in gthe DOM
function constructGridInDOM(grid) {
    let div = document.getElementById("placement-div")
    for (let i = 0; i < grid.length; i++) {
        let outerDiv = document.createElement("div")
        div.appendChild(outerDiv)
        for (let j = 0; j < grid.length; j++) {
            let button = document.createElement("button")
            button.id = (i * grid.length) + (j + 1)
            button.class = "grid-square"
            // if space then blue, if apple then red, and if snake then green
            if (grid[i][j] === " ") {
                button.style.backgroundColor = "blue"
                button.innerHTML = "&nbsp;"
            } else if (grid[i][j] === 'a') {
                button.style.backgroundColor = "red"
                button.innerHTML = grid[i][j]
            }
            else {
                button.style.backgroundColor = "green"
                button.innerHTML = grid[i][j]
            }
            outerDiv.appendChild(button)
        }
    }
}

// re-render the grid in the DOM 
function updateGridInDOM(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            let button = document.getElementById(`${(i * grid.length) + (j + 1)}`)
            if (grid[i][j] === " ") {
                button.innerHTML = "&nbsp;"
                button.style.backgroundColor = "blue"
            } else if (grid[i][j] === 'a') {
                button.innerHTML = grid[i][j]
                button.style.backgroundColor = "red"
            } else {
                button.innerHTML = grid[i][j]
                button.style.backgroundColor = "green"
            }
        }
    }
}

// allow the user to change level of difficulty
document.getElementById('easy').addEventListener("click", () => {
    localStorage.setItem("difficulty", "1000")
    timeBetweenTicks = 1000
})
document.getElementById('medium').addEventListener("click", () => {
    localStorage.setItem("difficulty", "650")
    timeBetweenTicks = 650
})
document.getElementById('hard').addEventListener("click", () => {
    localStorage.setItem("difficulty", "300")
    timeBetweenTicks = 300
})

function main() {
    let gridSize = 11
    let numberOfApples = 0
    let nextIsApple = false;
    let keyPressed = 'up';
    let timeBetweenTicks = Number(localStorage.getItem("difficulty")) || 1000
    console.log(timeBetweenTicks)

    // make game controllable by keyboard arrow-keys
    document.addEventListener("keydown", (e) => {
        if (e.key == "ArrowLeft") {
            keyPressed = "left"
        }
        else if (e.key == "ArrowRight") {
            keyPressed = "right"
        }
        else if (e.key == "ArrowUp") {
            keyPressed = "up"
        }
        else if (e.key == "ArrowDown") {
            keyPressed = "down"
        }
    })

    // make game controllable by arrow-keys on screen
    document.getElementById("arrow-keys-container").addEventListener("click", (e) => {
        console.log(e.target.id)
        // if (e.target.id == "up") console.log("YES")
        if (e.target.id === "up") keyPressed = "up"
        if (e.target.id === "left") keyPressed = "left"
        if (e.target.id === "right") keyPressed = "right"
        if (e.target.id === "down") keyPressed = "down"
    })

    // if grid exists then update if not then create it
    grid = createGrid(gridSize)

    // set high-score
    setHighScore()

    let snakeCoordinates = createSnakeCords(gridSize)
    let gridWithSnake = placeSnakeOnGrid(grid, snakeCoordinates)
    let gridWithSnakeAndApple = placeAppleOnGrid(gridWithSnake)
    // check if grid in DOM exists and if not then construct it
    let placementDiv = document.getElementById("placement-div")
    if (!placementDiv.firstChild) {
        // It has at least one
        constructGridInDOM(gridWithSnakeAndApple)
    }


    let intervalId = setInterval(() => {

        let nextHeadPosition = checkNextHeadPosition(snakeCoordinates, keyPressed)

        let nextHeadPositionIsValid = checkIfNextHeadPositionIsValid(nextHeadPosition, gridWithSnakeAndApple)

        if (nextHeadPositionIsValid == false) {
            let score = document.getElementById('current-score')
            score.textContent = ''
            clearInterval(intervalId)
            endGame(numberOfApples)
            numberOfApples = 0
        }
        else {
            numberOfApples = appleCounter(nextHeadPosition, gridWithSnakeAndApple, numberOfApples)
            nextIsApple = checkIfNextIsApple(nextHeadPosition, gridWithSnakeAndApple)
            gridWithSnake = updateSnakeOnGrid(gridWithSnakeAndApple, snakeCoordinates, nextHeadPosition, nextIsApple)
            snakeCoordinates = moveSnake(nextHeadPosition, snakeCoordinates, nextIsApple)
            if (nextIsApple) {
                gridWithSnakeAndApple = placeAppleOnGrid(gridWithSnake)
            }
            updateGridInDOM(gridWithSnakeAndApple)
        }

    }, timeBetweenTicks)
}
