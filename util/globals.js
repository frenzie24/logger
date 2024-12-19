
class GLOBALS {
    // consts
    //#region Globals

    #cols = process.stdout.columns - 1;
    #sepLength = process.stdout.columns / 2;
   // #colors = require("colors");
   asyncconstructor () {
        const load =  () => {
            this.#cols = process.stdout.columns - 1;
            this.#sepLength = process.stdout.columns / 2;
            this.colors = require('colors')
        }
        await load();
       // this.#colors = require("colors");
    }

    // FUNCTIONS

    // returns number of columns in cli windows - 1
    cols = () => {
        return this.#cols;
    }

    // colors a line of text
    colorLine = (line, color) => {
        const newLine = findColor(line, color);
        return newLine;
    }

    // hook to colors.js api
    colorsHook = () => {
        return colors;
    }

    // returns the length value of the longest string in an array of strings
    findLongestStringLength = (stringArr) => {
        try {
            if (Array.isArray(stringArr)) {
                // nothing is being passed!!!!
                _validArr = stringArr.map((str, idx) => {
                    const isString = validateType(str, 'string') ? str : new Error();
                });
                const longest = stringArr.reduce((longest, current) => {
                    return current.length > longest.length ? current : longest;
                });
                return longest;
            } else return new Error('findLongestStringLength must have an array of strings passed as only arguement.')
        } catch (e) { }
    }

    // returns the message text with passed color
    findColor(msg, color) {
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

    // handle's printing passed array's of strings
    logArray = (msg, color, bgColor, sep, sepB) => {
        let separator = sep ? sep : `=`;
        let separatorB = sepB ? sepB : '=';
        // always check for text color first
        if (sep === '=' && sepB === '=') {
            separator = findColor(separator, bgColor ? Array.isArray(bgColor) ? bgColor[0] : bgColor : color ? Array.isArray(color) ? color[0] : color : '').repeat(sepLength);
            separatorB = findColor(separator, bgColor ? Array.isArray(bgColor) ? bgColor[0] : bgColor : color ? Array.isArray(color) ? color[0] : color : '').repeat(sepLength);
        }
        checkColorsArray = (c) => {
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
        msg = color ? checkColorsArray(color) : checkColorsArray(['white']);
        msg = bgColor ? checkColorsArray(bgColor) : checkColorsArray(['bgGray']);

        msg.forEach((line, index) => {
            if (index === 0) line = `${separator}\n${line}`;
            if (index === msg.length - 1) line = `${line}\n${separatorB}`;
            process.stdout.write(line + '\n')
        })

    }

    // validates type
    validateType = (data, type) => {
        if (typeof data == type) {
            return true;
        } else {
            throw new Error(`Types do not match!\n\n${typeof data} != ${type}`);
        }

        //return typeof data == type ? true : new Error(`Types do not match!\n\n${typeof data} != ${type}`)
    }

    sepLength = () => {
        return this.#sepLength;
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
