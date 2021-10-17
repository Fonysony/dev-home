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
const process= require('process');
```

