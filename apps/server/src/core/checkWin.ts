import type { BoardCell, CheckWinInput, GameState, GridPoint } from "@connect-four/shared";

const AXES = {
  HORIZONTAL: [0, 1],
  VERTICAL: [1, 0],
  DIAGONAL_DESC: [1, 1],
  DIAGONAL_ASC: [1, -1],
} as const;

export function checkWin<TCell extends BoardCell>(input: CheckWinInput<TCell>): GameState<TCell> {
  const { board, lastMove, moveCount, connect = 4 } = input;
  const { row, col } = lastMove;

  const rows = board.length;
  const cols = board[0].length;

  if (!rows || !cols || !inBounds(row, col, rows, cols)) return { status: "none" };

  const player = board[row][col];
  if (player === null) return { status: "none" };

  const minMovesToWin = 2 * connect - 1;
  const isGridFull = moveCount >= rows * cols;

  if (moveCount < minMovesToWin) {
    return isGridFull ? { status: "draw" } : { status: "none" };
  }

  for (const [dr, dc] of Object.values(AXES)) {
    const line = getFullLine(board, lastMove, player as NonNullable<TCell>, dr, dc);

    if (line.length >= connect) {
      return { 
        status: "win", 
        winner: player as NonNullable<TCell>, 
        line 
      };
    }
  }

  return isGridFull ? { status: "draw" } : { status: "none" };
}

function getFullLine<TCell extends BoardCell>(
  board: TCell[][],
  start: GridPoint,
  player: NonNullable<TCell>,
  dr: number,
  dc: number
): GridPoint[] {
  const backward = collectInDirection(board, start, player, -dr, -dc).reverse();
  const forward = collectInDirection(board, start, player, dr, dc);

  return [...backward, start, ...forward];
}

function collectInDirection<TCell extends BoardCell>(
  board: TCell[][],
  start: GridPoint,
  player: NonNullable<TCell>,
  dr: number,
  dc: number
): GridPoint[] {
  const points: GridPoint[] = [];
  let r = start.row + dr;
  let c = start.col + dc;

  while (inBounds(r, c, board.length, board[0].length) && board[r][c] === player) {
    points.push({ row: r, col: c });
    r += dr;
    c += dc;
  }

  return points;
}

function inBounds(row: number, col: number, rows: number, cols: number): boolean {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}