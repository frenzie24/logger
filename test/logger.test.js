const { help, log, info, warn, error, validateType } = require('../logger');
//const  =
describe('Logger', () => {
    describe('help', () => {
        it('should return true if full instructions print', () => {
            const test = help();
            expect(test).toBe(true)
        })
    })

    describe('infoString', () => {
        it('should return true if string sent prints', () => {
            const test = info('Info test');
            expect(test).toBe(true)
        })
    })

    describe('infoArray', () => {
        it('should return true if array sent prints', () => {
            const test = info(['Info test', 'Info test', 'Info test', 'Info test']);
            expect(test).toBe(true)
        })
    })

    describe('validateType', () => {
        it('should return true if (typeof data) and type are equal values', () => {
            const test = info(['Info test', 'Info test', 'Info test', 'Info test']);
            expect(test).toBe(true)
        })

        it('should throw an Error if (typeof data) and type are not equal values', () => {
            const data = Number(5);
            const type = 'string';
            const vT = () => validateType(data, type);
            const expectedErr = new Error(`Types do not match!\n\n${typeof data} != ${type}`);

            expect(vT).toThrow(expectedErr);
        })
    })
})