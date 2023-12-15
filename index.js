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
        if (grid[randomposition[0]][randomposition[1]] == " ") {
            grid[randomposition[0]][randomposition[1]] = "a"
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
        console.log(numberOfApples + 1)
        let score = document.getElementById('current-score')
        score.textContent = `${numberOfApples + 1}`
        console.log(score.textContent)
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
    resultsParagraph.textContent = `Game has ended! Score: ${numberOfApples}`
}

// check which cell the snake's head will move to next
function checkNextHeadPosition(gridWithSnakeAndApple, snakeCoordinates, keyPressed) {
    console.log(keyPressed)
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
            button.style.backgroundColor = "blue"
            if (grid[i][j] === " ") {
                button.innerHTML = "&nbsp;"
            } else {
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
            } else {

                button.innerHTML = grid[i][j]
            }
        }
    }
}

function main() {
    let n = 11
    let numberOfApples = 0
    let nextIsApple = false;
    let keyPressed = 'up';
    let nextHeadPositionIsValid = true

    // make game controllable by arrow-keys
    document.addEventListener("keydown", (e) => {
        console.log(e.key)
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

    // if grid exists then update if not then create it
    grid = createGrid(n)

    let snakeCoordinates = createSnakeCords(n)
    let gridWithSnake = placeSnakeOnGrid(grid, snakeCoordinates)
    let gridWithSnakeAndApple = placeAppleOnGrid(gridWithSnake)
    // check if grid in DOM exists and if not then construct it
    let placementDiv = document.getElementById("placement-div")
    if (!placementDiv.firstChild) {
        // It has at least one
        constructGridInDOM(gridWithSnakeAndApple)
    }


    let intervalId = setInterval(() => {

        nextHeadPosition = checkNextHeadPosition(gridWithSnakeAndApple, snakeCoordinates, keyPressed)

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

    }, 1000)
}