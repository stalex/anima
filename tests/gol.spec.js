import {randomIntLess, seed} from "../src/gol";

describe('randomIntLess', () => {
    const seed = new Array(100).fill(0).map(() => randomIntLess(4));
    console.log(seed);
    it('contains boundary', () => {
        expect(seed).toEqual(expect.arrayContaining([0, 1, 2, 3]));
    });
    it('less then max allowed', () => {
        expect(seed).toEqual(expect.not.arrayContaining([4]));
    });
});