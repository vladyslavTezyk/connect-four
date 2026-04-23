import type { GameBoard } from "@connect-four/shared";
import { initBoard } from "./core/initBoard";
import { selectColumn, closeInterface } from "./core/selectColumn";
import { placeToken } from "./core/placeToken";
import { displayBoard } from "./core/displayBoard";
import { checkWin } from "./core/checkWin";

async function runConnectFour() {
  try {
    const gameBoard: GameBoard = initBoard();
    let isGameOver = false;

    while (!isGameOver) {
      displayBoard(gameBoard);
      const column = await selectColumn(gameBoard);
      console.log(`\nPlayer ${gameBoard.currentPlayer} chose column ${column + 1}`);
      placeToken(gameBoard, column);

      if (gameBoard.currentRound >= 7) {
        console.log("Checking for win ...");
        const result = checkWin({
          board: gameBoard.grid,
          lastMove: { row: gameBoard.lastRow!, col: gameBoard.lastCol! },
          moveCount: gameBoard.currentRound,
        });

        if (result.status === "win") {
          console.log(`\n 🏆 Player ${result.winner} wins! \n`);
          gameBoard.win = result.winner as number;
          isGameOver = true;
        } else if (result.status === "draw") {
          console.log("\n 🤝 It's a draw! \n");
          isGameOver = true;
        }
      }
    }
    displayBoard(gameBoard);
  } catch (error) {
    console.error("Oops, something went wrong");
  } finally {
    closeInterface();
    console.log("\n Game over! \n");
  }
}

runConnectFour().catch(console.error);
