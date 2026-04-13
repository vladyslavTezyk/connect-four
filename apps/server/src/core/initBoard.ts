import { GameBoard } from '@connect-four/shared';

export function initBoard(): GameBoard {
    return {
        grid: Array(6).fill(null).map(() => Array(7).fill(0)),
        currentRound: 1,
        currentPlayer: 1,
        win: null
    };
}