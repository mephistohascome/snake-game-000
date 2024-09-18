const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

const box = 20; 

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let circle = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
};

let direction = '';

document.addEventListener('keydown', setDirection);

function setDirection(event) {
    if (event.keyCode == 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode == 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode == 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode == 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

function collision(newHead, snakeArray) {
    for (let i = 0; i < snakeArray.length; i++) {
        if (newHead.x === snakeArray[i].x && newHead.y === snakeArray[i].y) {
            return true;
        }
    }
    return false;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? '#2ecc71' : '#27ae60';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.beginPath();
    ctx.arc(circle.x + box / 2, circle.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#f1c40f';
    ctx.fill();
    ctx.closePath();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;

    if (snakeX == circle.x && snakeY == circle.y) {
        circle = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box,
        };
    } else {
        snake.pop(); 
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over!');
        return;
    }

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 400);
