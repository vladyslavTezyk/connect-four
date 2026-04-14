import type { GameBoard } from "@connect-four/shared";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function selectColumn(gameBoard: GameBoard): Promise<number> {
  return new Promise((resolve) => {
    rl.question(`Player ${gameBoard.currentPlayer}, select column (1-7): `, (answer) => {
      const column = parseInt(answer, 10) -1; // Convert to 0-based index

      if (isNaN(column) || column < 0 || column > 6) {
        console.log("Invalid column. Try again.");
        selectColumn(gameBoard).then(resolve);
        return;
      }

      if (gameBoard.grid[0][column] !== null) {
        console.log("Column full. Try another.");
        selectColumn(gameBoard).then(resolve);
        return;
      }

      resolve(column);
    });
  });
}
