## What is Node?

### "A JavaScript Runtime"

Node is an implementation of JavaScript that runs outside of the browser so we can run JavaScript code with ever opening a browser, without even needing a browser on a machine, but without a browser you can't manipulate the DOM or deal with user inputs, events etc...

### What Do People Build With It?

- Web Servers
- Command Line Tools
- Native App (VSCode is a Node app!)
- Video Games
- Drone Software
- A Whole Lot More!

Node has a REPL (Read Evaluate Print Loop). The JavaScript console in our browser is a REPL, I can try some code in it, will read it, evaluate it, print something back to me and then it loops. When we include a script in HTML file. We open that in the broswer, it executes and finishes. REPL is continuing to just listen and waiting for us to type something in so that it can evaluate it back. 

We typically use a REPL to debug or test new features that we've installed. You can actaully right JavaScript in node. Think of this as the node equivalent if the JavaScript console in Chrome. JavaScript Node does not have:

- Any of the DOM APIs
- No window
- No document

Like in JavaScript DOM there is a global object that represents a browser window, hence the term window. Node has a global scope and it's called 'global'.



## Running a Script in Node

`% node [fileName]`

```shell
% node firstScript.js
```

It's taking the file and executing it as node code. The file can be in a different directory, but as long as you reference the correct full path it's good.

```shell
% node node-js/firstScript.js
```



### Process

The `process` object is a `global`that provides information about, and cover over the current Node.js process. As a global, it is always avaiable to Node.js applications without using require().

```shell
const process= require('./process');
```

Any time we're using node it includes information about methods that provide control over the current NARGES process. This includes things like the version of Node, get inputs and write to the standard output (or the console), memory usages, and the current working directory that a user is running the script on.

```shell
% process
```

When in Node, if you type process, it outputs a big object that has a bunch of methods and properties. 

### process.exit()

```shell
% process.exit()
```

The `'exit'` event is emitted when the Node.js process is about to exit as a result of either:

- The `process.exit()` method being called explicitly;
- The Node.js event loop no longer having any additional work to perform.

There is no way to prevent the exiting of the event loop at this point, and once all `'exit'` listeners have finished running the Node.js process will terminate.

### process.version

```shell
% process.version
'v16.11.1'
```

Gives you the version of Node.

### process.release

```shell
% process.release
{
  name: 'node',
  sourceUrl: 'https://nodejs.org/download/release/v16.11.1/node-v16.11.1.tar.gz',
  headersUrl: 'https://nodejs.org/download/release/v16.11.1/node-v16.11.1-headers.tar.gz'
}
```

It's the specific Node release that is being currently used.

### process.cwd()

```shell
% process.cwd()
'/Users/fonysony/Documents/dev-home'
```

Gives you the current working directory, where Node is currently running in.

### process.argv

```shell
% process.argv
[ '/usr/local/Cellar/node/16.11.1/bin/node' ]
```

the `process.argv` propert returns an array that contains the command-line arguments passed when Node.js process was launched. The first element will be `process.execPath`. See `process.argv0` if access to the original value of `argv[0]` is needed. The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command-line arguments. 

```js
console.log('FROM ARGS FILE!!!');
console.log(process.argv);
```

```shell
% node args.js Justin Willy
FROM ARGS FILE!!!
[
  '/usr/local/Cellar/node/16.11.1/bin/node',
  "/Users/fonysony/Documents/dev-home/Colt Steele's Web Bootcamp/node-js - 31/args.js",
  'Justin',
  'Willy'
]
```

We can make our node scripts and pass arguments in them, you separate them with spaces for each argument you pass in. They're then all added to this `process.argv` array. The first element will always going to be the `process.execPath' / or the executable path, and the second element will always be the path to the file Node is running on. 

```js
const args = process.argv.slice(2);
for (const arg of args) {
    console.log(`Hi there, ${arg}`);
}
```

splice is just cutting off the first two elements of process.argv which is the `process.execPath' and the current directory Node is running in. 

```shell
% node greeter.js Justin William
Hi there, Justin
Hi there, William
```

This is just a taste of what Node can do. Peoplecan create very complicated command line scripts and tools for the command line that have nothing to do with servers and web development. 



### File System Module Crash Course

`fs` or file system is a module. There are ton of methods that read files, create files, add files, open files, close files, change permissions etc..  

There are two methods we will be looking at, `fs.mkdir()` and `fs.mkdirSync()`. All file system operations have synchronous, asynchronous, callback, and promise-based forms, and are accessible using both CommonJS syntax and ES6 Modules (ESM). 

The asynchronous form always takes a completion callback as its last argument. Synchronous operations are thrown immediately and may be handled using `try_Catch`, or may be allowed to bubble up.

There are two different ways of making files, and folders. There is the asynchronous version and the synchronous version. 

Synchronous means do this thing and wait until it finishes before moving on. The synchronous versions will block the entire process until they complete, halting all connections. 

```js
fs.mkdir('Dogs', { recursive: true }, (err) => {
    console.log('IN THE CALLBACK!!');
    if (err) throw err;
});
```

```shell
% node boilerplate.js
ReferenceError: fs is not defined
```

`fs` is not defined by default, unlike `process` which is always in scope if we're using node. `fs` is a module that we need to `require()`. 

```js
const fs = require('fs');
```

We are saving it to a variable to be able to use it later. We don't need to download `fs`it is already here, it's just not in scope by default. We have to tell node to fetch 'fs' and we do this by using `require()`.

```js
const fs = require('./fs');
console.log(fs);
```

`fs`is a object and you can see it by `console.log()` it. The `./` is referencing something in the directory, the dot means this directory.

### fs.mkdir(path[, options], callback)

`fs.mkdir()'` is the asynchronous version. Asynchronously creates a directory.

The callback is given a possible exception and, if `recursive` is `true`, the first directory path created, `(err, [path])`. `path` can still be `undefined` when `recursive` is `true`, if no directory was created.

```js
const fs = require('./fs');

fs.mkdir('Dogs', { recursive: true }, (err) => {
    console.log('IN THE CALLBACK!!');
    if (err) throw err;
});
console.log('I COME AFTER MKDIR IN THE FILE!!!');
```

```shell
% node boilerplate.js
I COME AFTER MKDIR IN THE FILE!!!
IN THE CALLBACK!!
```

You can see that, 'I COME AFTER....' printed out first because `fs.mkdir()` is asynchronous. Then when the `fs.mkdir`finishes then the callback function runs. 

### fs.mkdirSync(path[, options])

`fs.mkdirSync()` is the synchronous version. Synchronously creates a directory. Returns `undefined`, or if `recursive` is `true`, the first directory path created. This is the synchronous version of [`fs.mkdir()`](https://nodejs.org/docs/latest-v15.x/api/fs.html#fs_fs_mkdir_path_options_callback).

```js
const fs = require('./fs');

fs.mkdirSync('Cats');
console.log('I COME AFTER MKDIR IN THE FILE!!!');
```

```shell
% node boilerplate.js
I COME AFTER MKDIR IN THE FILE!!!
```

`fs.mkdirSync() ` does not wait like `fs.mkdir()` does because it's not asynchronous. If I needed this directory to be created before we add something into it, then the synchronous version is easier beacuse it can just create the directory without having to wait. 

```js
const fs = require('./fs');
const folderName = process.argv[2] || 'project'; 

fs.mkdirSync(folderName);
console.log('I COME AFTER MKDIR IN THE FILE!!!');
```

```shell
% node boilerplate.js Halo
I COME AFTER MKDIR IN THE FILE!!!
```

`process.argv[2] ` is grabbing the index of the third element with the array. Remember the first element by default is always `process.execPath`and the second element by default is the path that Node is currently running in. The third element is the first argument that is passed in.

If `folderName` is undefined give it a name of 'project'. 

Now we want to create files inside of the new folder we created. There quite a few of methods that `fs` has for creating files, we're gonna be using `fs.writeFileSync()`.

### fs.writeFileSync(file, data[, options])

```js
const fs = require('./fs');
const folderName = process.argv[2] || 'project';
const srcFolder = `${folderName}/src`;

fs.mkdirSync(folderName);
fs.mkdirSync(src);
fs.writeFileSync(`${src}/index.html`, '');
fs.writeFileSync(`${src}/style.css`, '');
fs.writeFileSync(`${src}/app.js`, '');

console.log('I COME AFTER MKDIR IN THE FILE!!!');
```

```shell
% node boilerplate.js mine-project
I COME AFTER MKDIR IN THE FILE!!!
```

`fs.mkdirSync()` has two required parakeets, the file and data. When `file` is a filename, synchronously writes data to the file, replacing the file if it already exists. `data` can be a string or a buffer. The `encoding` option is ignored if `data` is a buffer. If `data` is a normal object, it must have an own `toString` function property.

When don't have to do the `fs.writeFileSync()` version, but it works. There is a potential things could go wrong so, we should add a `try_Catch`.

```shell
% node 25_Node_Intro/boilerplate.js LizardProject
I COME AFTER MKDIR IN THE FILE!!!
```

We can run the script in a different location or a different directory. Node runs off of the current directory you are in so, when you run the script it runs off of the loaction you are at, not where the script itself lives. 

```js
const fs = require('./fs');
const folderName = process.argv[2] || 'project';
const srcFolder = `${folderName}/src`;

try {
  fs.mkdirSync(folderName);
	fs.mkdirSync(src);
	fs.writeFileSync(`${src}/index.html`, '');
	fs.writeFileSync(`${src}/style.css`, '');
	fs.writeFileSync(`${src}/app.js`, '');
} catch(err) {
  console.log(err);
}

console.log('I COME AFTER MKDIR IN THE FILE!!!');
```

We should ad a `try_Catch` just in case anything goes wrong because there's no error callback or anything like that, like we ahve for the asynchronous form, which are definitely important to know If you're doing any sort of intensive stuff around files. Callbacks in general are pretty common in Node, but for simplicity's sake, we're using the synchronous versions. 

You could provide another argument that will write to the content of the new file you have created!!! 