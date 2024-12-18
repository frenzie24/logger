
const colors = require("colors");

function findColor(msg, color) {
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

//pretty console logs, less typing


const logArray = (msg, color, bgColor) => {
    let separator = `=`;
    // always check for text color first
    let separatorLength = process.stdout.columns - 1;
    separator = findColor(separator, bgColor ? Array.isArray(bgColor) ? bgColor[0] : bgColor : color ? Array.isArray(color) ? color[0] : color : '');
    checkColorsArray = (c) => {

        let t = [];
        if (Array.isArray(c)) {

            if (msg.length == c.length) {
                msg = msg.map((line, index) => {
                    //   line.length > separatorLength ? separatorLength = line.length : -1;
                    t.push(findColor(line, c[index]));
                })
            } else {
                msg.map((line, index) => {
                    //   line.length > separatorLength ? separatorLength = line.length : -1;
                    t.push(findColor(line, c[index % c.length]));
                })
            }
        } else {
            msg.map(line => {
                //    line.length > separatorLength ? separatorLength = line.length : -1;
                t.push(findColor(line, c));
            })
        }
        return t;
    };
    msg = color ? checkColorsArray(color) : checkColorsArray(['white']);
    msg = bgColor ? checkColorsArray(bgColor) : checkColorsArray(['bgGray']);

    msg.forEach((line, index) => {
        if (index === 0) line = `${separator.repeat(separatorLength)}\n${line}`;
        if (index === msg.length - 1) line = `${line}\n${separator.repeat(separatorLength)}`;
         process.stdout.write(line+'\n')
        //console.log(line);
    })

}


class Logger {
    #color;
    #bgColor;
    constructor() {

        this.#color = 'brightYellow';
        this.#bgColor = 'bgBlack';

    }
    log = (msg, color, bgColor) => {

        if (Array.isArray(msg)) {

            logArray(msg, color ? color : this.#color, bgColor ? bgColor : this.#bgColor)

            return;
        }
        if (color) msg = findColor(msg, this.#color); else msg = findColor(msg, this.#color);
        if (bgColor) msg = findColor(msg, this.#bgColor); else msg = findColor(msg, this.#bgColor);
        console.log(findColor(findColor(msg, 'yellow'), 'bgBlack'));
        return this;
    }

    error = (msg) => {

        let sep = findColor(findColor('█', 'brightRed'), 'bgBrightYellow');

        let sepB = findColor(findColor('▀', 'brightRed'), 'bgBrightYellow');
        if (Array.isArray(msg)) {
            logArray(msg, 'brightRed', 'bgBrightYellow');
        }
        sep = sep.repeat(msg.length > process.stdout.columns ? process.stdout.columns : msg.length);
        sepB = sepB.repeat(msg.length > process.stdout.columns ? process.stdout.columns : msg.length);
        msg = colors.bgBrightYellow(colors.brightRed(msg));
        console.error(sep + '\n' + msg + '\n' + sep);
        return this;
    }

    highlight = (msg) => {

        if (Array.isArray(msg)) {
            logArray(msg, 'black', 'bgBrightYellow');
        }
        console.log(findColor(findColor(msg, 'black'), 'bgBrightYellow'));
        return this;
    }

    info = (msg) => {

        let sep = findColor(findColor('▄', 'white'), 'bgBlack');
        let sepB = findColor(findColor('▀', 'white'), 'bgBlack');

        sep = sep.repeat(msg.length > process.stdout.columns ? process.stdout.columns : msg.length);
        sepB = sepB.repeat(msg.length > process.stdout.columns ? process.stdout.columns : msg.length);
        msg = colors.bgGray(colors.white(sep + '\n' + msg + '\n' + sepB));
        if (Array.isArray(msg)) {
            console.info(msg);
        } else console.info('\n' + msg + '\n')
        return this;
    }

    warn = (msg) => {
        let sep = findColor(findColor('▄', 'magenta'), 'bgBlack');
        let sepB = findColor(findColor('▀', 'magenta'), 'bgBlack');
        sep = sep.repeat(msg.length > process.stdout.columns ? process.stdout.columns : msg.length);
        sepB = sepB.repeat(msg.length > process.stdout.columns ? process.stdout.columns : msg.length);
        msg = colors.bgWhite(colors.magenta(sep + '\n' + msg + '\n' + sepB));
        console.warn('\n' + msg + '\n');
        return this;
    }

    setTheme = (color, bgColor) => {
        color ? color.includes('bg') ? this.#bgColor = color : this.#color = color : -1;
        bgColor ? this.#bgColor = bgColor : -1;
        return this;
        //        this.#color = color ? color : this.#color;

    }




    help = () => {

        // log is the most robust function logger has and using it in your js is as easy as
        this.log("Hi there! I'm Logger!", 'brightYellow');
        // this will print 'Hi There! I'm logger!' with yellow text and a green background

        this.info('I log info [ info(message) ] messages to have a grey background and white text!');

        this.warn('I log warn [ warn(message) ] messages to have a white background and magenta text!');

        this.error('I log error [ error(message) ] messages to have a yellow background and red text!');

        this.highlight('\nI can add a bright yellow background and convert your text to black to simulate highlighting with highlight(msg)\n')

        this.log(['I hope I can make debugging CLI a little easier!',
            'To install, run [npm install @frenzie24/logger] in your project root',
            'in the file you need logger add:',
            'const {log, info, warn, error} = require(\'@frenzie24/logger\')',
            'start logging with white text and a gray background by:',
            `log('hello world!', 'white', 'bgGray');`,
        ], ['white', 'blue', 'blue', 'blue', 'blue', 'blue', 'magenta'], ['bgBlue', 'bgWhite', 'bgWhite', 'bgWhite', 'bgWhite', 'bgWhite', 'bgBlack', 'bgWhite', 'bgWhite', 'bgBlack', 'bgWhite', 'bgWhite', 'bgBlack']);

        this.log('Happy Logging!')
        return this;

    }
}

module.exports = new Logger();