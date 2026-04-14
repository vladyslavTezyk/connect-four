import { GameBoard } from "@connect-four/shared";

enum Cell {
  Player1 = 1,
  Player2 = 2,
}

const cellRepresentation = (cell: Cell) => {
  if (cell === Cell.Player1) return "🟢";
  if (cell === Cell.Player2) return "🟡";
  return "⚫";
};

export function displayBoard(gameBoard: GameBoard) {
  console.log(gameBoard.grid.map((row) => row.map(cellRepresentation).join(" ")).join("\n"));
}
