[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Logger

## Contents
- - - - - - - - 
[DESCRIPTION](#DESCRIPTION)

[INSTALLATION](#INSTALLATION)

[USAGE](#USAGE)

[LICENSE](#LICENSE)

[CONTRIBUTING](#CONTRIBUTING)

[TESTS](#TESTS)

[GITHUB](#GITHUB)

[QUESTIONS](#QUESTIONS)

## DESCRIPTION
logger is a package designed to help make critical text in CLI app's 
output easy to quickly visually find, highlight and color messages for debugging nerds like us

## INSTALLATION
### Steps

- Ensure you have **[nodejs](https://nodejs.org)** installed and set up
- In your terminal open the root of the project you'd like to add logger to
- run 
```
npm i @frenzie24/logger
```

Thanks for installing!

## USAGE
logger works by helping enhance your CLI output.
### Basic Usage
#### To include in your workspace add 
```
const {log} = require('@frenzie24/logger');
```
#### To output to the console, call 
```
log(message/*string*/, color/*string||null*/, bgColor/*string||null*/)
```
#### logger has default functions you can add to the require statement for preformatting and coloring:
```
const {error} = require('@frenzie24/logger')
const {warn} = require('@frenzie24/logger')
const {info} = require('@frenzie24/logger')
```
#### logger's default functions
```
log(message/*string*/);
error(message/*string*/||error/*error obj*/);
info(message/*string*/);
warn(message/*string*/); 
```
	  

### color and bgColor
color and bgColor use predefined strings to pass to text colors and background colors.
logger uses the [colors](https://www.npmjs.com/package/colors) npm package's color string definitions.

### Definitions logger Supports as Arguments for color
#### text colors
* black
* red
* green
* yellow
* blue
* magenta
* cyan
* white
* gray
* grey
#### bright text colors
* brightRed
* brightGreen
* brightYellow
* brightBlue
* brightMagenta
* brightCyan
* brightWhite
### definitions logger supports as arguments for bgColor
#### background colors
* bgBlack
* bgRed
* bgGreen
* bgYellow
* bgBlue
* bgMagenta
* bgCyan
* bgWhite
* bgGray
* bgGrey
#### bright background colors
* bgBrightRed
* bgBrightGreen
* bgBrightYellow
* bgBrightBlue
* bgBrightMagenta
* bgBrightCyan
* bgBrightWhite

### Advanced Usage
logger's ```log()``` function is capable of rendering arrays of messages with default alternating text and background color
#### log an array with defaults: 
``` 
let arr = [0, 'hi!', {data: { a: 'Hello', b: 'World' }}, 3];
log(arr);
/*
 the output will be:
 0 with white text and gray background
hi! with gray text and white background
{
  data: {
	a: 'Hello',
	b: 'World',
	}
} this object will have white text and gray background
3 with gray text and white background
*/
```	
#### log an Array with a Single color and/or bgColor 
```
log(message/*array*/, color/*string||null*/, bgColor/*string||null*/)
```
#### log an Array With Multiple colors and bgColors
```
// we will reuse the array: arr[] from our earlier example
// this example color has the length as arr[]
let color = ['blue', 'red', 'green', 'magenta']; 
// color[]/bgColor[] can have LESS entries than the message[] but not MORE.
let bgColor = ['bgWhite', 'bgBrightBlue', 'bgYellow']; 
// when logger logs a message[] with more elements than a passed color[] or bgColor[], 
// then color[]/bgColor[] will restart at [0] and continue until every element in the passed message[] has been colored
log(arr, color, bgColor); 
/*output will be:
	blue text with white background, 
	red text with bright blue background,
	green text with yellow background,
	magenta text with white background
*/
```	
- logger uses colors.js as it's coloring engine and you can pass a colors styled string to logger.
- Please refer to the **[colors.js](https://github.com/Marak/colors.js) [documentation](https://github.com/Marak/colors.js#readme)** if you would like to use colors to pass custom styled messages to logger.
- logger does not account for the terminal that it is running in in regards to coloring.  You may experience issues depending on the terminal rendering certain colors with certain backgrounds.  I have found dedicated terminals work best with logger and the VSCode terminal working in most cases and combinations.
- logger colors messages on server consoles (such as render)

## LICENSE
This project uses the MIT license

## CONTRIBUTING
Feel free to clone logger and add to it!

Please document your changes, open a pull request, and I'll take a look and get in touch!

## TESTS

no tests have been written for logger *yet*


## GITHUB
https://github.com/frenzie24

## QUESTIONS
I can be reached by email:
kevincharlesgross@gmail.com

