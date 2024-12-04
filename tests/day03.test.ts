import { solve1, solve2 } from "../src/day03";
import fs from "fs";

describe('Day 2', () => {
    it('should solve part 1', () => {
        const testInput = fs.readFileSync('input/day03.test.txt', 'utf-8');
        const result = solve1(testInput);
        expect(result).toBe(161); // Replace 42 with the expected output
    });

    it('should solve part 2', () => {
        const testInput = fs.readFileSync('input/day03.test.txt', 'utf-8');
        const result = solve2(testInput);
        expect(result).toBe(48);
    });
});