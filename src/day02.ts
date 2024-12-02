import * as fs from 'fs';

const input = fs.readFileSync('input/day02.txt', 'utf-8');


const parseInput = (input: string) => input.split('\n').map(line => line.split(' ').map(Number));

export function solve1(input: string) {
    const reports = parseInput(input);
    // console.log(reports);
    return reports.filter(report => ( report.every(isIncreasing) || [...report].reverse().every(isIncreasing))).length;
}

function isIncreasing (level: number, index: number, report: number[]) {
    return index === report.length - 1 ||  (report[index + 1] - level <= 3 && report[index + 1] - level > 0);
}

export function solve2(input: string) {
    const reports = parseInput(input);
    return reports
        .map(makeSubLists)
        .filter(subLists => subLists.some(list => list.every(isIncreasing) || [...list].reverse().every(isIncreasing)))
        .length;
}

function makeSubLists(list: number[]): number[][] {
    return list.map((_, i) => [...list].filter((_, j) => j != i));
}

console.log(solve1(input));
console.log(solve2(input));