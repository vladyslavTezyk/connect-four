import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { GameBoard } from "@connect-four/shared";

export async function selectColumn(gameBoard: GameBoard): Promise<number> {
  const rl = readline.createInterface({ input, output });
  const column = parseInt(
    await rl.question(`Round ${gameBoard.currentRound} \n ${gameBoard.currentPlayer === 1 ? "Player 1" : "Player 2"}: 
    What column would you like to place your token in? `)
  );
  const maxColumn = gameBoard.grid[0].length;

  // Check if the column is valid
  if (column < 0 || column > maxColumn) {
    console.log("Invalid column. Please choose a column between 1 and 7.");
    return selectColumn(gameBoard);
  }

  // Check if the column is full
  if (gameBoard.grid[0][column - 1] !== 0) {
    console.log("Column is full. Please choose a different column.");
    return selectColumn(gameBoard);
  }

  rl.close();

  return column;
}
