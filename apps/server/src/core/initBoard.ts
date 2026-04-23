import type { GameBoard } from "@connect-four/shared";

export function initBoard(): GameBoard {
  const rows = 6;
  const cols = 7;

  return {
    grid: Array.from({ length: rows }, () => Array(cols).fill(null)),
    currentRound: 0,
    currentPlayer: 1,
    win: null,
  };
}