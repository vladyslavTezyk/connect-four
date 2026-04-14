import type { GameBoard } from "@connect-four/shared";
import { initBoard } from "./core/initBoard";
import { selectColumn } from "./core/selectColumn";
import { placeToken } from "./core/placeToken";
import { displayBoard } from "./core/displayBoard";

async function runConnectFour() {
  const gameBoard: GameBoard = initBoard();
  
  while (gameBoard.win === null) {
    displayBoard(gameBoard);
    const column = await selectColumn(gameBoard);
    console.log(`Player ${gameBoard.currentPlayer} chose column ${column}`);
    placeToken(gameBoard, column);
    if (gameBoard.currentRound >= 7) {
      console.log("Checking for win condition...");
    }
  }
}

runConnectFour();
