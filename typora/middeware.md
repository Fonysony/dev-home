# Middeware

Express middleware are functions that run during the request/response lifecycle. They are the building block of Express.js.

    - Middleware are just functions
    - Each middleware has access to the request and response objects
    - Middleware can end the HTTP request by sending back a response with methods like res.send()
    - Or middleware can be chained together, one after another by calling next()

    Actions:

    - make changes to the request and the response objects
    - End the request-response cycle
    - Call the next middelware in the stack

Whats most important about middleware is that incoming requests comes in hitting the first middleware, that middleware can end the whole cycle and send back some responds or it can be one link to a chainware, will call other middlewares and so on.

Middleware functions have access to the request object (req), the response object (res), and the next function in the apps request-response lifecycle.

## Writing middleware

If the current middleware function does not end the request-response cycle, it must be called by next() to pass control to the next middleware function.

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req/* request argument */, res/* response argument */, next) => /* The middleware anonymous arrow function */ {
    next();
});

app.listen(port);
```