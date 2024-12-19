//pretty console logs, less typing
// Charles Gross

const { printLog, printError, printInfo, printWarn} = require('./util/globals');

class Logger {

    constructor() {

    }
    log = (msg, color, bgColor) => {
        printLog(msg, color, bgColor);

        return this;
    }

    error = (msg) => {

       printError(msg);
       return this;
    }

    info = (msg) => {

        printInfo(msg);
        return true;
    }

    warn = (msg) => {
        printWarn(msg);
        return true;
    }

    #infoInstuctions = () => {
        this.info('I log info [ info(message) ] messages to have a grey background and white text!');
        this.info(['sending', 'an array', 'of info messages', 'works too']);
        return this;
    }

    #warnInstructions = () => {
        this.warn('I log warn [ warn(message) ] messages to have a white background and magenta text!');
        this.warn(['sending', 'an array', 'of warn messages', 'works too']);
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
            this.#infoInstuctions();
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        } try {
            this.#warnInstructions();
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
        }try {
            this.log(['sending', 'an array', 'of info messages', 'works too'], 'white', 'bgBlue');
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        } try {

            this.log('Instructions Above', 'yellow', 'bgBlue')
            return true;
        } catch (e) {
            this.error('Logger ran into an error:')
            this.error(e);
            return false;
        }
    }
}

module.exports = new Logger();