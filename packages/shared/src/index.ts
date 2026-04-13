export type Player = 1 | 2;

export interface GameBoard {
  grid: number[][];
  currentRound: number;
  currentPlayer: Player;
  win: number | null;
}

export type GameResult = "draw" | "player1" | "player2" | null;
