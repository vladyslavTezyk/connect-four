import type { GameBoard } from "@connect-four/shared";
import { initBoard } from "./core/initBoard";
import { selectColumn } from "./core/selectColumn";
import { placeToken } from "./core/placeToken";
import { displayBoard } from "./core/displayBoard";
import { checkWin } from "./core/checkWin";

async function runConnectFour() {
  const gameBoard: GameBoard = initBoard();
  let gameOver = false;

  while (gameBoard.win === null && !gameOver) {
    displayBoard(gameBoard);
    const column = await selectColumn(gameBoard);
    console.log(`Player ${gameBoard.currentPlayer} chose column ${column + 1}`);
    placeToken(gameBoard, column);
    
    if (gameBoard.currentRound >= 8) {
      console.log("Checking for win condition...");
      const result = checkWin({
        board: gameBoard.grid,
        lastMove: { row: gameBoard.lastRow!, col: gameBoard.lastCol! },
        moveCount: gameBoard.currentRound,
      });

      if (result.status === "win") {
        displayBoard(gameBoard);
        console.log(`\n 🏆 Player ${result.winner} wins! \n`);
        gameBoard.win = result.winner as number;
        gameOver = true;
      } else if (result.status === "draw") {
        console.log("\n It's a draw! \n");
        gameOver = true;
      }
    }
  }

  displayBoard(gameBoard);
  console.log("\n Game over! \n");
}

runConnectFour().catch(console.error);