## GET VS. POST

### GET

- Used to retrieve information
- Data is sent via query string
- Information is plainly visible in the URL!
- Limited amount of data can be sent

We use them to retrieve information and when we submit a GET request, if we have data alongside with the request, that data is included in the query string. You can see the data in the URL and it is bookmarkable. URLs are limited to 2,048 characters, the amount of data you can send is limited. 

### POST

- Used to post data to the server
- Used to write/create/update
- Data is sent via request body, not a query string!
- Can send any sort of data (JSON!)

Conventionally, it's used to create things you can. You can send a bunch of data like, signing up, registering your account or sending a new comment that will be added to a blog. POST request allows us to submit data as part of the request body, which GET doesn't do, because of this POST is more flexible with the size of what is sent using POST requests.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Get and Post</title>
</head>
<body>
    <h1>GET AND POST REQUESTS!</h1>
    <h2>GET</h2>
    <form action="HTTP://localhost:3000/tacos" method="get">
        <input name="food"  type="text">
        <input name="drink" type="text">
        <button>Submit</button>
    </form>
    <h2>POST</h2>
    <form action="HTTP://localhost:3000/sushi" method="post">
        <input name="username" type="text">
        <input name="comment" type="text">
        <button>Submit</button>
    </form>
</body>
</html>
```



```js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));


app.get('/tacos', (req, res) => {
    const data = req.query;
    console.log(data);
    res.send('GOT /tacos');
});

app.post('/sushi', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('GOT /tacos');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
```

So, here there is an easy way of accessing data from the query data like with the get request and it's a property called `query`. Express automatcally parse the data and passes it in to the request parameter as an object, remember cause request (the first parameter) is an object made based upon the incoming HTTP request. 

### .query

This property is an object containing a property for each query string parameter in the route. When [query parser](http://expressjs.com/en/5x/api.html#app.settings.table) is set to disabled, it is an empty object `{}`, otherwise it is the result of the configured query parser.

In the cause of the post request, the request also as an object, but this request has a property called 'body'.

### .body

Contains key-value pairs of data submitted in the request body. By default, it is `undefined`, and is populated when you use body-parsing middleware such as [body-parser](https://www.npmjs.org/package/body-parser) and [multer](https://www.npmjs.org/package/multer).

The following example shows how to use body-parsing middleware to populate `req.body`.

```js
const app = require('express')()
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer() // for parsing multipart/form-data

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', upload.array(), function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})
```

Basically, we can send data in different formats form-data, form-unrlencoded, binary, plain text, JSON, and HTML. There's a lot of different formats and they have to be parsed differently. They follow these different formats and Express needs to know how to treat them. 

So, becuase `.body` is by default `undefined`, we need to explicitly state how it should parse the request bodies.

### express.urlencoded([options])

This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on [body-parser](http://expressjs.com/resources/middleware/body-parser.html).

Returns middleware that only parses urlencoded bodies and only looks at requests where the `Content-Type` header matches the `type` option. This parser accepts only UTF-8 encoding of the body and supports automatic inflation of `gzip` and `deflate` encodings.

A new `body` object containing the parsed data is populated on the `request` object after the middleware (i.e. `req.body`), or an empty object (`{}`) if there was no body to parse, the `Content-Type` was not matched, or an error occurred. This object will contain key-value pairs, where the value can be a string or array (when `extended` is `false`), or any type (when `extended` is `true`).

`extended` is a property, This option allows to choose between parsing the URL-encoded data with the `querystring` library (when `false`) or the `qs` library (when `true`). The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. For more information, please [see the qs library](https://www.npmjs.org/package/qs#readme). By default it is set to true, but this is deprecated so provide true or false.

```js
app.use(express.urlencoded({ extended: true }));
```

This parses form-coded information from the request body. `.use()` method is a way to run on every single request, it doesn't matter what type of request it is or it's path name. It's a middleware and it's telling Express to parse the request body as urlencoded data. 

URL encoded data **describes form data that is sent in a single block in the HTTP message body**. Unlike the query part of the URL in a GET request, the length of the data is unrestricted. This is unually used with form data.

### express.json([options])

This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on [body-parser](http://expressjs.com/resources/middleware/body-parser.html).

Returns middleware that only parses JSON and only looks at requests where the `Content-Type` header matches the `type` option. This parser accepts any Unicode encoding of the body and supports automatic inflation of `gzip` and `deflate` encodings.

A new `body` object containing the parsed data is populated on the `request` object after the middleware (i.e. `req.body`), or an empty object (`{}`) if there was no body to parse, the `Content-Type` was not matched, or an error occurred.



## REST

### What is REST?

Representational State Transfer (REST), is an "architectural" style for distributed hypermedia systems". Yikes.

It's basically a set of guidelines for how a client + server should communicate and perform CRUD (create, read, update ,delete) operations on a given resource.

The main idea of REST is treating data on the server-side as resources that can be CRUDed.

The most common way of approaching REST is in formatting the URLs and HTTP verbs in your applications.

RESTful is a system that complies with the rules of REST. 

Let say I have an application with a server and a database will tweets. I want anybody to be able to create new tweets, view existing tweets, update existing tweets and delete existing tweets. All this stands for CRUD. 

Resources comes up a lot in RESTful applications or in REST. A resource is just an entity, it could be a tweet, user, image, text message etc, but a resource is an entity that we are going to expose or provide access to via HTTP.

Every RESTful system has a uniform interface, which most of the time consists of having some sort of consisten URL pattern matched with different HTTP verbs. Combing some URL with different methods to expose full CRUD operations over HTTP.

### RESTful Comments Overview

GET /comments - list all comments

POST /comments - Create a new comment 

GET / comments/:id - Get one comment (using ID)

PATCH / comments/:id - Update one comment

DELETE / comments/:id - Destroy one comment



### The data.js

```js
// data.js
const tweets = [
    {
        username: 'Fonysony',
        comment: 'Bitch, I love my sushi though',
    },
    {
        username: 'Mattlovescup',
        comment: 'I really did it hard this time',
    },
    {
        username: 'Just_holywater',
        comment: `Why didn't you pay for that beat though?`,
    },
    {
        username: 'Scrublord720',
        comment: `Girls ain't shit! Girls ain't SHIT!!!`,
    },
    {
        username: 'Crummyplane',
        comment: 'Simply get better',
    },
    {
        username: 'alexthebuttslayer',
        comment: 'Ya, I built my castle in a day',
    },
    {
        username: 'loveliveloveserver',
        comment: `You ain't gonna rap over this one!`,
    },
    {
        username: 'girlISHOE',
        comment: 'OHHHH, HE NEED SOME MILK!!!',
    },
    {
        username: 'cowBoybeat',
        comment: `THAT'S A BIG BOI!!`,
    },
    {
        username: 'Bigray',
        comment: 'I only get bitches',
    },
];

module.exports = tweets;
```



### GET /comments - list all comments

```ejs
<!-- comments/index.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Commetns Index</title>
</head>
<body>
    <h1>Comments</h1>
    <ul>
       <% for (const c of tweets) { %>
            <li><%=c.comment%> - <b><%=c.username%></b></li>
       <% } %>
    </ul>
</body>
</html>
```

```js
// index.js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const tweets = require('./data');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/comments', (req, res) => {
    console.log(tweets);
    res.render('comments/index.ejs', { tweets });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
```



### POST /comments - Create a new comment 

```ejs
<!-- comments/new.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create New Comment</title>
</head>
<body>
    <h1>Create Comment</h1>
    <form action="/comments" method="post">
        <section>
            <label for="username">Username:</label>
            <input name="username" id="username" type="text">
        </section>
        <section>
            <label for="comment">Comment</label>
            <br>
            <textarea name="comment" id="comment" cols="30" rows="5"></textarea>
        </section>
        <button>Submit</button>
    </form>
</body>
</html>
```

```js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const tweets = require('./data');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    tweets.push({username, comment});
    console.log(tweets);
    res.render('comments/index.ejs', { tweets });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
```

Whenever you make a new comment, and refresh the page that the form sent you to. Cause it's a post request if you refresh it's gonna resubmit the data you filled in. To fix this, right when the user sends the data, we're going to redirect the user to another location or file. Redirect the user to our index comment file where they can see all the comments outputted.

### .redirect([status,] path)

Redirects to the URL derived from the specified `path`, with specified `status`, a positive integer that corresponds to an [HTTP status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) . If not specified, `status` defaults to “302 “Found”.

```javascript
res.redirect('/foo/bar')
res.redirect('http://example.com')
res.redirect(301, 'http://example.com')
res.redirect('../login')
```

Redirects can be a fully-qualified URL for redirecting to a different site:

```javascript
res.redirect('http://google.com')
```

Just to recap, status codes with 3 are redirect status codes. The default status code that Express will send back with `.redirect()` is a 302. When our browser gets a 302 satatus code, it follows up and makes a second request based upon the location that was sent back from the inital response. 

```js 
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const tweets = require('./data');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/comments', (req, res) => {
    res.render('comments/index', { tweets });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    tweets.push({username, comment});
    res.redirect('/comments');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
```

This sends a post request, it seems seamless, but what actually happens is our first response that gave a 302 status code will redirect to the `location`, which is specified in the forms `action`, and because we have a get request on that location it will run the code for that and output all the comments. 

### show /comments/:id GET -- Form to edit specific comment

Information about one particiular resource. It could be a comment, or a Airbnb listing etc. 

The way this route works is that it has an unique identifier for a resource. 

```js
const tweets = [
    {
        id: 1,
        username: 'Fonysony',
        comment: 'Bitch, I love my sushi though',
    },
    {
        id: 2,
        username: 'Mattlovescup',
        comment: 'I really did it hard this time',
    },
    {
        id: 3,
        username: 'Just_holywater',
        comment: `Why didn't you pay for that beat though?`,
    },
    {
        id: 4,
        username: 'Scrublord720',
        comment: `Girls ain't shit! Girls ain't SHIT!!!`,
    },
    {
        id: 5,
        username: 'Crummyplane',
        comment: 'Simply get better',
    },
    {
        id: 6,
        username: 'alexthebuttslayer',
        comment: 'Ya, I built my castle in a day',
    },
    {
        id: 7,
        username: 'loveliveloveserver',
        comment: `You ain't gonna rap over this one!`,
    },
    {
        id: 8,
        username: 'girlISHOE',
        comment: 'OHHHH, HE NEED SOME MILK!!!',
    },
    {
        id: 9,
        username: 'cowBoybeat',
        comment: `THAT'S A BIG BOI!!`,
    },
    {
        id: 10,
        username: 'Bigray',
        comment: 'I only get bitches',
    },
];

module.exports = tweets;
```

```ejs

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Commetns Index</title>
</head>
<body>
    <h1>Comments</h1>
    <ul>
       <% for (const c of tweets) { %>
            <li>
                <%=c.comment%> - <b><%=c.username%></b>
                <a href="/comments/<%= c.id %>">details</a>
            </li>
       <% } %>
    </ul>
</body>
</html>
```

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show</title>
</head>
<body>
    <h1>Comment id: <%= tweet.id %></h1>
    <h2><%= tweet.comment %> - <%= tweet.username %></h2>
    <a href="/comments">Back to index</a>
</body>
</html>
```

```js
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const tweet = tweets.find(c => c.id === parseInt(id));
    console.log(tweet);
    res.render('comments/show', { tweet });
});
```

### The UUID Package

So, when we go and make a new comment the details link in `index.ejs` won't work because the new comments have no id on them. 

So, lets use the UUID Package to get some unique ID's for our comments. 

### uuid

#### Install

```shell
% npm install uuid
```

#### Create a UUID (ES6 module syntax)

```js
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

#### ... or using CommonJS syntax:

```js
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```



```js
// data.js
const { v4: uuid } = require('uuid');

const tweets = [
    {
        id: uuid(),
        username: 'Fonysony',
        comment: 'Bitch, I love my sushi though',
    },
    {
        id: uuid(),
        username: 'Mattlovescup',
        comment: 'I really did it hard this time',
    },
    {
        id: uuid(),
        username: 'Just_holywater',
        comment: `Why didn't you pay for that beat though?`,
    },
    {
        id: uuid(),
        username: 'Scrublord720',
        comment: `Girls ain't shit! Girls ain't SHIT!!!`,
    },
    {
        id: uuid(),
        username: 'Crummyplane',
        comment: 'Simply get better',
    },
    {
        id: uuid(),
        username: 'alexthebuttslayer',
        comment: 'Ya, I built my castle in a day',
    },
    {
        id: uuid(),
        username: 'loveliveloveserver',
        comment: `You ain't gonna rap over this one!`,
    },
    {
        id: uuid(),
        username: 'girlISHOE',
        comment: 'OHHHH, HE NEED SOME MILK!!!',
    },
    {
        id:uuid(),
        username: 'cowBoybeat',
        comment: `THAT'S A BIG BOI!!`,
    },
    {
        id: uuid(),
        username: 'Bigray',
        comment: 'I only get bitches',
    },
];

module.exports = tweets;
```

```js
// index.js
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const tweets = require('./data');
const { v4: uuid } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/comments', (req, res) => {
    res.render('comments/index', { tweets });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    tweets.push({username, comment, id: uuid()});
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const tweet = tweets.find(c => c.id === id);
    console.log(tweet);
    res.redirect('comments/show', { tweet });
});

app.get('/tacos', (req, res) => {
    const data = req.query;
    console.log(data);
    res.send('GOT /tacos');
});

app.post('/sushi', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('GOT /tacos');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
```



### Update /comments/:id Patch -- Updates specific comment on server

[`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)

The `GET` method requests a representation of the specified resource. Requests using `GET` should only retrieve data.

[`HEAD`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)

The `HEAD` method asks for a response identical to a `GET` request, but without the response body.

[`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)

The `POST` method submits an entity to the specified resource, often causing a change in state or side effects on the server.

[`PUT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)

The `PUT` method replaces all current representations of the target resource with the request payload.

[`DELETE`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)

The `DELETE` method deletes the specified resource.

[`CONNECT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT)

The `CONNECT` method establishes a tunnel to the server identified by the target resource.

[`OPTIONS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS)

The `OPTIONS` method describes the communication options for the target resource.

[`TRACE`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE)

The `TRACE` method performs a message loop-back test along the path to the target resource.

[`PATCH`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)

The `PATCH` method applies partial modifications to a resource.

A `put` request is going to completely update an entire thing, would take whatever payload that came with the request and would make a new version of the comment.

`Patch` request is used to partially modify something. 

```js
app.patch('/comments/:id', (req, res) => {
  	const { id } = req.params;
    const newTweetText = req.body.comment;
    const tweet = tweets.find(c => c.id === id);
    tweet.comment = newTweetText;
});
```

Like with `post` request, a `path` request can have a payload, It can have a body request that we can access in our Express route callback. 

Just like before with creating a comment, we don't want to respond with content from a patch route, just like with a post route. We usually redirect.

```js
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newTweetText = req.body.comment;
    const tweet = tweets.find(c => c.id === id);
    tweet.comment = newTweetText;
    res.redirect('comments');
});
```



First of all, the concept of a patch request and a put request. They have to do with editing or changing something that already exists.

`Patch` request is supposed to be used when we are patching a resource where either, updating or adding to an existing resource. The payload or `req.body` only contains the new comment text or patch. 

`Put` request, how it works is that the payload, (the body including the whole comment/text, id, username etc), replaces what is already in the database with the new payload. 

### Edit /comments/:id/edit GET -- Form to edit specific comment

```js
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(c => c.id === id);
    res.render('comments/edit', { tweet });
});
```

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit</title>
</head>
<body>
    <h1>Editing <%= tweet.id %> </h1>
    <form action="/comments/<%= tweet.id %>/edit">
        <textarea name="comment" id="" cols="30" rows="5"><%= tweet.comment %></textarea>
        <button>Save</button>
    </form>
</body>
</html>
```

There is a problem with this, HTML forms in our browser an only send, `get` or `post` requests. They can't send a `put` request,  a `patch` request, or a `delete` request. There is this nice package called `method-override`.

### Express Method Override

Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.

#### Install

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/). Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install method-override
```

#### Example

```js
var express = require('express')
var methodOverride = require('method-override')
var app = express()

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
```



#### override using a query value

To use a query string value to override the method, specify the query string key as a string argument to the `methodOverride` function. To then make the call, send a `POST` request to a URL with the overridden method as the value of that query string key. This method of using a query value would typically be used in conjunction with plain HTML `<form>` elements when trying to support legacy browsers but still use newer methods.

```javascript
var express = require('express')
var methodOverride = require('method-override')
var app = express()

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
```

Example call with query override using HTML `<form>`:

```html
<form method="post" action="/resource?_method=DELETE">
  <button type="submit">Delete resource</button>
</form>
```

So we are calling `.use(methodOverride('_method'))` and then provide a string, the option they go with is  `_method`, it's good practice because you not gonna really have anything with underscored. 

Whatever `_method` is set to, is what Express will actually treat the HTTP verb as. Even though the HTML form `method` is set to `post`, Express will treat it as a `delete` request. 

Make sure the HTML form `method` is set to `post` because `method-override` won't work if so.

```js
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
```

```ejs
// edit.ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit</title>
</head>
<body>
    <h1>Editing: <%= tweet.id %> </h1>
    <form method="post" action="/comments/<%= tweet.id %>?_method=PATCH">
        <textarea name="comment" id="" cols="30" rows="5"><%= tweet.comment %></textarea>
        <button>Save</button>
    </form>
</body>
</html>
```

```js
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newTweetText = req.body.comment;
    const tweet = tweets.find(c => c.id === id);
    tweet.comment = newTweetText;
    res.render('comments/show', { tweet });
});
```

This .patch helps with the editing to save the edit. Remember that you don't wanna always render with a `patch` request. 



