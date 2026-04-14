import type { BoardCell, CheckWinInput, GameState, GridPoint } from "@connect-four/shared";

const DIRECTIONS: Array<readonly [number, number]> = [
  [0, 1],   // horizontal
  [1, 0],   // vertical
  [1, 1],   // diagonal down-right
  [1, -1],  // diagonal up-right
];

function inBounds(row: number, col: number, rows: number, cols: number): boolean {
  return row >= 0 && row < rows && col >= 0 && col < cols;
}

function collectInDirection<TCell extends BoardCell>(
  board: TCell[][],
  start: GridPoint,
  player: NonNullable<TCell>,
  dr: number,
  dc: number
): GridPoint[] {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;
  const points: GridPoint[] = [];

  let r = start.row + dr;
  let c = start.col + dc;

  while (inBounds(r, c, rows, cols) && board[r][c] === player) {
    points.push({ row: r, col: c });
    r += dr;
    c += dc;
  }

  return points;
}

export function checkWin<TCell extends BoardCell>(input: CheckWinInput<TCell>): GameState<TCell> {
  const { board, lastMove, moveCount } = input;
  const connect = input.connect ?? 4;

  const rows = board.length;
  const cols = board[0]?.length ?? 0;

  if (!rows || !cols) return { status: "none" };
  if (!inBounds(lastMove.row, lastMove.col, rows, cols)) return { status: "none" };

  const player = board[lastMove.row][lastMove.col];
  if (player == null) return { status: "none" };

  // Earliest possible win for Connect-N is move (2N - 1). For N=4 => 7.
  if (moveCount < 2 * connect - 1) {
    if (moveCount >= rows * cols) return { status: "draw" };
    return { status: "none" };
  }

  for (const [dr, dc] of DIRECTIONS) {
    const backward = collectInDirection(board, lastMove, player, -dr, -dc).reverse();
    const forward = collectInDirection(board, lastMove, player, dr, dc);

    const line = [...backward, { row: lastMove.row, col: lastMove.col }, ...forward];

    if (line.length >= connect) {
      return {
        status: "win",
        winner: player as NonNullable<TCell>,
        line,
      };
    }
  }

  if (moveCount >= rows * cols) return { status: "draw" };
  return { status: "none" };
}