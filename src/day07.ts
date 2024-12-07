const day = Deno.mainModule.split('/').pop()?.split('.')[0];
const input = Deno.readTextFileSync(`input/${day}.txt`);

console.log(`part1: ${solve1(input)}`);
console.log(`part2: ${solve2(input)}`);

function solve1(input: string){
    return parseInput(input)
        .filter(eq => calculate(eq.result, eq.numbers))
        .map(eq => eq.result)
        .reduce((acc, curr) => acc + curr);
}

function solve2(input: string){
    return parseInput(input)
        .filter(eq => calculate(eq.result, eq.numbers, true))
        .map(eq => eq.result)
        .reduce((acc, curr) => acc + curr);
}

type equation = {
    result: number;
    numbers: number[]
}

function parseInput(input: string): equation[] {
    return input.split('\r\n').map(line => {
        const [res, numbers] = line.split(':');
        return {
            result: Number(res),
            numbers: numbers.split(" ").map(n => Number(n)).slice(1)
        };
    });
}

function calculate(result: number, numbers: number[], part2= false): boolean {
    const [a, b, ...rest] = numbers; 
    const branches = [a+b, a*b];
    if (part2) branches.push(Number(String(a) + b));

    if(rest.length === 0 && (branches[0] === result || branches[1] === result || (part2 && branches[2] === result))){
        return true;
    }
    if(rest.length === 0 ){
        return false;
    }

    return branches.reduce((acc: boolean, branch) => acc || calculate(result, [branch, ...rest], part2), false)
}

import { assertEquals } from "jsr:@std/assert";

Deno.test("part 1", () => {
    const testInput = Deno.readTextFileSync(`input/${day}.test.txt`);
    assertEquals(solve1(testInput), 3749);
})

Deno.test("part 2", () => {
    const testInput = Deno.readTextFileSync(`input/${day}.test.txt`);
    assertEquals(solve2(testInput), 11387);
})