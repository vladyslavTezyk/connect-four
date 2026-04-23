import type { GameBoard } from "@connect-four/shared";
import * as readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const closeInterface = () => rl.close();

export async function selectColumn(gameBoard: GameBoard): Promise<number> {
  const prompt = `Player ${gameBoard.currentPlayer}, select column (1-7): `;

  try {
    const answer = await rl.question(prompt);
    const column = parseInt(answer, 10) - 1;
    if (isNaN(column) || column < 0 || column > 6) {
      console.log("Invalid column. Try again. Please enter a number between 1 and 7.");
      return selectColumn(gameBoard);
    }

    if (gameBoard.grid[0][column] !== null) {
      console.log("Column full. Try another.");
      return selectColumn(gameBoard);
    }

    return column;
  } catch (error: any) {
    const isInterfaceClose = error.code === 'ERR_USE_AFTER_CLOSE' || error.code === 'ABORT_ERR';
    if (isInterfaceClose) {
      console.log("\n See you later!")
      process.exit(0);
    }
    console.error("An error occured. Please try again.", error);
    return selectColumn(gameBoard);
  }
}
