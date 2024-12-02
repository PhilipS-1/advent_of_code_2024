import fs from "fs";
import {solve1, solve2} from "../src/day02";

describe('Day 2', () => {
    it('should solve part 1', () => {
        const testInput = fs.readFileSync('input/day02.test.txt', 'utf-8');
        const result = solve1(testInput);
        expect(result).toBe(2); // Replace 42 with the expected output
    });

    it('should solve part 2', () => {
        const testInput = fs.readFileSync('input/day02.test.txt', 'utf-8');
        const result = solve2(testInput);
        expect(result).toBe(4);
    });
});