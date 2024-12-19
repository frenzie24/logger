
// returns the message text with passed color
const colors = require('colors');
const _symbols = ['!', '%', '=', '$']
const UHOH = 'OOPS';
const defaultColor = 'green';
const defaultBg = 'bgBlack';

const getRandomGenericSymbol = () => {
    const idx = Math.floor(Math.random(4));
    return _symbols[idx] ? _symbols[idx] : UHOH;
}
/*
const checkColorsArray = (msg, c) => {
    let t = [];
    if (Array.isArray(c)) {

        if (msg.length == c.length) {
            msg = msg.map((line, index) => {
                //   line.length > sepLength ? sepLength = line.length : -1;
                const newLine = colorLine(line, c[index])
                return t.push(newLine);
            })
        } else {
            msg.map((line, index) => {
                //   line.length > sepLength ? sepLength = line.length : -1;
                return t.push(findColor(line, c[index % c.length]));
            })
        }
    } else {
        msg.map(line => {
            //    line.length > sepLength ? sepLength = line.length : -1;
            return t.push(findColor(line, c));
        })
    }
    return t;
};
*/

const findColor = (msg, color) => {
    switch (color) {
        case `black`: return colors.black(msg);
        case `red`: return colors.red(msg);
        case `green`: return colors.green(msg);
        case `yellow`: return colors.yellow(msg);
        case `blue`: return colors.blue(msg);
        case `magenta`: return colors.magenta(msg);
        case `cyan`: return colors.cyan(msg);
        case `white`: return colors.white(msg);
        case `gray`: return colors.gray(msg);
        case `grey`: return colors.grey(msg);
        case `brightRed`: return colors.brightRed(msg);
        case `brightGreen`: return colors.brightGreen(msg);
        case `brightYellow`: return colors.brightYellow(msg);
        case `brightBlue`: return colors.brightBlue(msg);
        case `brightMagenta`: return colors.brightMagenta(msg);
        case `brightCyan`: return colors.brightCyan(msg);
        case `brightWhite`: return colors.brightWhite(msg);
        case `bgBlack`: return colors.bgBlack(msg);
        case `bgRed`: return colors.bgRed(msg);
        case `bgGreen`: return colors.bgGreen(msg);
        case `bgYellow`: return colors.bgYellow(msg);
        case `bgBlue`: return colors.bgBlue(msg);
        case `bgMagenta`: return colors.bgMagenta(msg);
        case `bgCyan`: return colors.bgCyan(msg);
        case `bgWhite`: return colors.bgWhite(msg);
        case `bgGray`: return colors.bgGray(msg);
        case `bgGrey`: return colors.bgGrey(msg);
        case `bgBrightRed`: return colors.bgBrightRed(msg);
        case `bgBrightGreen`: return colors.bgBrightGreen(msg);
        case `bgBrightYellow`: return colors.bgBrightYellow(msg);
        case `bgBrightBlue`: return colors.bgBrightBlue(msg);
        case `bgBrightMagenta`: return colors.bgBrightMagenta(msg);
        case `bgBrightCyan`: return colors.bgBrightCyan(msg);
        case `bgBrightWhite`: return colors.bgBrightWhite(msg);
        default: return msg;
    }
}

//#region class GLOBALS {

class GLOBALS {
    // consts
    #cols = process.stdout.columns - 1;
    #sepLength = process.stdout.columns / 2;
    #halfSep = process.stdout.columns / 2;


    constructor() {
        this.#cols = process.stdout.columns - 1;
        this.#sepLength = process.stdout.columns / 2;
    }

    // FUNCTIONS
    #compareLength = (length) => {
        return length > this.#sepLength ? length : this.#sepLength;
    }

    // reuturns formatted type after validating the val is printable. forced to a random
    #formatForPrint = (val) => {
        const type = (typeof val);
        // if val is a string, return val
        // else if val is an object, return stringified val
        // else try to force val to be a string
        if (type == 'string') {
            return val;
        } else if (type == 'object') {
            const formattedObj = JSON.stringify(val, null, 2);
            return formattedObj;
        } else {
           return val;
        }
    }


    genSeperatorLines = (color, bgColor, symbols, type) => {
        switch (type) {
            case 'info':
                color = 'white';
                bgColor = 'bgBlack'

                break;
            case 'error':
                color = 'brightYellow';
                bgColor = 'bgRed'
                break;
            case 'warn':
                color = 'magenta';
                bgColor = 'bgBlack'
                break;
            default:
                color = 'white';
                bgColor = 'bgGray'
                break;
        }

        const newColor = color ? color : defaultColor;
        const newBgColor = color ? bgColor : defaultBg;

        if (!symbols) {
            symbols = {
                top: '▄',
                bottom: '▀'
            };
        }
        const getLine = (symbol, color, bgColor) => {
            const line = this.#genSeperatorLine(symbol, this.#sepLength, color, bgColor);
            return line;
        }
        const sepT = getLine(symbols.top, this.#sepLength, newColor, newBgColor);
        const sepB = getLine(symbols.bottom, this.#sepLength, newColor, newBgColor);
        return { top: sepT, bottom: sepB };

    }


    #genSeperatorLine = (symbol, length, color, bgColor) => {
        const newColor = color ? color : defaultColor;
        const newBgColor = color ? bgColor : defaultBg;
        const symbols = symbol.repeat(length);
        const line = this.colorLine(symbols, newColor, newBgColor);
        return line;
    }

    // returns the length value of the longest string in an array of strings, otherwise returns length of string
    getGreatestLength = (string) => {
        try {
            if (Array.isArray(string)) {
                // map the string array and

                const longest = stringArr.reduce((longest, current) => {
                    return current.length > longest.length ? current : longest;
                });
                return longest;
            } else return string.length;
        } catch (e) { process.stdout.write('\n') }
    }


    // handle's printing passed array's of strings
    logArray = (msg, color, bgColor, separators) => {

        process.stdout.write(`${separators.top}\n`)
        const space = ` `;
        const log = msg.map((line) => {
            const newLine = findColor(findColor(line, color, bgColor));
            const count = this.#sepLength - line.length - 1;
            const padding = space.repeat(count);
            process.stdout.write(`${newLine}${padding}\n`);
            return newLine;
        })
        process.stdout.write(`${separators.bottom}\n`)


    }


    printError = (log) => {
        const msg = this.#validateAndPrep(log, 'brightYellow', 'bgRed');
        const separators = this.genSeperatorLines(null, null, null, 'error');
        if (Array.isArray(msg))
            this.logArray(msg, 'brightYellow', 'bgRed', separators);
        else {

            process.stdout.write(`${separators.top}\n${msg}\n${separators.bottom}\n`)
        }
    }


    printInfo = (log) => {

        const msg = this.#validateAndPrep(log, 'white', 'bgGray');
        const separators = this.genSeperatorLines('info');
        if (Array.isArray(msg))
            this.logArray(msg, 'white', 'bgGray', separators);
        else {

            process.stdout.write(`${separators.top}\n${msg}\n${separators.bottom}\n`)
        }
    }


    printLog = (log, color, bgColor) => {
        try {
            const newLog = this.#validateAndPrep(log, color, bgColor);
            if (Array.isArray(newLog)) {
                const separators = this.genSeperatorLines(color, bgColor);
                this.logArray(newLog, color, bgColor, separators);

            } else {
                const line = findColor(findColor(newLog, color), bgColor);
                process.stdout.write(line + '\n');
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    printWarn = (log) => {

        const msg = this.#validateAndPrep(log, 'magenta', 'bgBlack');
        const separators = this.genSeperatorLines(null, null, null, 'warn');
        if (Array.isArray(msg))
            this.logArray(msg, 'magenta', 'bgBlack', separators);
        else {

            process.stdout.write(`${separators.top}\n${msg}\n${separators.bottom}\n`)
        }
    }

    #setSepLength = (val) => {
        const length = Math.floor(Number(val));
        if (length) {
            this.#sepLength = length;
            return true;
        } else return false;
    }

    sepLength = (arr) => {
        const length = this.getGreatestLength(arr);
        this.#setSepLength(this.#compareLength(length));
    }



    #validateAndPrep = (val, color, bgColor) => {
        // if arr is an array, do work else return unmodified

        const newColor = color ? color : defaultColor;
        const newBgColor = bgColor ? bgColor : defaultBg;
        this.#sepLength = this.#compareLength(this.getGreatestLength(val))

        if (Array.isArray(val)) {
            const result = val.map((entry, index) => {
                // if entry is defined & !null do work, else return a random symbol as the 'newEntry'
                if (entry) {
                    const valEntry = this.#formatForPrint(entry);
                    const newEntry = findColor(findColor(valEntry, newColor), newBgColor);
                    return newEntry;
                } else return entry;
            });
            return result;
        } else {
            const formatVal = this.#formatForPrint(val);
            const colorVal = findColor(formatVal, newColor);
            const bgVal = findColor(colorVal, newBgColor);
            return bgVal;
        }
    }

}

/*
old
const GLOBALS = () => {
    // CONSTANTS
    // number of columns in cli window -1





    //#endregion
}
    */

module.exports = new GLOBALS();
