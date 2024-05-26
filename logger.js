
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

    // always check for text color first
    checkColorsArray = (c) => {
        let t = [];
        if (Array.isArray(c)) {
            if (c.length <= msg.length)
                if (msg.length == c.length) {
                    msg = msg.map((line, index) => {
                        t.push(findColor(line, c[index]));
                    })
                } else {
                    msg.map((line, index) => {
                        t.push(findColor(line, c[index % c.length]));
                    })
                }
        } else {
            msg.map(line => {
                t.push(findColor(line, c));
            })
        }
        return t;
    };
    msg = color ? checkColorsArray(color) : checkColorsArray(['white']);
    msg = bgColor ? checkColorsArray(bgColor) : checkColorsArray(['bgGray']);


    msg.forEach((line, index) => {
        if (index === 0) line = '\n'+line;
        if (index === msg.length - 1) line += '\n';
        console.log(line);
    })

}

class Logger {
    constructor() { }

    log = (msg, color, bgColor) => {

        if (Array.isArray(msg)) {

            logArray(msg, color, bgColor)

            return;
        }
        if (color) msg = findColor(msg, color);
        if (bgColor) msg = findColor(msg, bgColor);
        console.log(findColor(findColor(msg, 'white'), 'bgBlack'));
    }

    error = (msg) => {
        msg = colors.bgBrightYellow(colors.brightRed(msg));
        console.error(msg);
    }

    highlight=(msg, bgColor) => {
        if(!bgColor) {
            bgColor = 'bgBrightYellow';

            console.log(findColor(findColor(msg, 'bgBrightYellow'), 'black'));
        }
        if(Array.isArray(msg)) {
            logArray(msg, bgColor);
        }
    }

    info = (msg) => {
        msg = colors.bgGray(colors.white(msg));
        if (Array.isArray(msg)) {
            console.info(msg);
        } else console.info(msg)
    }

    warn = (msg) => {
        msg = colors.bgWhite(colors.magenta(msg));
        console.warn(msg);
    }



    help = () => {

        // log is the most robust function logger has and using it in your js is as easy as
        this.log("Hi there! I'm Logger!", 'brightYellow');
        // this will print 'Hi There! I'm logger!' with yellow text and a green background

        this.info('I log info [ info(message) ] messages to have a grey background and white text!');

        this.warn('I log warn [ warn(message) ] messages to have a white background and magenta text!');

        this.error('I log error [ error(message) ] messages to have a yellow background and red text!');


        this.log(['I hope I can make debugging CLI a little easier!',
            'To install, run [npm install @frenzie24/logger] in your project root',
            'in the file you need logger add:', 
            'const {log, info, warn, error} = require(\'@frenzie24/logger\')',
            'start logging with white text and a gray background by:',
            `log('hello world!', 'white', 'bgGray');`,
            '\nHappy logging!'], ['white', 'blue', 'blue', 'blue', 'blue', 'blue', 'magenta'], ['bgBlue', 'bgWhite', 'bgWhite', 'bgWhite','bgWhite', 'bgWhite', 'bgBlack']);

    }
}


module.exports = new Logger();