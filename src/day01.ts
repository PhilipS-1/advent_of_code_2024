import * as fs from 'fs';

const input = fs.readFileSync('input/day01.txt', 'utf-8');
console.log(solve1(input));
console.log(solve2(input));

export function solve1(input: string) {
    let numbers1: number[] = [];
    let numbers2: number[] = [];
    input.split('\n').forEach((line) => {
        const pair = line.split('   ');
        numbers1.push(Number(pair[0]));
        numbers2.push(Number(pair[1]));
    });
    numbers1.sort();
    numbers2.sort();
    return numbers1
        .map((number, index) => Math.abs(number - numbers2[index]))
        .reduce((prev, next) => prev + next);
}

export function solve2(input: string) {
    let numbers1: number[] = [];
    let numbers2: number[] = [];
    input.split('\n').forEach((line) => {
        const pair = line.split('   ');
        numbers1.push(Number(pair[0]));
        numbers2.push(Number(pair[1]));
    });
    numbers1.sort();
    numbers2.sort();
    return numbers1
        .map((number, index) => number * numbers2
            .filter(number2 => number === number2).length)
        .reduce((prev, next) => prev + next);
}