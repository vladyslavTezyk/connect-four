export type Player = 1 | 2;

export type GameResult = "draw" | "player1" | "player2" | null;

export type BoardCell = string | number | null;

export interface GameBoard<TCell extends BoardCell = number> {
  grid: TCell[][];
  lastRow?: number;
  lastCol?: number;
  currentRound: number;
  currentPlayer: Player;
  win: NonNullable<TCell> | null;
}
export interface GridPoint {
  row: number;
  col: number;
}

export interface CheckWinInput<TCell extends BoardCell = BoardCell> {
  board: TCell[][];
  lastMove: GridPoint;
  moveCount: number;
  connect?: number; // default: 4
}

export type GameState<TCell extends BoardCell = BoardCell> =
  | {
      status: "win";
      winner: NonNullable<TCell>;
      line: GridPoint[];
    }
  | {
      status: "draw";
    }
  | {
      status: "none";
    };
