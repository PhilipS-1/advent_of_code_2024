const input = Deno.readTextFileSync("input/day05.txt");

console.log(solve1(input));
console.log(solve2(input));


function getRules(input: string): [string, string] {
    return input.trim().split("\r\n\r\n") as [string, string];
}

function getOrderMap(ordering: string): Map<number, number[]> {
    const orderMap = new Map<number, number[]>();
    ordering.split("\r\n").map(line => line.split("|")).forEach(line => {
        const a = Number(line[0]);
        const b = Number(line[1]);
        orderMap.has(a) ? orderMap.get(a)?.push(b) : orderMap.set(a, [b]);
    });
    return orderMap;
}

function hasCorrectOrder(update: number[], orderMap: Map<number, number[]>): boolean {
    const valid: number[] = [];
    for (const n of update ){
        if(orderMap.get(n)?.some(p => valid.includes(p))){
            return false;
        }  
        valid.push(n);
    }
    return true;
}

function solve1(input: string){
    const [ordering, updates] = getRules(input);
    const orderMap = getOrderMap(ordering);
     
    return updates.split("\r\n").map(line => line.split(",").map(x => Number(x)))
        .filter(update => hasCorrectOrder(update, orderMap))
        .map(validUpdate => validUpdate[Math.floor(validUpdate.length / 2) ])
        .reduce((acc, curr) => acc + curr);
}

function solve2(input: string){
    const [ordering, updates] = getRules(input);
    const orderMap = getOrderMap(ordering);

    return updates.split("\r\n").map(line => line.split(",").map(x => Number(x)))
        .filter(update => !hasCorrectOrder(update, orderMap))
        .map(invalidUpdate => orderCorrectly(invalidUpdate, orderMap))
        .map(validUpdate => validUpdate[Math.floor(validUpdate.length / 2) ])
        .reduce((acc, curr) => acc + curr);
    
}


function orderCorrectly(update: number[], orderMap: Map<number, number[]>): number[] {
    const filteredMap = new Map<number, number[]>();
    update.forEach(n => {
        const filtered = orderMap.get(n)?.filter(v => update.includes(v)) || [];
        filteredMap.set(n, filtered);
    });
    return update.sort((a,b) => (filteredMap.get(b)?.length || 0) - (filteredMap.get(a)?.length || 0));
}

import { assertEquals } from "jsr:@std/assert";

Deno.test("part 1", () => {
    const testInput = Deno.readTextFileSync('input/day05.test.txt');
    assertEquals(solve1(testInput), 143);
})

Deno.test("part 2", () => {
    const testInput = Deno.readTextFileSync('input/day05.test.txt');
    assertEquals(solve2(testInput), 123);
})