import { solve } from '../src/day01';
import * as fs from 'fs';

describe('Day 1', () => {
    it('should solve with the test input', () => {
        const testInput = fs.readFileSync('input/day01.test.txt', 'utf-8');
        const result = solve(testInput);
        expect(result).toBe(42); // Replace 42 with the expected output
    });
});
