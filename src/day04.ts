import * as fs from 'fs'

const input = fs.readFileSync('input/day04.txt', 'utf-8');

console.log(solve1(input));
console.log(solve2(input));

export function solve1(input: string) :number {
    const matrix = input.split('\n').map(str => str.split(''));
    return matrix.flatMap((row, rowIndex) => row.map((_, colIndex) => countXmas(matrix, rowIndex, colIndex)))
    .reduce((acc, curr) => acc + curr);
}


function countXmas(matrix: string[][], row: number, col: number): number {
    const directions = [[0,1], [0,-1], [1,0], [-1, 0], [1,1], [1,-1], [-1,1], [-1,-1]];
    let count = 0;

    directions.forEach(dir => {
        let word = '';
        [0, 1, 2, 3].forEach(n => {
            const a = row + (n * dir[0]);
            const b = col + (n * dir[1]);
            if ((a >= matrix.length || a < 0) || (b >= matrix[0].length) || b < 0) {
                return; 
            }
            word += matrix[a][b];
        });
        count += word === 'XMAS' ? 1 : 0;
    });

    return count;
}

export function solve2(input: string){
    const matrix = input.split('\n').map(str => str.split(''));
    return matrix.flatMap((row, rowIndex) => row.map((_, colIndex) => countXmas2(matrix, rowIndex, colIndex)))
    .reduce((acc, curr) => acc + curr);
}

function countXmas2(matrix: string[][], row: number, col: number): number {
    if(matrix[row][col] != 'A'){
        return 0;
    }
    if( row === 0 || col === 0 ){
        return 0;
    }
    if( row === matrix.length -1 || col === matrix.length -1){
        return 0;
    }
    const directions = [[1,1], [1,-1], [-1,1], [-1,-1]];
    let word1 = matrix[row + 1][col -1] + matrix[row - 1][col + 1]
    let word2 = matrix[row + 1][col +1] + matrix[row - 1][col - 1]
    if (word1 != 'MS' && word1 != 'SM'){
        return 0;
    }
    return (word2 == 'MS' || word2 == 'SM') ? 1 : 0;
}