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
})