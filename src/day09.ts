const day = Deno.mainModule.split('/').pop()?.split('.')[0];
const input = Deno.readTextFileSync(`input/${day}.txt`);

console.log(`part1: ${solve1(input)}`);
console.log(`part2: ${solve2(input)}`);

function solve1(input: string){return solve(input, 1)}
function solve2(input: string){return solve(input, 2)}

function solve(input: string, part=1): number{
    const numbers = input.split('').map(Number);
    const blocks =  numbers.flatMap((n, index) => index % 2 === 0 ? Array(n).fill(index/2) : Array(n).fill(-1));
    const sorted = part === 1 ? sortBlocks(blocks) : sortBlocks2(blocks);
    return sorted.reduce((acc, curr, currIndex) => curr > -1 ? curr * currIndex + acc : acc, 0);
}

function sortBlocks(blocks: number[]): number[]{
    const nonEmptyBlocks = blocks.filter(n => n !== -1);
    const l = nonEmptyBlocks.length
    const res: number[] = [];
    for (let i = 0; i < l; i++) {
        res.push(blocks[i] === -1 ? nonEmptyBlocks.pop()! :  blocks[i]);
    }
    return [...res, ...blocks.filter(n => n < 0)];
}

function sortBlocks2(blocks: number[]): number[]{
    const fileIds = [...new Set(blocks.filter(n => n > -1))];
    fileIds.sort((a,b) => b -a).forEach(fileId => {
        const fileStartIndex = blocks.indexOf(fileId);
        const fileEndIndex = blocks.lastIndexOf(fileId);
        let fileMoved = false;
        for (let i = 0; i < fileStartIndex; i++){ 
            //only move files left
            if(fileMoved) break;
            if (blocks[i] === -1){
                //get size of free block
                let j = i;
                while(blocks[j] === -1) j++;
                const freeSize = j - i;
                const fileSize = fileEndIndex - fileStartIndex + 1;
                if(fileSize <= freeSize){
                    //swap file to free block
                    for(let q = i; q < i + (fileSize); q++){
                        blocks[q] = fileId;
                    }
                    for(let q = fileStartIndex; q <= fileEndIndex; q++){
                        blocks[q] =-1;
                    }
                    fileMoved = true;
                }
            }
        }
    });
    return blocks;
}

import { assertEquals } from "jsr:@std/assert";

Deno.test("part 1", () => {
    const testInput = Deno.readTextFileSync(`input/${day}.test.txt`);
    assertEquals(solve1(testInput), 1928);
})

Deno.test("part 2", () => {
    const testInput = Deno.readTextFileSync(`input/${day}.test.txt`);
    assertEquals(solve2(testInput), 2858);
})