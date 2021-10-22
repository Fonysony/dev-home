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

