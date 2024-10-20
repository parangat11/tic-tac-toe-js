/* 
    Plan of action:

    1. Make gameboard consisting of array that represents 
        the board's current state and change the board.

    2. Game controller function handles the logic to play
        a round, change the players, and check the winning 
        condition.
*/

/* Console Version: */
const gameboard = (function() {
    const board = [];
    for(let i = 0; i < 3; i++) {
        board[i] = [];
        for(let j = 0; j < 3; j++) {
            board[i].push(0);
        }
    }

    // To return board's current state.
    const getBoard = () => board;

    // To add the token of player to the cell.
    const addToken = (row, col, player) => {
        row--;
        col--;
        if(board[row][col] !== 0 && player !== 0) {
            return false;
        }
        board[row][col] = player;
        console.table(board);
        return true;
    }

    return {getBoard, addToken};
})();

function GameController() {
    let activePlayer = 0;

    const getActivePlayer = () => {
        return activePlayer;
    }
    
    const switchActivePlayer = () => {
        activePlayer = 1 - activePlayer;
    }

    const playRound = (row, col) => {
        let board = gameboard.getBoard();
        const currPlayer = Number(getActivePlayer());
        console.table(board);
        if(gameboard.addToken(row, col, currPlayer + 1)) {
            board = gameboard.getBoard();
            console.table(board);
            if(checkWinner(board)) {
                console.log('Winner is player ' + currPlayer);
                return 0;
            }
            console.table(board);
            switchActivePlayer();
            return 1;
        }
        return 2;
    }

    const reset = () => {
        console.log("After reset:");
        activePlayer = 0;
        for(let i = 1; i < 4; i++) {
            for(let j = 1; j < 4; j++) {
                gameboard.addToken(i, j, 0);
            }
        }
        console.table(gameboard.getBoard());
    }

    const checkWinner = (board) => {
        let winner = false;

        // Check rows
        for(let i = 0; i < 3; i++) {
            if(board[i][0] === 0)
                continue;
            let val = board[i][0];
            let curr = true;
            for(let j = 0; j < 3; j++) {
                if(val !== board[i][j]) {
                    curr = false;
                }
            }
            winner |= curr;
        }

        // Check cols
        for(let i = 0; i < 3; i++) {
            if(board[0][i] === 0)
                continue;
            let val = board[0][i];
            let curr = true;
            for(let j = 0; j < 3; j++) {
                if(val !== board[j][i]) {
                    curr = false;
                }
            }
            winner |= curr;
        }

        // Check diagonal-1
        let curr = true;
        for(let i = 0; i < 3; i++) {
            if(board[i][i] != board[0][0] || board[i][i]===0)
                curr = false;
        }
        winner |= curr;

        // Check diagonal-2`
        curr = true;
        for(let i = 0; i < 3; i++) {
            if(board[i][2 - i] != board[0][2] || board[0][2]===0)
                curr = false;
        }
        winner |= curr;
        if(board[1][0] === 1) {
            console.log(board);
            console.log(winner);
        }

        return winner;
    }

    return {playRound, getActivePlayer, reset};
}

/* Screen Version */
function ScreenController() {
    const newGame = GameController();

    const render = () => {
        for(let i = 1; i < 4; i++) {
            for(let j = 1; j < 4; j++) {
                const cell = document.querySelector(`.row-${i} > .col-${j}`);
                cell.addEventListener('click', (e) => clickHandlerCell(e, cell));
            }
        }
        const resetButton = document.querySelector('#reset');
        resetButton.addEventListener('click', clickHandlerReset);
    }

    function clickHandlerCell(event, cell) {
        const gameBoard = document.querySelector('.game-board');
        if(gameBoard.classList.contains('complete')) {
            return ;
        }
        console.log(event.target);
        const player = newGame.getActivePlayer();
        let r = 0, c = 0;
        for(let i = 1; i < 4; i++) {
            if(cell.classList.contains(`row-${i}`)){
                r = i;
                break;
            }
        }
        for(let i = 1; i < 4; i++) {
            if(cell.classList.contains(`col-${i}`)){
                c = i;
                break;
            }
        }
        console.log({r, c});
        const result = newGame.playRound(r, c, player);
        if(result === 0) {
            cell.textContent = (player==0?'X':'O');
            gameBoard.classList.add('complete');
            console.log(`Winner is ${player}`);
        }
        else if(result === 1) {
            cell.textContent = (player==0?'X':'O');
        }
    }

    function clickHandlerReset(e) {
        const cells = document.querySelectorAll('.game-board > * > *');
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        const gameBoard = document.querySelector('.game-board');
        if(gameBoard.classList.contains('complete')) {
            gameBoard.classList.remove('complete');
        }
        newGame.reset();
    }

    render();   // Initial render of the board
}

ScreenController();