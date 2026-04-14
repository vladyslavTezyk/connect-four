import { GameBoard } from '@connect-four/shared';

export function placeToken(gameBoard: GameBoard, column: number): GameBoard {
    const { grid, currentPlayer } = gameBoard;

    // Find the lowest empty row in the specified column
    for(let row = grid.length - 1; row >= 0; row--) {
        if(grid[row][column - 1] === 0){
            grid[row][column - 1] = currentPlayer; // Place the token 1 or 2
            gameBoard.currentRound += 1; // Increment the round
            gameBoard.currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch player
            break; // Exit the loop after placing the token
        }
    }

    return gameBoard;
}