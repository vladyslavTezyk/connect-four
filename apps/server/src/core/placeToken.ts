import type { GameBoard } from "@connect-four/shared";

export function placeToken(gameBoard: GameBoard, column: number): void {
  const grid = gameBoard.grid;
  const rows = grid.length - 1;

  // Find the lowest empty row in the column
  for (let row = rows; row >= 0; row--) {
    if (grid[row][column] === null) {
      grid[row][column] = gameBoard.currentPlayer;
      gameBoard.lastRow = row;
      gameBoard.lastCol = column;
      gameBoard.currentRound++;

      // Switch player
      gameBoard.currentPlayer = gameBoard.currentPlayer === 1 ? 2 : 1;
      return;
    }
  }

  throw new Error(`Column ${column} is full!`);
}