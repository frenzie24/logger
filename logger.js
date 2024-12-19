//pretty console logs, less typing
// Charles Gross

const {cols, colorsHook, colorLine, findColor, sepLength} = require('./util/globals');
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
        process.stdout.write(findColor(findColor(msg, 'yellow'), 'bgBlack') + `\n`);
        return this;
    }

    error = (msg) => {

        const sep = findColor(findColor('█', 'brightRed'), 'bgBrightYellow').repeat(msg.length > cols ? cols : msg.length);

        let sepB = findColor(findColor('▀', 'brightRed'), 'bgBrightYellow');
        if (Array.isArray(msg)) {
            logArray(msg, 'brightRed', 'bgBrightYellow');
        }
        // sep = sep;
        sepB = sepB.repeat(msg.length > cols ? cols : msg.length);
        msg = colorsHook.bgBrightYellow(colorsHook.brightRed(msg));
        process.stderr.write(sep + '\n' + msg + '\n' + sep);
        return this;
    }

    highlight = (msg) => {

        if (Array.isArray(msg)) {
            logArray(msg, 'black', 'bgBrightYellow');
        }
        process.stdout.write(findColor(findColor(msg, 'black'), 'bgBrightYellow') + `\n`);
        return this;
    }

    info = (msg) => {


        //  const msgLength = Array.isArray(msg) ? msg.find((msg)=> msg.length)
        const sep = findColor(findColor('▄', 'white'), 'bgBlack').repeat(msg.length > cols ? sepLength : msg.length);
        const sepB = findColor(findColor('▀', 'bgBlack'), 'white').repeat(msg.length > cols ? sepLength : msg.length) + '\n';


        // top seperator
        //sep = sep.;
        //bottom seperator
        // sepB = sepB;
        // process.stdout.write(`${sep}+\n`)
        console.log(`sepLength: ` + sepLength, `msg.length: ` + msg.length);
        if (Array.isArray(msg)) {
            logArray(msg, findColor('white'), findColor('bgGray'), sep, sepB);
            //process.stdout.write(msg);
        } else process.stdout.write(msg = colorsHook.bgGray(colorsHook.white(sep + '\n' + msg + '\n' + sepB)));

        //  process.stdout.write(`${sep}+\n\n`)
        return true;
    }

    warn = (msg) => {
        let sep = findColor(findColor('▄', 'magenta'), 'bgBlack');
        let sepB = findColor(findColor('▀', 'magenta'), 'bgBlack');
        sep = sep.repeat(msg.length > cols ? cols : msg.length);
        sepB = sepB.repeat(msg.length > cols ? cols : msg.length);
        msg = colorsHook.bgWhite(colorsHook.magenta(sep + '\n' + msg + '\n' + sepB));
        process.stdout.write('\n' + msg + '\n');
        return this;
    }

    setTheme = (color, bgColor) => {
        color ? color.includes('bg') ? this.#bgColor = color : this.#color = color : -1;
        bgColor ? this.#bgColor = bgColor : -1;
        return this;
        //        this.#color = color ? color : this.#color;

    }


    infoInstuctions = () => {
        this.info('I log info [ info(message) ] messages to have a grey background and white text!');
        this.info(['sending', 'an array', 'of messages', 'works too']);
        return this;
    }

    help = () => {
        // log is the most robust function logger has and using it in your js is as easy as
        try {
            this.log("Hi there! I'm Logger!", 'brightYellow');
            // this will print 'Hi There! I'm logger!' with yellow text and a green background
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        } try {
            this.infoInstuctions();
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        } try {

            this.warn('I log warn [ warn(message) ] messages to have a white background and magenta text!');
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        } try {

            this.error('I log error [ error(message) ] messages to have a yellow background and red text!');
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        } try {

            this.highlight('\nI can add a bright yellow background and convert your text to black to simulate highlighting with highlight(msg)\n')
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        } try {
            this.log(['I hope I can make debugging CLI a little easier!',
                'To install, run [npm install @frenzie24/logger] in your project root',
                'in the file you need logger add:',
                'const {log, info, warn, error} = require(\'@frenzie24/logger\')',
                'start logging with white text and a gray background by:',
                `log('hello world!', 'white', 'bgGray');`,
            ], ['white', 'blue', 'blue', 'blue', 'blue', 'blue', 'magenta'], ['bgBlue', 'bgWhite', 'bgWhite', 'bgWhite', 'bgWhite', 'bgWhite', 'bgBlack', 'bgWhite', 'bgWhite', 'bgBlack', 'bgWhite', 'bgWhite', 'bgBlack']);
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        } try {

            this.log('Instructions Above', 'green', 'bgBlack')
            return true;
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        }
    }
}

const _logger = new Logger();
_logger.infoInstuctions().infoInstuctions();
module.exports = new Logger();