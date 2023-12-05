const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d")
const audioeat = document.getElementById('audioeat')
let points = document.getElementById('points')
const msgGameOver = document.getElementById('msgGameOver')
let PlaySoundGame = document.getElementById('startAudioGame')

const size = 30
const snake = [
    { x: 270, y: 240 },
]

let direction, loopId
totalPoints = +1

PlaySound = true

const drowSnake = () => {
    ctx.fillStyle = "#dddd"

    snake.forEach((element, index) => {

        if (index == snake.length - 1) {
            ctx.fillStyle = "#fff"

        }

        ctx.fillRect(element.x, element.y, size, size)

    })
}

const randomNumber = ((min, max) => {
    return Math.round(Math.random() * (max - min) + min)
})

const randomPosition = (() => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
})

const randomColorEat = (() => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
})


const eat = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColorEat()
}

const drawEat = (() => {
    const { x, y, color } = eat
    ctx.shadowColor = color
    ctx.shadowBlur = 18
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0

})

const moveSnake = (() => {

    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction === 'up') {
        snake.push({ x: head.x, y: head.y - size })
    }

    if (direction === 'down') {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction === 'right') {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction === 'left') {
        snake.push({ x: head.x - size, y: head.y })
    }

    snake.shift()
})

const eatFood = (() => {
    const head = snake[snake.length - 1]
    if (head.x === eat.x && head.y === eat.y) {
        snake.push(head)
        audioeat.play()
        let x = randomPosition()
        let y = randomPosition()
        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }
        eat.x = x
        eat.y = y
        eat.color = randomColorEat()

        points.innerHTML = totalPoints++

    }
})

const loop = (() => {
    clearTimeout(loopId)
    ctx.clearRect(0, 0, 600, 600)
    drawEat()
    moveSnake()
    drowSnake()
    eatFood()
    ScreenCollision()
    loopId = setTimeout(() => {
        loop()
    }, 300)
})


const ScreenCollision = (() => {
    const head = snake[snake.length - 1]
    const limitScreen = canvas.width - size
    const headNeck = snake.length - 2
    const CollisionScreen = head.x < 0 || head.x > 570 || head.y < 0 || head.y > 570

    const SelfSnakeCollision = snake.find((position, index) => {
        return index < headNeck && position.x == head.x && position.y == head.y
    })

    if (CollisionScreen || SelfSnakeCollision) {
        gameOver()
        msgGameOver.style.display = 'flex'
        stopmusic()
        removeEventListener(startGame)


    }
})

const gameOver = (() => {
    direction = undefined

})



loop()

let startGame = document.addEventListener('keydown', (event) => {

    playmusic()

    if (event.key == 'ArrowRight' && direction != 'left') {
        direction = 'right'
    }

    if (event.key == 'ArrowLeft' && direction != 'right') {
        direction = 'left'

    }

    if (event.key == 'ArrowDown' && direction != 'up') {
        direction = 'down'

    }

    if (event.key == 'ArrowUp' && direction != 'down') {
        direction = 'up'

    }

})

function playmusic() {
    if (PlaySound === true) {
        PlaySound = false
        PlaySoundGame.play()

    }
}

function stopmusic() {
    if (PlaySound === false) {
        PlaySoundGame.pause()
    }
}

document.getElementById('btnPlayAgain').addEventListener('click', (() => {
    window.location.reload()
}))












