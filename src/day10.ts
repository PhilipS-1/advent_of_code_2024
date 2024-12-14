const day = Deno.mainModule.split('/').pop()?.split('.')[0];
const input = Deno.readTextFileSync(`input/${day}.txt`);

console.log(`part1: ${solve1(input)}`);
// console.log(`part2: ${solve2(input)}`);

type point = {
    x: number;
    y: number;
}

function solve1(input: string){
    const map = input.split('\r\n').map( line => line.split('').map(Number));
    const trailheads: point[] = [];
    for(let x = 0; x < map.length; x++){
        for(let y = 0; y < map[x].length; y++){
            if( map[x][y] === 0){
                trailheads.push({x, y});
            }
        }
    }
    return getTrailheadScores(map, trailheads);
}

function getTrailheadScores(map: number[][], trailheads: point[]): number {

    return trailheads.reduce((acc, trailhead) => acc + getScore(map, trailhead), 0);
}


function getScore(map: number[][], trailhead: point): number {
    const visited: Set<string> = new Set();
    const toVisit: point[] = [trailhead];
    let count = 0;

    while (toVisit.length > 0) {
        const current = toVisit.pop();

        if(current && !visited.has(toString(current))){
            visited.add(toString(current));
            if(map[current.x][current.y] === 9){
                count++;
            }

            const neighbors: point[] = getNextSteps(map, current);
            neighbors.forEach(neighbor => {
                if(inMap(map, neighbor) && !visited.has(toString(neighbor))){
                    toVisit.push(neighbor);
                }
            });
        }
    }
    return count;
}

function toString(p: point): string {
    return `${p.x},${p.y}`;
}

function inMap(map: number[][], point: point): boolean {
    const [x, y] = [point.x, point.y];
    return  !(x < 0 || y < 0 || x >= map.length || y >= map[x].length)
}

function getNextSteps(map:number[][], current: point): point[] {
    const directions = [[1,0], [0,1], [0, -1], [-1, 0]];
    const [x, y] = [current.x, current.y];
    return directions.map(dir => ({x: x + dir[0], y: y + dir[1]}))
        .filter(point => inMap(map, point))
        .filter(point => rightStepSize(map, current, point));
}

function rightStepSize(map: number[][], current: point, next: point): boolean{
    return map[next.x][next.y] - map[current.x][current.y] === 1;
}


function solve2(input: string){
    return null;
}

import { assertEquals } from "jsr:@std/assert";

Deno.test("part 1", () => {
    const testInput = Deno.readTextFileSync(`input/${day}.test.txt`);
    assertEquals(solve1(testInput), 36);
})

Deno.test("part 2", () => {
    const testInput = Deno.readTextFileSync(`input/${day}.test.txt`);
    assertEquals(solve2(testInput), 123);
})