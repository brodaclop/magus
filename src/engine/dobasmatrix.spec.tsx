import { DobasMatrix } from './dobasmatrix';

describe('dobasmatrix', () => {
    it('creates empty matrix', () => {
        const m = new DobasMatrix(['a', 'b', 'c']);
        expect(m.keys).toEqual(['a', 'b', 'c']);
        expect(m.sum).toEqual({});
        expect(m.values).toEqual({});
    });
    it('handles constant rolls', () => {
        const m = new DobasMatrix(['a', 'b', 'c']);
        m.add('constant', { a: '4', b: '5', c: '6' });
        m.roll();
        expect(m.sum).toEqual({ a: 4, b: 5, c: 6 });
    });
    it('calculates sums', () => {
        const m = new DobasMatrix(['a', 'b', 'c']);
        m.add('constant', { a: '4', b: '5', c: '6' });
        m.add('constant2', { a: '4', b: '5', c: '6' });
        m.roll();
        expect(m.sum).toEqual({ a: 8, b: 10, c: 12 });
    });
})