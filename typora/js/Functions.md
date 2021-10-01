## Functions

Reusable procedures

- Functions allow us to write reusable, modular code
- We define a 'chunk' of code that we can then execute at a later point
- we use them ALL THE TIME!!

## DEFINE FUNCTIONS

```js
function funcName() {
  // do something
}
```

```js
function grumpus() {
	console.log('ugh...you again...');
	console.log('for the last time...');
	console.log('LEAVE ME ALONE!!!');
}
```

- Usually when naming functions, you would use camel casing.

# Calling Functions

```js
function grumpus() {
	console.log('ugh...you again...');
	console.log('for the last time...');
	console.log('LEAVE ME ALONE!!!');
}

grumpus();
```

Just like any other method we need the name of the function and then () parentheses. The parentheses is needed to call the function, but the arugment for a function is not need if there is no parameters in the function.

## Arguments

We can also write functions that accept inputs, called arguments. Example:

```js
function greet(person) {
	console.log(`hi, ${person}!`);
}
```

```js
greet('Arya');
// Output
"Hi, Arya!"
```

Function greet is created with a parameter called person, person is then taken to the console.log and used to create a greeting message. Whatever is put into the greet() argument (Between the parentheses) will be stored into person and used to create the console.log message.

## Multiple Parameters 

Functions can have multiple parameters. All theses parameters may be required to work or optional. Example:

```js
function repeat(str, numTimes) {
  let result = '';
  if (numTimes === undefined) {
    numTimes = 1;
  }
  for (let i = 0; i < numTimes; i++) {
    result += str;
  }
  console.log(result);
}

repeat('YES', 5);
// Output
YESYESYESYESYES

repeat('one');
// Output
one
```

The repeat function requires two parameters, a value and a integer value for the amount of times the loop will run. The str variable is then added to results and console.log() to output one string value. Even though we do have two parameters the numTimes by default will be 1, but once numTimes is specified in the argument then 1 is overwrited.

## Return KeyWord

Built-in methods return values when we call them. We can store thoses values:

```js
const yell = 'I will end you'.toUpperCase();

yell(); // "I WILL END YOU"

const idx = ['a', 'b', 'c'].indexOf('c');

idx; // 2 
```

## First RETURN

We can capture a return value in a variable!

```js
function add(x, y) {
  return x + y; // RETURN!!
}

const sum = add(10, 16);
sum; // 26

const answer = add(100, 200);
answer; // 300
```

- The return key can be used to export the values of the function and then can be stored into a variable or just be used.

- The return key can also stop the function from executing any further.

- ```js
  function add (x, y) {
    return x + y;
    console.log('END OF FUNCTION!!!!');
    // console.log won't be executed beacuse the return stops the code.
  }
  
  add(1, 2); // 3
  add(add(1, 2), 7); // 10
  ```

  ```js
  function add(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      return false;
    }
    return x + y;
  }
  
  add(2, '3'); // false
  add(2, 3); // 5
  ```

  Only one return can be executed, once one return is executed the whole function will stop and not continue.

## SCOPE

Variable "visibility"

The location where a variable is defined dictates where we can have access to that variable.

```js
function collectEggs() {
  totalEggs = 6;
}
collectEggs();
console.log(totalEggs);
// Output
ReferenceError: totalEggs is not defined
```

totalEggs can't be accessed from outside of the function because it's a function scope, it is delcared in the function and it is not a global variable.

```js
let totalEggs= 0;
function collectEggs() {
  totalEggs = 6;
}
console.log(totalEggs);
collectEggs();
console.log(totalEggs);
// Output
0 
6
```

Here because totalEggs is now a global function, we have access to totalEggs inside of the function and out.

## Function Scope

```js
function helpMe() {
  let msg = "I'm on fire!";
  msg; // "I'm on fire!";
}

msg; // Not DEFINED!
```

Msg is scoped to the helpMe function.

```js
let bird = 'Mocking';
function birdWatch() {
  let bird = 'Blue Eyes';
  console.log(bird);
}
console.log(bird); // "Mocking"
birdWatch(); // "Blue Eyes"
```

If there is a variable 'bird' in the function, that will automatically win out, but if there isnt a variable bird in the function, the bird outside global bird will be used instead.

## Block Scope

```js
let radius = 8;

if (radius > 0) {
  const PI = 3.14;
  let circ = 2 * PI * radius;
}

console.log(radius); // 8
console.log(PI); // NOT DEFINED
console.log(circ); // NOT DEFINED
```

PI and circle are scoped to the Block scope, it's the same idea of functions, but instead we are dealing with  conditions, loops. This only happens with let and const cause they are block scoped variables, but if we used var, this will work differently.

```js
for (let i = 0; i < 5; i++) {
	let msg = "ASKMEANYTHING";
  console.log(msg); // ASKMEANYTHING
}
console.log(msg); // msg IS NOT DEFINED
```

```js
for (var i = 0; i < 5; i++) {
	var msg = "ASKMEANYTHING";
  console.log(msg); // ASKMEANYTHING
}
console.log(msg); // ASKMEANYTHING
console.log(i); // 5
```

The var is function scoped, that means with block scopes like the for loop, the variable becomes accessable outside of the block scope, but with functions, it will only be accessed within the function.

```js
function newFunction() {
	var hello = 'hello';
  console.log(hello); // "hello"
}
console.log(hello); // hello is not defined
newFunction();
```

```js
var hello = 'hey hi';

function newFunction() {
	var hello = 'hello';
  console.log(hello); // "hello"
}
console.log(hello); // "hey hi"
newFunction();
```

Its the same thing will let that if there is a 'hello' within the function it is used first, but if there is no 'hello' scoped into the function it uses the hello outside of the function.

```js
var hello = 'hey hi';

function newFunction() {
  console.log(hello); // "hey hi"
}
console.log(hello); // "hey hi"
newFunction();
```

You can use the freeCodeCamp to also see the difference between var, let and const.

## Lexical Scope

functions can have accessed to other functions and variables as we go down the line of code, but a inner function or variable can not be access outside of that function.

```js
function bankRobbery() {
  const heroes = ['Spiderman', 'Batman'];
  let color = 'purple';
  function cryForHelp() {
    console.log(color);
    for (let hero of heroes) {
      console.log(`PLEASE HELP US, ${hero}`);
    }
  }
}
bankRobbery();
```

You see here that even if bankRobbery(); is ruined cryForHelp() isnt running, this is because we have to call out cryForHelp() inorder for it to be executed.

```js
function bankRobbery() {
  const heroes = ['Spiderman', 'Batman'];
  let color = 'purple';
  function cryForHelp() {
    console.log(color);
    for (let hero of heroes) {
      console.log(`PLEASE HELP US, ${hero}`);
    }
  }
}
cryForHelp(); // is not defined
```

You also can see here that even if we call cryForHelp() outside of the function it wont be called out beacuse it's only accessed within the function.

```js
function bankRobbery() {
  const heroes = ['Spiderman', 'Batman'];
  let color = 'purple';
  function cryForHelp() {
    console.log(color);
    for (let hero of heroes) {
      console.log(`PLEASE HELP US, ${hero}`);
    }
  }
  cryForHelp();
}
```

WTF, why isn't cryForHelp() be called? It's because we have to call bankRobbery() inorder for cryForHelp() to be called within the function.

```js
function bankRobbery() {
  const heroes = ['Spiderman', 'Batman'];
  let color = 'purple';
  function cryForHelp() {
    console.log(color); // purple
    for (let hero of heroes) {
      console.log(`PLEASE HELP US, ${hero}`);
    }
  }
  cryForHelp();
}
bankRobbery(); 
// Output
purple
PLEASE HELP US, Spiderman
PLEASE HELP US, Batman
```

YA! We finally got it to run, but if we make a variable with cryForHelp() and try to access it outside of the function.

```js
function bankRobbery() {
  const heroes = ['Spiderman', 'Batman'];
  let color = 'purple';
  function cryForHelp() {
    console.log(color); // purple
    let money = 100;
    for (let hero of heroes) {
      console.log(`PLEASE HELP US, ${hero}`);
      console.log(money);
    }
  }
  cryForHelp();
  console.log(money); // IS NOT DEFINED
}
bankRobbery(); 
// Output
purple
PLEASE HELP US, Spiderman
100
PLEASE HELP US, Batman
100
> ReferenceError: money is not defiend at bankRobbery
```

You can see that money cant be access outside of the function beacuse money is scoped to cryForHelp().

## Function Expression

Functions are values in js so, we can store them, pass them as an argument, return functions as a return value, just like arrays or any variable. 

```js
const add = function(x, y) {
	return x + y;
}
add(1, 2); // 3
```

We still call the they say way if we were to name the function instead of storing it.

```js
function add(x, y) {
  return x + y;
}
add(1, 2); // 3
```



## Higher Order Functions

Functions that operate on/ with other functions. They can:

- Accept other functions as arguments
- Return a function

```js
function callTwice(func) {
  func();
  func();
}

function rollDie() {
  const roll = Math.floor(Math.random() * 6) + 1;
  console.log(roll);
}

callTwice(rollDie()); // func is not a function

```

Here we are creating a function called 'rollDie()' and we are creating a variable called 'roll' that stores a random value 1 through 6 into it and is logged with console.log(roll);. We than call 'callTwice()' and call the function 'rollDie()', inside of 'callTwice()' which will give us a random value and try to call that random value as a function, which ends up giving us an error because numbers aren't functions.

```js
function callTwice(func) {
  func();
  func();
}

function rollDie() {
  const roll = Math.floor(Math.random() * 6) + 1;
  console.log(roll);
}

callTwice(rollDie);
// Output
6
4


```

See here istead we are passing rollDie as a function into 'callTwice' and then within the function of 'callTwice' we then are calling func() twice which is storing rollDie into it.

## Returning a Function

```js
function isBetween(num) {
  return num >= 50 && num <= 100;
}
isBetween(17); // false
```

```js
function isBetween2(num) {
  return num >= 1 && num <= 10;
}
isBetween2(17); // true
```

Here we are creating two functions that require a parameter that is returning a true boolean value back to the function if the whole conditional is true or a false boolean value if the whole conditional is false.

```js
function makeBetweenFunc(min, max) {
  return function(num) {
    return num >= min && num <= max;
  }
}
```

Instead we could make a factory function that asks for two required parameters that as for the minimum and maximum value to check if the number is between. The makeBetweenFunc() is returning the none named function that is returning a true or false boolean value if the number is between the set min and max parameters. 

```js
function makeBetweenFunc(min, max) {
  return function(num) {
    return num >= min && num <= max;
  }
}
const isChild = makeBetweenFunc(1, 17);
isChild(50); // false
isChild(17); // true
```

We are storing the returned function from makeBetweenFunc(1, 17) with 1 set to the min parameter and 17 set to the max parameter. Then once we stored the min and max parameter to the un-named function we then return true or false once we call it with a set number to the num parameter.

```js
function makeBetweenFunc(min, max) {
  return function(num) {
    return num >= min && num <= max;
  }
}
makeBetweenFunc(1, 17);

const isChild = function(num) {
  return num >= 1 && num <= 200;
}
isChild(19); // false
```

Here is maybe a better way of viewing the factory function. It's just like making a variable that holds a function that checks if num is greater than or equaled to 1 and is less than or equal to 200.

## Methods

```js
const math = {
  multiply : function(x, y) {
    return x * y;
  },
  divide   : function(x, y) {
    return x / y;
  },
  square   : function(x) {
    return x * x;
  }
};
```

We can add functions as properties on objects. We call them mothods! There is a short hand of creating methods in objects 

```js
const math = {
  multiply(x, y) {
    return x * y;
  },
  divide(x, y) {
    return x / y;
  },
  square(x) {
    return x * x;
  }
};

math.multipy(2, 3); // 6
math.divide(2, 2); // 1
math.square(3); // 9
```



## 'THIS' In Methods

Use the keyword this to access other properties on the same object.

```js
const person = {
  first: 'Robert',
  last: 'Herjavec',
  fullName() {
    return `${this.first} ${this.last}`
  }
};
person.fullName(); // "Robert Herjavec"
person.last = 'Plant';
person.fullName(); // "Robert Plant"
```

The keyword this is something we typically would use inside of a method in an object.

```js
const cat = {
  name: 'Blue Steele',
  color: 'grey',
  breed: 'scottish fold',
  meow() {
    console.log(color); // color is not defined
  }
};
cat.meow();
```

You can't access color because it is looking for a variable and there are no variablables within the object. You can do this

```js
const cat = {
  name: 'Blue Steele',
  color: 'grey',
  breed: 'scottish fold',
  meow() {
    console.log(cat.color); // grey
  }
};
cat.meow();
```

You can access the method color within cat and that would work, but there is something simpler than this. Its the keyword 'this' lol

```js
const cat = {
  name: 'Blue Steele',
  color: 'grey',
  breed: 'scottish fold',
  meow() {
    console.log(`${this.name} says MEOW MEOW`); 
  }
};
cat.meow();
```

They keyword 'this' will refer to the object container, but this is not always the case. 

The value of this dpends on the invocation context of the function it is used in.

```js
const cat = {
  name: 'Blue Steele',
  color: 'grey',
  breed: 'scottish fold',
  meow() {
    console.log(this); // window{}
    console.log(`${this.name} says MEOW MEOW`); 
  }
};

const meow2 = cat.meow;
meow2(); // "says MEOW MEOW"
cat.meow(); // "Blue Steele says MEOW MEOW"
```

Whenever you invoked the function within the method of cat, the this keyword refers to the object containing that function. If you create a function you can actually call it with window.

```js
function scream() {
  console.log('AHAHAHAHHAHA');
}
window.scream(); // AHAHAHAHHAHA
```

The default value for this is window so when there is nothing invoking the function, window will be there by default.



## Try and Catch

Try and catch help with catching errors and preventing the code from stopping whenever it incounters an error.

```js
function yell(msg) {
  try {
    console.log(msg.toUpperCase().repeat(3));
  } catch (e) {
    console.log(e);
  }
}
yell('Hi'); // "HiHiHi"
yell(10); // TypeError: msg.toUpperCase is not a function, Numbers dont have .toUpperCase as a function, its only apart of the string methods
```

In catch in can have access to the perticular exception error and we are storing it in the variable 'e'. The code still continues on when it catches an error.

```js
function yell(msg) {
  try {
    console.log(msg.toUpperCase().repeat(3));
  } catch (e) {
    console.log(e);
  }
}
yell(7); // msg.toUpperCase is not a function
console.log('code is active'); // "code is active"
```

