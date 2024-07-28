import { it, describe, expect } from 'vitest';
import { mult } from '../utils/helper'

describe('mult()', () => {
    it('Should return an item name in the singular form if the provided count is 1.', () => {
        const item = 'item';
        const count = 1;

        const result = mult(item, count);

        expect(result).toBe(item);
    });

    it('Sould return an item name in the plural form if the provided count is not 1.', () => {
        const item = 'item';
        const count = 2;
        const expected = item + 's';

        const result = mult(item, count);

        expect(result).toBe(expected);
    });
});