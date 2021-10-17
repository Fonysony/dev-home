### Sharing JavaScript code between different files

Outside of Node, the world that browser client side JavaScript, if we have different JavaScript files, we just include them in the same HTML script or the same HTML document. Then we have access to all of the functions and all of the variables that we've defined, assuming that we've included them in the right order.

In Node, we ahve a completely different system where we can be very particular about what a single file shares and what it does not share. We can `require()` code from other files, just like we could `require()` code from built in module, like we saw with the file system module. 

```js 
// math.js
const add = (x, y) => x + y;

const PI = 3.14159;

const square = x => x * x;
```

So, we have two functions and a variable inside this `math.js` script and we might want to reuse this code in different files. Like Express, where the JavaScript code is written by other people, and it's used by hundreds of thousands of people. When they use Express, they are requiring those files so we can write these reusable pieces that we can import and use in our own apps. 

```js
// app.js
const math = require('./math');
console.log(math);
```

```shell
% node app.js
{}
```

So, this is how Node modules works. When we create a file like `math.js` the content of this file are not automatically available everywhere else when we require that file. So, if we have two files in the same index set each time out, they're going to both load all their stuff, all their variables, all of their functions. Then the second one has acceuss to whatever is defined in the first one, but that's not for this case.

When you `requireO` a file, you're not going to get anything from it unless the math file explicitly says to export out of the file. There is a speical property called `module.exports', and by default it's an object. So, if we set it to something else.

```js
// math.js
const add = (x, y) => x + y;

const PI = 3.14159;

const square = x => x * x;

module.exports = 'HELLO';
```

```js
// app.js
const math = require('./math');
console.log(math);
```

```shell
% node app.js 
HELLO
```

We have explicitly said this entire file, doesn't matter what's in there. The only thing that it's going to export is hello, the string. So, when we `require()` that the content of module which is set to an object in this case by default, will fill the math variable with that is equaled too `require('./math')`. It's called module exports cause it can export more than one object or thing. 

```js 
// math.js 
const add = (x, y) => x + y;

const PI = 3.14159;

const square = x => x * x;

module.exports.add = add;
module.exports.PI = PI;
module.exports.square = square;
```

```js
// app.js
const math = require('./math');
console.log(math);
```

```shell
% node app.js
{ add: [Function: add], PI: 3.14159, square: [Function: square] }
```

You don't have to do `module.exports` like this, there are other options that will come up. 

So, we are setting on the object called `module.exports`. We create a function of add and square into 'module.exports' and equal it to the functions we have in the 'math.js' file. We also create a PI variable with 'module.exports' and equal it to the variable PI on `math.js`.

We then store that use `require('./math.js')` to grab the 'module.exports' object and save it to math in `app.js`. 

```js
// math.js 
const add = (x, y) => x + y;

const PI = 3.14159;

const square = x => x * x;

module.exports.add = add;
module.exports.PI = PI;
module.exports.square = square;
```

```js
// app.js
const math = require('./math');
console.log(math);
console.log(math.PI);
```

```shell
% node app.js
{ add: [Function: add], PI: 3.14159, square: [Function: square] }
3.14159

```

It's like classes and object, you can create new variable or function just by using the dot operator and defining it. 

```js
// math.js 
const add = (x, y) => x + y;

const PI = 3.14159;

const square = x => x * x;

module.exports.add = add;
module.exports.sonicX = PI;
module.exports.square = square;
```

```js
// app.js
const math = require('./math');
console.log(math);
console.log(math.sonicX);
```

```shell
% node app.js
{ add: [Function: add], sonicX: 3.14159, square: [Function: square] }
3.14159
```

You can even destructure the object to get only the methods we want.

```js
const {sonicX, square} = require('./math');
console.log(square(sonicX));
```

```shell
% node app.js
81
```

You can make an object and pass everything at once to the `module.exports`.

```js
// math.js 
const add = (x, y) => x + y;

const PI = 3.14159;

const square = x => x * x;

const skills = {
    add: add,
    PI: PI,
    square: square,
} 

module.exports = skills;
```

```js
// app.js
const math = require('./math');
console.log(math);
```

```shell
% node app.js
{ add: [Function: add], PI: 3.14159, square: [Function: square] }
```

```js
// math.js 
module.exports.add = (x, y) => x + y;

module.exports.PI = 3.14159;

module.exports.square = x => x * x;

```

There is a shortcut to the `module.exports` and it's called `exports`.

### exports shortcut

The `exports` variable is available within a module's file-level scope, and is assigned the value of `module.exports` before the module is evaluated. 

It allows a shortcut, so that `module.exports.f = ...` can bewritten more succinctly as `exports.f = ...`, However, be aware that like any variable, if a new value is assigned to `exports`, it is no longer bound to `module.exports`: 

```js 
module.exports.hello = true; // Exported from require of module
exports = { hello: false };  // Not exported, only available in the module

```

```js
// math.js 
exports = 'ERORE'; // This is not setting the the module object
										// it's actaully defining a variable called
										// exports
exports.add = (x, y) => x + y;

exports.PI = 3.14159;

exports.square = x => x * x;


```

`exports` is just a shortcut reference to that module exports object. 

If you are referencing your own files you need to reference to the path to require that file.

```js
const math = require('./math');
```

Its `./math` because the files are in the same directory.