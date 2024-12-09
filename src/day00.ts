const day = Deno.mainModule.split('/').pop()?.split('.')[0];
const input = Deno.readTextFileSync(`input/${day}.txt`);

console.log(`part1: ${solve1(input)}`);
console.log(`part2: ${solve2(input)}`);

function solve1(input: string){
    return null;
}

function solve2(input: string){
    return null;
}

import { assertEquals } from "jsr:@std/assert";

Deno.test("part 1", () => {
    const testInput = Deno.readTextFileSync(`input/${day}.test.txt`);
    assertEquals(solve1(testInput), 143);
})

Deno.test("part 2", () => {
    const testInput = Deno.readTextFileSync(`input/${day}.test.txt`);
    assertEquals(solve2(testInput), 123);
})