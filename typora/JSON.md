## JSON

JSON stands for Java Script Object Notation.

```json
{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    "Molecule Man",
    "Madame Uppercut",
    "Eternal Flame"
  ]
}
```

You can go to https://www.json/org/json-en.html to see more information about JSON syntax. 

The value that JSON has are:

- object
- array
- string
- number
- "true"
- "false"
- "Null"

JSON is sent as a string, but there is a method on JS where you can covert the JSON code to js and it's called JSON.parse(). You pass in a string into JSON.parse() and it will converted to a JS object. 

There is another method that will take js code and covert it into JSON if you need to send it somewhere and it's called JSON.stringify(). By default, all instances of undefined are replaced with null, and other unsupported native data types are censored. 

```js
const dog = {breed: 'lab', color: 'black', isAlive: true, owner: undefined};
JSON.stringify(dog);
// {"breed":"lab","color":"black","isAlive":true}
```



The GET request is retrieving or getting information, we are requesting to get some data.

Post request is used to send data that we intend to somehow impact the server side.

## Query String & Header

URL: /search/shows?q=query

Anytime you see colen (:) in a url on api documentation, it's a way of saying that this is a variable, it something that you provide. The ?q is a query string. it's a way of providing additional information to a request. Lets say https://developer.mozilla.org/en-US/search is the basis URL we're searching. Then we have to specify what we are searching, the way that mozilla is setup it is looking for a Q to be provided. We could search for color by adding ?q=color to the url, https://developer.mozilla.org/en-US/search?q=color



## XMLHttpRequest

- The "original" way of sending requests via JS.
- Does not support promises, so...lots of callbacks!
- WTF is going on with the weird capitalization?
- Clunky syntax that I find difficult to remember!

```js
const myReq = new XMLHtppRequest();
myReq.onload = function() {
  const data = JSON.parse(this.responseText);
  console.log(data);
};
myReq.onerror = function(err) {
  console.log('ERROR!', err);
};
myReq.open('get', 'https://icanhazdadjoke.com/', true);
myReq.setRequestHeader('Accept', ' application/json');
myReq.send();

```



## Fetch API

This is the newer way of making HTTP Requests using JS. 

- The newer way of making requests via JS
- Supports promises!
- Not supported in Internet Explorer :(

```js
fetch('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
```

One problem with fetch is that we don't actually have the data just yet. What happens is that fetch is going to resolve the promise triggering. At soon as it receives the headers coming from this API it will trigger the promise, it doesn't wait to resolve when all the data is back. It sends the data is streams so, we aren't guaranteed the body of the data. 

```js
fetch('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.log(res);
  			return res.json() // we could add the .then here but we want to chain out so the code looks cleaner
    })
		.then(data => { // Works due to return on res.json()
  		console.log(data);	
		})
    .catch(err => {
        console.log(err);
    })
```

There is a second method called the DOT JSON. 