## Async Functions 

- A newer and cleaner syntax for working with async code!
- Syntax 'makeup' for promises

Two keywords:

- ASYNC
- AWAIT

## Async Keyword

- Async functions always return a promise.
- If the function returns a value, the promise will be resolved with that value.
- If the function throws an exception, the promise will be rejected.

```js
async function hello() {
  return 'hey guy!';
}
hello();
// Promise {<resolved>: "Hey guys!"}
async function unOh() {
  throw new Error('oh no!');
}
uhOh();
// Promise {<rejected>: Error: oh no!}
```

If we declare a function by async, by default the async function will return a promise.

```js
function hello() {
  
}
hello(); // undefined

async function hello2() {
  
}

hello2(); // Promise {}
```

```js
const sing = async () => {
  return 'alalalal';
}
```

If we throw an error inside of an async function, that promise that is created is going to be rejected and if it returns a value, that created promise will be resolved. 

```js
const sing = async () => {
  return 'la la la';
}

// Output
// Promise {}
```

```js
const sing = async () => {
  throw new Error('OH NO!');
  return 'la la la';
}
```



Lets say we have a login page and we want to check if the user inputed the right information.

```js
const login = async (username, password) => {
  if (!username || !password) throw 'Missing Username or password'
  if (password === 'SquidGame') return 'WEClOME TO SQUID'
  throw 'Invalid Password'
}

login('akjsdhsa', 'fundirn')
	.then(msg => {
  	console.log('Logged In');
  	console.log(msg);
})
.catch(err => {
  console.log('ERROR!');
  console.log(err);
})
```



## Await Keyword

It will wait whenever we use the await keyword, it will pause the execution of our async function and wait for a promise to be resolved before continuing on.

- We can use the await keyword inside of functions declared with async.
- Await will pause the execution of the function, waiting for a promise to be resolved. 

```js
const delayedColorChange = (color, delay, doNext) => {
  return new Promise((resolve, reject) => {
		setTimeout(() => {
    	document.body.style.backgroundColor = color;
        resolve();
  	}, delay)
  })
}

async function rainbow() {
  await delayedColorChange('red', 1000);
  console.log('CODE IS STILL RUNNING!');
  await delayedColorChange('orange', 1000);
  await delayedColorChange('yellow', 1000);
  await delayedColorChange('green', 1000);
  await delayedColorChange('blue', 1000);
  return 'END OF RAIN';
}

rainbow.then(() => console.log('End OF RAINBOW!!!'));
```

You see here that because we are using a async function, by default it returns a promise. We then can use the await keyword to wait until the promise is resolved to continue on with our code. You can see that the console.log() will only run until that first await gets a resolved promise. 

But what do we do when we get an error and the code stops? We can use try and catch.

```js
try {
  sdgkjsdgk.log('sdgs'); // error
} catch (err) {
  console.log('errror, but Its ok');
}
```

Here because the code will result into an error the try will notice and catch will shoot out whatever we throwed in catch and continue on with the code. 

```js
const fakeRequest = url => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
      if (delay > 4000) {
    	  reject('Connection timeout :(');
      } else {
        resolve(`Here is your fake data from ${url}`);
      }
    }, delay)
  })
}

async function makeTwoRequests() {
  try {
    let data1 = await fakeRequest('/page1');
  	console.log(data1);
  } catch(err) {
    console.log(`caught an error: ${err}`);
  }
}
```

