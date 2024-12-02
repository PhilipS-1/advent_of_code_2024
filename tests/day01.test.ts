import {solve1, solve2} from '../src/day01';
import * as fs from 'fs';

describe('Day 1', () => {
    it('should solve part 1', () => {
        const testInput = fs.readFileSync('input/day01.test.txt', 'utf-8');
        const result = solve1(testInput);
        expect(result).toBe(11); // Replace 42 with the expected output
    });

    it('should solve part 2', () => {
        const testInput = fs.readFileSync('input/day01.test.txt', 'utf-8');
        const result = solve2(testInput);
        expect(result).toBe(31);
    });
});
