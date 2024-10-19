/* 
    Plan of action:

    1. Make gameboard consisting of array that represents 
        the board's current state and change the board.

    2. Game controller function handles the logic to play
        a round, change the players, and check the winning 
        condition.
*/

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
        if(board[row][col] === 0) {
            board[row][col] = player;
            return true;
        }
        return false;
    }

    return {getBoard, addToken};
})();

function GameController() {
    const players = {
        playerOne: {
            name: "p1"
        },
        playerTwo: {
            name: "p2"
        }
    };

    let activePlayer = 0;

    const getActivePlayer = () => {
        return activePlayer;
    }
    
    const switchActivePlayer = () => {
        activePlayer = !activePlayer;
    }

    const play = () => {
        const board = gameboard.getBoard();
        while(1) {
            const currPlayer = getActivePlayer();
            const row = Number(prompt('Enter row'));
            const col = Number(prompt('Enter column'));
            if(gameboard.addToken(row, col, currPlayer)) {
                if(checkWinner(board)) {
                    console.log('Winner is player ' + players[currPlayer].name);
                }
                switchActivePlayer();
            }
        }
    }

    const checkWinner = (board) => {
        let winner = false;

        // Check rows
        for(let i = 0; i < 3; i++) {
            let val = board[i][0];
            let curr = true;
            for(let j = 0; j < 3; j++) {
                if(val != board[i][j]) {
                    curr = false;
                }
            }
            winner |= curr;
        }

        // Check cols
        for(let i = 0; i < 3; i++) {
            let val = board[0][i];
            let curr = true;
            for(let j = 0; j < 3; j++) {
                if(val != board[j][i]) {
                    curr = false;
                }
            }
            winner |= curr;
        }

        // Check diagonal-1
        let curr = true;
        for(let i = 0; i < 3; i++) {
            if(board[i][i] != board[0][0])
                curr = false;
        }
        winner |= curr;

        // Check diagonal-2
        curr = true;
        for(let i = 0; i < 3; i++) {
            if(board[i][2 - i] != board[0][2])
                curr = false;
        }
        winner |= curr;

        return winner;
    }
}

const newGame = GameController();
newGame.play();