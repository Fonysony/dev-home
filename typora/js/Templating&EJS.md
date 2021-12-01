## Templating and EJS

### What is Templating?

Templating allows us to define a preset "pattern" for a webpage, that wew can dynamically modify. For example, we could define a single "Search" template that displays all the results for a given search term. We don't know what the term is or how many results there are ahead of time. The webpage is created on the fly.

### Configuring Express For EJS 

### What is EJS - Embedded JavaScript

What is the "E" for? "Embedded?" Could be. How about "Effective," "Elegant," or just "Easy"? EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.

### .set(name, value)

To use EJS there is the `.set()` method in Express. There are two parameters that are required, the first parameter is `name`. Assigns setting `name` to `value`. You may store any value that you want, but certain names can be used to configure the behavior of the server. These special names are listed in the [app settings table](http://expressjs.com/en/5x/api.html#app.settings.table).

```js
app.set('title', 'My Site')
app.get('title') // "My Site"
```

We willl be using the `view engine` property. The default engine extension to use when omitted. **NOTE**: Sub-apps will inherit the value of this setting. 'view engine' requires a string values for its parameters. 

```js
app.set('view engine', 'ejs'); // The space is needed
```

If you haven't already, install EJS into your project, you don't need to `require()` ejs because by setting `view engine` to `ejs`, Express behind the scenes will require the package called EJS that we installed.

### view

`view` is a property on `.set()` it's a directory or an array of directories the application's views. If an array, the views are looked up in the order they occur in the array.

By default, when we create a new Express app and we're using some `view engine`, Express is going to assume that our views or templates exist in a directory called `/views`.   This is the deafult of `view` `process.cwd() + '/views'`. 

```shell
Template_Demo % mkdir views
Template_Demo % touch views/home.ejs
```

```html
<!-- home.ejs -->
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Home</title>
        <meta name="description" content="HTML5 Template for new projects">
        <meta name="author" content="">

        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body>
        <h1>The Home Page</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, obcaecati illum, odio eum eaque iste illo quia earum voluptatum excepturi enim sit quam commodi quo. Totam rem debitis sequi dignissimos.</p>

        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa velit voluptate consequuntur voluptatem, tenetur sequi laudantium optio, nam natus alias magnam dolore error? Repudiandae expedita quae quis neque vel placeat?</p>
        
    </body>
</html>
```

Within views you need a .ejs file, can be any name. Now that we have our ejs file with some HTML in it, you need to render it on the page when someone connects to the server.

### .render(view [, locals] [, callback])

Renders a `view` and sends the rendered HTML string to the client. Optional parameters:

- `locals`, an object whose properties define local variables for the view.
- `callback`, a callback function. If provided, the method returns both the possible error and rendered string, but does not perform an automated response. When an error occurs, the method invokes `next(err)` internally.

The `view` argument is a string that is the file path of the view file to render. This can be an absolute path, or a path relative to the `views` setting. If the path does not contain a file extension, then the `view engine` setting determines the file extension. If the path does contain a file extension, then Express will load the module for the specified template engine (via `require()`) and render it using the loaded module’s `__express` function.

**NOTE:** The `view` argument performs file system operations like reading a file from disk and evaluating Node.js modules, and as so for security reasons should not contain input from the end-user.

```js
// send the rendered view to the client
res.render('index')

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function (err, html) {
  res.send(html)
})

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function (err, html) {
  // ...
})
```

On `.get()` the response (second parameter), there is a method called `.render()`.

```js
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home'); // You could add home.ejs too
});
```

You can add .ejs to home `'home.ejs'`, but you don't need it if `view engine` is set to `ejs`. You also, don't need to say `views/home.ejs` because the default place `.render()` looks is `/views`.  

The default views Express is looking for is only going to work if I am running my Node from within the same directory where my `/views` folder is. If I want it to work from different directories or from anywhere, I need to change the views directory. By default, the views directory is set up to be `process.cwd()`, the current working directory in Node. 

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home'); // You could add home.ejs too
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
```

There is a module built into Express called `path`. `path` has a method called `.join()`. Our current directory name where this script is located, `index.js`, is joining with the full path to get to `/views`.

Basically is, instead of being the current working directory of where I executed the file or Node from, it will use the directory name (`__dirname`)  of where `index.js` is or `__dirname`.

### EJS Syntax

JavaScript code in simple, straightforward scriptlet tags. Just write JavaScript that emits the HTML you want, and get the job done! Write JavaScript code in HTML!!! DANG!!!

- `<%` 'Scriptlet' tag, for control-flow, no output
- `<%_` ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
- `<%=` Outputs the value into the template (HTML escaped)
- `<%-` Outputs the unescaped value into the template
- `<%#` Comment tag, no execution, no output
- `<%%` Outputs a literal '<%'
- `%>` Plain ending tag
- `-%>` Trim-mode ('newline slurp') tag, trims following newline
- `_%>` ‘Whitespace Slurping’ ending tag, removes all whitespace after it



### Passing Data Through Templates

```ejs

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Home</title>
        <meta name="description" content="HTML5 Template for new projects">
        <meta name="author" content="">

        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body>
        <h1>Your random number is: <%= Math.floor(Math.random() * 10) + 1; %></h1>

    </body>
</html>
```

Generally you want to remove as much logic as possible from our templates. Templates should be just display. Instead it would be better to generate the number first and then pass it to the template. 

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home.ejs'); // You could add home.ejs too
  console.log('Player Entered!');
});
app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', { rand: num });
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
```

```ejs

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Home</title>
        <meta name="description" content="HTML5 Template for new projects">
        <meta name="author" content="">

        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body>
        <h1>Your random number is:<%= rand %></h1>

    </body>
</html>
```

We are creating a variable called `num` that stores a number 1 through 10. Within the `.render()` method has a second parameter, that is optional, that can pass in an object. Whatever I pass in here like `rand:` and set it equal to num `rand: num`. Whatever num is, it will be available in `random.ejs` template, remember you don't need to add .ejs at the end.

So, when the template is rendered, it will pass the object to the template. Then it will have access to a variable called `rand`. You can also, just do `{ num }` where the key and value are the same. It's the same thing as `{ num: num }`.

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home.ejs'); // You could add home.ejs too
  console.log('Player Entered!');
});
app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', { num });
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
```

```ejs

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Home</title>
        <meta name="description" content="HTML5 Template for new projects">
        <meta name="author" content="">

        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body>
        <h1>Your random number is:<%= num %></h1>

    </body>
</html>
```



### Serving Static Assets in Express

Serving static files refers to serving things like CSS and JavaScript files that we want to include in the response back to the client side. Often time we're going to have some styles need to be run and some JavaScript that needs to run in the browser, we want to include those into our response. To do that we need to serve those assets, we need to use `express.static()`.

### express.static(root, [options])

This is a built-in middleware function in Express. It serves static files and is based on [serve-static](http://expressjs.com/resources/middleware/serve-static.html). The `root` argument specifies the root directory from which to serve static assets. The function determines the file to serve by combining `req.url` with the provided `root` directory. When a file is not found, instead of sending a 404 response, it instead calls `next()` to move on to the next middleware, allowing for stacking and fall-backs.

```js
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options));
```

`app.use()` runs every single time we have any request, it doesn't care if it's a get request or post request like the `.get()`method. `express.static('public')` is a middleware, it runs in between the requests coming in and the response going out. 

```js
app.use(express.static('public'));
```

I'm calling `.use(express.static())` and adding a directory named `public`. It doesn't have to be named `public` it just has to match with a existing directory in the project.

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const redditData = require('./data.json');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home'); // You could add home.ejs too
  console.log('Player Entered!');
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render('subreddit', { ...data });
  } else {
    res.render('notfound', { subreddit });
  }

});

app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', { num });
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
```

Within public directory create a css file and add anything you like so you can see the changes.

```css
/* style.css */
body {
  background-color: green;
}
```

WIthin one of the EJS files connect the css to that file

```ejs

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title><%= name %></title>
        <meta name="description" content="HTML5 Template for new projects">
        <meta name="author" content="">

        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <h1>You're browser the <%= name %> subreddit</h1>
        <h2><%= description %> </h2>
        <p><%= subscribers %> Total Subscribers</p>
        <hr>

        <% for (let post of posts) { %>
            <article>
                <p><%= post.title %> - <b><%= post.author %></b></p>
                <% if (post.img) { %>
                    <img src="<%= post.img %>" alt="">
                <% } %>
            </article>
       <% } %>
    </body>
</html>
```

We're serving the entire contents of the `public` directory, we don't need to reference the path `/public` because the directory itself is not going to be served, but the content of the `public` directory will be served. 

If we run out side of the project directory, it can't find the `style.css` because it was not served correctly, it was lookng for `public` directory in the directory above our project and it doesn't exist. 

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('home'); // You could add home.ejs too
  console.log('Player Entered!');
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render('subreddit', { ...data });
  } else {
    res.render('notfound', { subreddit });
  }

});

app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render('random', { num });
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
```

So, we want `express.static()` to be an absolute path based upon the `index.js` (the script we a running in).

Basically `__dirname` is grabbing the absolute path of `index.js directory and adding `public` to the path. 

Ex: /Users/fonysony/Documents/dev-home/Colt Steele's Web Bootcamp/dynamicHTMLTemplating-34/Templating_Demo/public



### EJS & Includes

### Includes

Includes are relative to the template with the `include` call. (This requires the 'filename' option.) For example if you have "./views/users.ejs" and "./views/user/show.ejs" you would use `<%- include('user/show'); %>`.

You'll likely want to use the raw output tag (`<%-`) with your include to avoid double-escaping the HTML output.

```html
<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}); %>
  <% }); %>
</ul>
```

 I can include() any file to another file so that the code of the file I'm `include()` will run on the other file. Within the `views` directory, you can make another directory that will hold the dynamic code we'll be using.

Within that new directory of the dynamic code, add the files that you will be using dynamic. For example:

```ejs
<!-- head.ejs -->
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>My Site</title>
    <meta name="description" content="HTML5 Template for new projects">
    <meta name="author" content="">

    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <script src="/js/jquery-3.6.0.js"></script>
    <script src="/js/bootstrap.min.js"></script>
</head>

<body>
```

```ejs
<!-- footer.ejs -->
	<footer>This is the footer</footer>

    </body>
</html>
```

```ejs
<!-- Home.ejs -->
<%- include('headers/head') %> 
        <%- include('headers/navbar') %> 
    <body>
        <h1>The Home Page</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis, obcaecati illum, odio eum eaque iste illo quia earum voluptatum excepturi enim sit quam commodi quo. Totam rem debitis sequi dignissimos.</p>

        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa velit voluptate consequuntur voluptatem, tenetur sequi laudantium optio, nam natus alias magnam dolore error? Repudiandae expedita quae quis neque vel placeat?</p>
        
<%- include('headers/footer') %> 
```

```ejs
<!-- notfound.ejs -->
<%- include('headers/head') %> 
        <%- include('headers/navbar') %> 
        <h1>I'm sorry, we couldn't find the <%= subreddit %> subreddit</h1>

<%- include('headers/footer') %> 
```

```ejs
<!-- random.ejs -->
<%- include('headers/head') %> 
        <%- include('headers/navbar') %> 
    <body>
        <h1>Your random number is:<%= num %></h1>

<%- include('headers/footer') %>
```

You can see here that we can use dynamic code to make our code more effecient and less DRY (Don't Repeat Yourself). Making these reusable templates will reduce a lot of duplication. 

The `<%-` means there are HTML that we're outputting that won't escape. Escaping content means we're are treating like strings. It will be treated as HTML.

The `<%=` means the content inside of the brackets is going to be escaped. 

