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



### require() Directory

You can require an entire directory.

```js
// sadie.js - inside of directory
module.exports = {
    name: 'sadie',
    color: 'black',
}
```

```js
// blue.js - inside of directory
module.exports = {
    name: 'blue',
    color: 'grey',
}
```

```js
// janet.js - inside of directory
module.exports = {
    name: 'janet',
    color: 'orange',
}
```

```js
// index.js - inside of directory
const blue = require('./blue');
const janet = require('./janet');
const sadie = require('./saide');

const allCats = [blue, janet, sadie];

module.exports = allCats;
```

```js
// app.js - outside of directory
const cats = require('./shelter');

console.log(cats);
```

```shell
% node app.js
[
  { name: 'blue', color: 'grey' },
  { name: 'janet', color: 'orange' },
  { name: 'sadie', color: 'black' }
]
```

When have any number of JavaScript files in a directory, and a single index.js. There is a particular name in Node, it's sorta the main file of a directory. When I `require()` an entire directory, Node is going to look for a index file and whatever that file exports is what the directory will export. 



### NPM

Node Package Manager is really two things:

- A library of thousands of packages published by other developers that we can use for free!
- A command line tool to easily install and manage those packages in our Node projects

### npm install

`npm install` will download the package name that you specify after install. The names are based off of the name packages are registered with. You can use the shortcut `npm i` to also install packages.

```shell
% npm i give-me-a-joke
```

 Whenever you install a npm package, all of the core code is put inside of this directory made for us called `node_modules`. Also, there is a file called `package-lock.json` , theses files are things you should keep and not delete. 

To use the package you're gonna need to use `require()`. We require packages just like we require anything else, but rather than giving a path to a file, you just reference the name of the package and it goes to look automatically in our `node_modules` directory. 

```js
const jokes = require('give-me-a-joke');
jokes.getRandomDadJoke(function (joke) {
  console.log(joke);
})
```

```shell
% node index.js
A quick shoutout to all of the side walks there....
Thanks for keeping me off the streets
```

Right now you can only have access the npm package with the directory that it's installed, you can actually get npm packages that are globally, meaning you can use it anywhere. 

To install a package globally you add the -g flag in install globally.

```shell
% npm i -g cowsay 
```

Sometimes this won't work because it is trying to add the `node_modules` at the highest level of a machine, this the users local lib `node_modules`, the highest `node_modules` for the machine. When we download npm packages to a directory, rather than download to a single subdirectory, like a project, we want to download globally, but it's saying we don't have write permission. 

```js
sudo chown -R $USER /usr/local/lib/node_modules
```

`sudo` means we are running this command as `root`, the system super user. This is because we don't have permission to write to that folder, but `root` will be able to fix any permissions. This command also means the system will ask for your password to confirm.

`chown` is the command we use to change the owner of a file or folder. We set `-R` option to change the owner recursively, so we can also get owner access to all the files already contained in there at once.

`$USER` is an environment variable automatically set to your username.

Running this path will make the folder yours, so you can safely run your `npm install -g <package>` commands!



### All-Important Package.json

Every singe Node module, everything single package I install and even the dependencies that I didn't manually install. All of them have this `package.json`, it's a file that will be put in every Node app we create. It's not require, but it's important to have. It contains metaData about this particular project or package. There is the description, the version and more, but what we care about the dependencies. There are a ton of dependencies with different versions, but NPM will go and install every single one of these dependencies. It's always look inside of the `package.json` file. 

You can create this file with a NPM command. 

### npm init

`npm init` is the creation untility for packages that, JSON. You don't have to do it this way, but this way will comform to the standard way it's suppose to be made. You can skip some by just click enter and it will give it a default value which is in ().

```shell
% mkdir Artster
% cd Artster
Artster % npm init
package name: (Artster)
version: (1.0.0)
description:
entry point: (index.js) 
test command: 
git repository: 
keywords:
author: Fonysony
license: (ISC)

{
  "name": "Artster",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

So now that I have setup my npm lets add some packages to the project.

```shell
Artster % npm i figlet
added 1 package, and audited 2 packages in 4s

```

```json
{
  "name": "artster",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "figlet": "^1.5.2"
  }
}

```

Now my package.json shows dependencies and figlet is in there. It needs this package called figlet and it's documented in this package. So, this acts as a record of everything that I'm using in this application and at some point I stop using figlet I can delete it. 

```json
{
  "name": "artster",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
  }
}


```

But this does not mean anything to my code, I don't have to have this here inorder to use figlet, I need it in the `node_modules`, but you want to stay in sync and have everything cause if my `node_modules` is deleted or if I send this file to someone, you can go and get all the appropriate dependencies. 

```js
const figlet = require('figlet');

figlet('Hello World!!', function(err, data) {
    if (err) {
        console.dir(err);
        return;
    }
    console.log(data);
});
```

```shell
% node index.js
 | | | | ___| | | ___   \ \      / /__  _ __| | __| | | |
 | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` | | |
 |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| |_|_|
 |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_(_|_)
```

```shell
Artster % npm i colors
added 1 package, and audited 3 packages in 2s
```

```json
{
  "name": "artster",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "colors": "^1.4.0",
    "figlet": "^1.5.2"
  }
}

```

```js
const figlet = require('figlet');
const colors = require('colors');

figlet('Hello World!!', function(err, data) {
    if (err) {
        console.dir(err);
        return;
    }
    console.log(data.rainbow);
});
```

```shell
Artster % node index.js
  _   _      _ _        __        __         _     _ _ _ 
 | | | | ___| | | ___   \ \      / /__  _ __| | __| | | |
 | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` | | |
 |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| |_|_|
 |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_(_|_)
```

No colors are showing sadly.....

### Installing All Dependencies For A Project

The `package.json` file contains metaData, information about the project you are working on. Most importantly, it contains a list of dependencies which is nice for the other people who are using our projects. When sharing the project, you normally won't share the `node_modules` directory because it contains tons and tons of dependencies, depending on what you have, that could take up a lot of space. 

Lets say you have a project and you want to use, you take a look at their dependencies and there is a lot of them. You could go and manully `npm install`, but instead, if you're inside of a project directory with a `package.json` that has it's dependencies listed, if you run the command `npm install`  it's going to look at the `package.json` and install all the dependencies for you!!!

