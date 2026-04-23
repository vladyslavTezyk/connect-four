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
  const rowsAsEmojis = gameBoard.grid.map((row) => {
    return row.map(cellRepresentation).join(" ");
  });

  const finalOutput = rowsAsEmojis.join("\n");

  console.log(finalOutput);
}
