Data Types in JS

Number - Js has one number type, some languages has two like floats in c++. Numbers that are in JS are positive, negative, whole numbers (integers), and decimals. 

String - Strings of characters, strings are another primitive type in JavaScript. They represent text, and must be wrapped in quotes.

Boolean - true or false value

Null - Intentional absence of any value

Null Example: 

- 'let loggedInUser = null; //value is explicitly nothing'

  'loggedInUser = "Alan Rickman";'

  You can set a variable null just to keep it empty to use it later.

Undefined - Variables that do not have an assigned value are undefined.

Undefined Example: 

- '"hello"[99]' // Undefined

  Its basically JS way of saying I don't know the value you are trying to grab, it is undefined.

- Console has RELP, Read Evaluate Loop and Print.

The Remainder Operator (Module %)

Example: 9 % 2

How many times does a whole number of 2 go into 9? 

It goes in 4 times and the remainder is 1. 9 - 8 = 1.

Module is commonly used to determine if a number is even or odd.

Example: We can take any number and mod it by 2 and if the remainder will return a 1 is it a odd number. If its a even number the remainder with return a 0.

NaN (Not A Number) 

Is a numeric value that represents something that is.... not a number.

Examples: 0/0 // NaN, 1 + NaN //NaN

In JS, NaN is part of the number type group, you can check this by doing console.log(typeof NaN); and the output with be "number"

Math.random() gives you a number through 0 to 0.9. We can use Math.floor() to chop of the decimal values

Example:

const step1 = Math.random(); // 0.59611

const step2 = step1 * 10; // 5.9611

const step3 = Math.floor(step2); // 5

Const step4 = step3 + 1; // 6

Math.floor(Math.random() * 10) + 1;

