import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export async function selectColumn(gameBoard: number[][]): Promise<number> {
    const rl = readline.createInterface({ input, output });
    const column = await rl.question('What column would you like to place your token in? ');
    
    const maxColumn = gameBoard[0].length;
    if(parseInt(column) < 0 || parseInt(column) > maxColumn){
        console.log('Invalid column. Please choose a column between 1 and 7.');
        return selectColumn(gameBoard);
    }

    rl.close();

    return parseInt(column);
}