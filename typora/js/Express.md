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

```shell
npm i express 
```

Now that you have express you make a JavaScript file, but it doesn't have to be named `index.js`.

