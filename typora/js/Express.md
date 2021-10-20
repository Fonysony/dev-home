## Express

### What is Express?

Our First Framework! Express is a "Fast, unopinionated, minimalist web framework for Node.js." It helps us build web apps!

It's just an NPM package which comes with a bunch of methods and optional plugins that we can use to build web applications and API's

### Express helps us 

- Start up a server to listen for requests
- Parse incomng requests
- Match those requests to particular routes
- Craft our http response and associated content

Express will parse incoming requests because HTTP requests are really just their text information. They're not JavaScript objects. Express will turn information into requests, it will turn requests into objects. It helps to match those requests so that we can write code that onlys runs when you're requesting pages. 

### Libraries VS. Frameworks

- When you use a Library, you are in charge! You control the flow of the application code and you decide when to use the library. 
- With Frameworks, that control is inverted. The framework is in charge, and you are merely a participant! The framework tells you where to plug in the code.

Libraries are just code other people have written for us. They are code that we typically download using the tool like npm or include as a script if we're doing client side JavaScript. When we use bootstrap's JavaScript, that's a library. It's a single script or HTTP request library that we include in our code. Basically, a library is something that you can integrate into your code at any point. They typically give you methods, functionality where you decide when to incorporate it to use it with things like axis or any of the color libraries. 

Frameworks are just code other people have written for us too, but the difference is the inversion of control. Frameworks typically invert that flow of control where the framework us actually providing the structure in what you are making. You are writing your code according to how to framework works and you're following the rules. Frameworks really help you make full applications. 

### First Express App

Make a new directory and `npm init -y` it. The `-y` flag when passed to NPM commands tells the generator to use the defaults instead of asking questions. 

```shell
% npm init - y
```

Now that you have express you make a JavaScript file, but it doesn't have to be named `index.js`. By default with version npm 5.0+ npm install adds the module to the `dependencies` list in the `package.json` file; with earlier versions of npm, you must specify the `--save` option explicitly. Then, afterwards, running `npm install` in the app directory will automatically install modules in the dependencies list. 

```shell
npm i express 
```

Now we need to `require('express')` in whatever you named your main fle to be.

```js
const express = require('express');
```

Now create a variable to hold the express object that will give you methods for our server.

```js
const express = require('express');
const app = express();
console.dir(app);
```



### .listen()

The listen method has a parameter that listens to the port number we pass in.

```js
const express = require('express');
const app = express();
const port = 3000; // I added this myself

app.use(() => {
  console.log('WE GOT A NEW REQUEST');
});

app.listen(port, () =>{
  console.log(`Listening to port ${port}`)
});
```

### .use()

the `.use()` will run anytime we have an incoming request. 

Remember with Express you much reset the server in order to see changes, (ctrl + c) will help you get out of there.

So, we are requesting the port number 3000, but you don't have to do 3000. Another popular number is 8080 and these are just addresses for connections on your machine. So, instead of having all traffic from emails, file transfers, HTTP requests and etc, go through one port on your machine, there are different addresses that have unique numbers that you can use to identify them and refer to them. If you have more than one server running, you would need to put it on two different ports. The whole point is that we can have different servers on different ports and they get their own entrance or tunnel to our machine so we can separate traffic. 

### Request & Response Objects

We have started a server, but we haven't responded to any of the incoming request that hit our server. 

There are two important objects that Express makes for every incoming request. 

```js
app.use((req, res) => {
  
});
```

The first parameter is an object that represents the request, the incoming request, and the second parameter is a object representing the outgoing response. These are objects that are made by Express and passed in to the callback function. 

An HTTP request is not a js object, it's text information. Express turns the HTTP request into data, parses the data, passes it into an object and then passes it to the callback. 

### res.send()

On the outgoing response there a method called `.send()`. It sends the HTTP reponse. The body parameter can be a **Buffer** object, a **String**, am object, or an **Array**. It automatically assigns the `Content-Length` HTTP response header field (unless previously defined) and provides automatic HEAD and HTTP cache freshness support. 

```js
app.use((req, res) => {
  res.send('HELLO, WE GOT YOUR REQUEST!!!');
});
```

`res.send()` is the response, it is sending and generating an HDP response. 

### Express Routing Basics

Rounting is not specific to Express in any server that we develop. It refers to taking incoming requests and a path that is requested and matching that to some code in some response. 

Example a path could be `localhost:8080/dogs` or `localhost:8080/cats`.

Express gives us some different methods on this `const app = express()` that we created by executing Express. The function app has a couple of different methods that are important. 

### .get()

`.get()` expects or has two required parameters. The first parameter is the path that we are matching. The second parameter is the callback function it will execute once a request comes in that matches `/cats`.

```js
app.get('/cats', (req, res) => {
  console.log('CAT REQuEST!');
});
```

Any time we have the `.send()` method, we're done for that one request. We can't have a HTTP request that gets more than one response. `.send()` matches every single request so, make sure you remove it from your code once you use the `.get()` method. 

```js
app.get('/cats', (req, res) => {
  res.send('MEOW!!');
});
app.get('/dogs', (req, res) => {
  res.send('WOOF!!');
});
```

So remember, request is an object created by Express based upon the incoming HTTP request. Response is an object made by Express, both the request and the response object gets passed into the callback that we give it. Response has a bunch of methods on it, including `.send()`, which we use to send back content.

```js
app.get('/', (req, res) => {
  res.send('This is home!!');
});
```

The `/` is refer as to the root. So, if you request the root resource without any path name after it. Each one of these is a route that we're are defining. We are routing some incoming request to some outgoing response. 

We are only matching get requests, which is the only type of requests we can send by hitting enter in the browser. 

### .post()

When we setup APIs, JSON APIs, we often will have get requests that we're responding to, but also post. We can send a post request from the browser using Aixos or from a form in HTML form. 

```js
app.post('/cats', (req, res) => {
  res.send('POST REQUEST TO /cats!!');
});
```



What happens if I request a route that doesn't exist. If we want to have some generic response, we can match everything to one `.get('*')`.

```js
app.get('*', (req, res) => {
  res.send(`I don't know that path!`);
});
app.get('/', (req, res) => {
    res.send('This is home!!');
});
app.get('/cats', (req, res) => {
    res.send('MEOW!!');
});
app.post('/cats', (req, res) => {
  res.send('POST REQUEST TO /cats!!');
});
app.get('/dogs', (req, res) => {
    res.send('WOOF!!');
});
```

Why i'm I only getting "I don't know that path" for a response? Well, routes are matched in order and this `.get('*')` matches everything. The post request will through cause it's a different request and we are matching `.get()`.

```js
app.get('/', (req, res) => {
    res.send('This is home!!');
});
app.get('/cats', (req, res) => {
    res.send('MEOW!!');
});
app.post('/cats', (req, res) => {
  res.send('POST REQUEST TO /cats!!');
});
app.get('/dogs', (req, res) => {
    res.send('WOOF!!');
});
app.get('*', (req, res) => {
  res.send(`I don't know that path!`);
});
```

Now it should be good to go, if we match `.get('*')` at the end of all of the requests. 

### Express Path Parameters

The `.get()` requests we are doing are only direct match routes. This code only runs when an incoming request is exactly asking for `.get('/cats')`. Instead of doing this, we can define a generic pattern. The way we can do that in Express is by creating our route where instead our path string we actually use a colon `:` to designate a path variable. 

```js
app.get('/r/:subreddit', (req, res) => {
  res.send(`This is subreddit`);
});
```

Object Express adds a property to the request object, which is called `req.params`. 

```js
app.get('/r/:subreddit', (req, res) => {
  console.log(req.params);
  res.send(`This is subreddit`);
});
```

```shell
% node index.js
{ subreddit: 'dogs' }
{ subreddit: 'cats' }
{ subreddit: 'dick' }
```

This is what params look like when a request to `/r/`. Like this `/r/dogs`. `:subreddit` is a property. 

```js
app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  res.send(`<h1>Browsing the ${subreddit} subreddit`);
});
```

Whatever that string is that we're matching, we'll extract that from the `req.params` and then we'll send them back. We are just destructuring from `req.params`. 

That's the basic idea of setting up these path parameters or path variables in our routes or defining a pattern, not a exact match. 

```js
app.get('/r/:subreddit/:postId', (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`);
});
```

The colon `:` indicates a variable, we're not hardcoding it, we're not matching `postId` the word. 

### Working with Query Strings

Query string is a portion of the URL that comes after a question mark `?`, we can include information in key value pairs as part of the query string. Often applications are set up so that they are expecting something in the query string.

```js
app.get('/search', (req, res) => {
  console.log(req.query);
  res.send('H!');
});
```

```shell
% node index.js
'http://localhost:8080/search?q=dick&q=money'
{ q: [ 'dick', 'money' ] }
```

So, if we define some route `/search`, we do not add anything to the path `/search` in terms to match a query string or look for a query string. Instead, Express constructs a request object that has a property called `query` and it is passed into our callback as a `req` or the first parameter. In `req.query` we'll find key value pairs made or based upon the query string. 

```js
app.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send('NOTHING FOUND IF NOTHING SEARCHED!');
  }
  res.send(`<h1>Search results for: ${q}</h1>`);
});
```

Assuming that our query string will be called `q`. If we have mutiple key value pairs you can separate them with a ampersand `&`. Express takes the key value pairs parses them, turns them into an object, passes it to the req object and creates a property that is an object called `query` to hold them. If there is no key value pair after the query string `?q=` then say 'NOTHING FOUND IF NOTHING SEARCHED!'.

### Nodemon

Just a npm package that checks when we make changes to our code.

```js
% npm i -g nodemon
```

You need to download Nodemon globally inorder to have the nodemon work anywhere in our system path or the path that Node is running in. 

```shell
% nodemon index.js
[nodemon] 2.0.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
```

Now I will make some changes and save the code.

```shell
% nodemon index.js
[nodemon] 2.0.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
```

To exit its the same thing with Node, `ctrl + c`.
