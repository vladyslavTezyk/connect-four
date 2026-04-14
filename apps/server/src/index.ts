import type { GameBoard } from "@connect-four/shared";
import { initBoard } from "./core/initBoard";
import { selectColumn } from "./core/selectColumn";
import { placeToken } from "./core/placeToken";
import { displayBoard } from "./core/displayBoard";
import { checkWin } from "./core/checkWin";

async function runConnectFour() {
  const gameBoard: GameBoard = initBoard();
  
  while (gameBoard.win === null) {
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
        console.log(`Player ${result.winner} wins!`);
        console.log(`Winning line: ${result.line.map((p) => `(${p.row},${p.col})`).join(" -> ")}`);
        gameBoard.win = result.winner as number;
      } else if (result.status === "draw") {
        console.log("It's a draw!");
        gameBoard.win = null; // Game over, but no winner
      }
    }
  }

  displayBoard(gameBoard);
  console.log("Game over!");
}

runConnectFour().catch(console.error);