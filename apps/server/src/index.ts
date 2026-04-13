import type { GameBoard } from "@connect-four/shared";
import { initBoard } from './core/initBoard';
import { selectColumn } from './core/selectColumn';

async function runConnectFour(){
    const gameBoard: GameBoard = initBoard();
    console.log(gameBoard);

    const column = await selectColumn(gameBoard.grid);

    console.log(`Player ${gameBoard.currentPlayer} chose column ${column}`);
}

runConnectFour();