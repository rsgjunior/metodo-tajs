import { expect, it } from '@jest/globals';

function sum(x, y) {
    return x + y;
}

it('should return the sum of two numbers', () => {
    expect(sum(1, 2)).toBe(3);
});