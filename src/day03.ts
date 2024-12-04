import * as fs from 'fs'

const input = fs.readFileSync('input/day03.txt', 'utf-8');
console.log(solve1(input));
console.log(solve2(input));

export function solve1(input: string): number {
    const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g 
    const match = input.match(regex);
    console.log(match);
    return match!.map(calculate).reduce((acc, curr) => acc + curr);
}

function calculate(input: string): number {
    const numbers = input.match(/[0-9]{1,3}/g)
    ?.map(Number) 
    ?? [0,0];
    return numbers[0] * numbers[1];
}

export function solve2(input: string): number {
    const parts = input.split('do()');
    return parts.map(part => part.split('don\'t')[0])
    .join()
    .match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)!
    .map(calculate)
    .reduce((acc, curr) => acc + curr)
}