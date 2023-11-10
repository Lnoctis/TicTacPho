let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Move and Player Turn Indicator

function makeMove(cellIndex) {
    if (board[cellIndex] === '' && !checkWinner()) {
        const playerImage = document.getElementById(`player${currentPlayer}Image`).files[0];
        if (playerImage) {
            const imageUrl = URL.createObjectURL(playerImage);
            const cell = document.getElementsByClassName('cell')[cellIndex];
            cell.innerHTML = `<img src="${imageUrl}" alt="Player ${currentPlayer}" />`;
        }

        board[cellIndex] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkWinner();

        // Update the player indicator
        const currentPlayerIndicator = document.getElementById('currentPlayer');
        currentPlayerIndicator.textContent = currentPlayer;
    }
}

// Checking Winner

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            const winnerMessage = document.getElementById('winner-message');
            winnerMessage.textContent = `${board[a]} wins!`;

            // Display the winner popup in the middle
            const winnerPopup = document.getElementById('winner-popup');
            winnerPopup.style.display = 'block';

            // Play the win sound
            const winSound = document.getElementById('winSound');
            winSound.play();

            // Add a class to the winning cells to turn them blue
            const winningCells = [a, b, c];
            for (let cellIndex of winningCells) {
                const cell = document.querySelector(`.cell[data-audio="audio1"][onclick="makeMove(${cellIndex})"]`);
                cell.style.backgroundColor = 'pink';
            }

            // Make the color blink
            let isBlinking = false;
            const blinkInterval = setInterval(function() {
                for (let cellIndex of winningCells) {
                    const cell = document.querySelector(`.cell[data-audio="audio1"][onclick="makeMove(${cellIndex})"]`);
                    cell.style.backgroundColor = isBlinking ? 'violet' : ''; // Toggle between blue and no color
                }
                isBlinking = !isBlinking; // Toggle the flag
            }, 300); // Change color every 500 milliseconds

            // Stop the blinking after a certain duration
            setTimeout(function() {
                clearInterval(blinkInterval); // Stop the blinking
            }, 2000); // Adjust the duration as needed

            return true;
        }
    }

    if (!board.includes('')) {
        document.getElementById('message').textContent = "It's a draw!";
        // Play the draw sound
        var drawSound = document.getElementById('drawSound');
        drawSound.play();
        return true;
    }

    return false;
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    document.getElementById('message').textContent = '';
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
        cells[i].style.backgroundColor = ''; // Reset the background color
    }

    // Hide the winner popup
    const winnerPopup = document.getElementById('winner-popup');
    winnerPopup.style.display = 'none';

    // Reset the player indicator
    const currentPlayerIndicator = document.getElementById('currentPlayer');
    currentPlayerIndicator.textContent = 'X';
}

// Player Images

function loadImage(player) {
    const fileInput = document.getElementById(`player${player}Image`);
    if (fileInput.files.length > 0) {
        const imageUrl = URL.createObjectURL(fileInput.files[0]);
        const cell = document.getElementsByClassName('cell')[player === 'X' ? 0 : 8];
        cell.innerHTML = `<img src="${imageUrl}" alt="Player ${player}" />`;
    }
}

// Audio

const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const audioId = cell.getAttribute("data-audio");
        const audio = document.getElementById(audioId);
        if (audio) {
            audio.play();
        }
    });
});

// Color Selector

const colorSelector = document.getElementById('color-selector');
const body = document.body;

colorSelector.addEventListener('change', () => {
    const selectedColor = colorSelector.value;
    body.style.background = selectedColor;
});
