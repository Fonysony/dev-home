# Enter Promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation. The most common example is making request or getting data from some location. For example, getting data from Netflix or a movies API. We know it takes time and know that sometimes it will work , sometimes it won't. When you would make a request you would need two callbacks for a success and failure, but this can become DRY or as they call it 'Callback hell'. 

```js
fakeRequestCallback('books.com/page1',
	function (response) {
  	console.log('It WORKED!!');
  	console.log(response);
  	fakeRequestCallback('books.com/page2',
    	function (response) {
      	console.log('It WORKED AGAIN!!');
  			console.log(response);
    },
    function (err) {
    	 console.log('ERRROr!!', err);
    })
	}, function (err) {
  		console.log('ERRROr (2)!!', err);
})
```

Promise have this [[PromiseState]] where it tells you if the request is pending, resolved, or rejected. Pending means we are waiting for something, resolved means a success happened and rejected means the request failed. 

The whole point of promises is that I can run code when that promise is rejected and resolved. 

- A promise is a returned object to which you attach callbacks, instead of passing callbacks into a function. 

  ```js
  fakeRequestPromise('yelp.com/api/coffee/page1')
  	.then() => {
    	console.log('it WORKED!!! (page1)')
    	fakeRequestPromise('yelp.com/api/coffee/page1')
  			.then() => {
    			console.log('it WORKED!!! (page2)')
    		}
  			.catch(() => {
      		console.log('OH NO, ERROR!!! (page2)')
    		})
   	}
  	.catch(() => {
      console.log('OH NO, ERROR!!! (page1)')
    })
  ```

  We still have that callback hell of nesting even with the promise, but there is something magical with promises that we will see next.

## The Magic Of Promises

```js
fakeRequestPromise('yelp.com/api/coffee/page1')
	.then(() => {
  	console.log('IT WORKED!!! (page1)');
  	return fakeRequestPromise('yelp.com/api/coffee/pages2');
	})
	.then(() => {
  	console.log('IT WORKED!!! (page2)');
  	return fakeRequestPromise('yelp.com/api/coffee/pages3');
	})
	.then(() => {
  	console.log('IT WORKED!!! (page3)');
	})
	.catch(() => {
  	console.log('OH NO, A REQUEST FAILED!!');
})
```

Here instead we are returning that promise, allowing us to use the .then outside of other .thens. We then can use a single .catch for all of these. So, if anyone of these promises is rejected, it falls through and it hits the .catch().

We are chaining promises after another saying, if the first promise is resolved, then return a new promise, but if at any point a promise is rejected, run the .catch(). 

## Creating Our Own Promises 

```js
new Promise((resolve, reject) => {
  resolve();
})
```

You can use new Promise() to create a new promise, but it expects us to pass in a function.  In the function there are two required parameters, first one is usually called resolve and the second one is reject. If we call one of the function that we pass in, the first parameter will always resolve the promise making it say resolved in the [[PromiseState]]. If we call the second parameter it will always say rejected in the [[PromiseState]] and if we say nothing the [[PromiseState]] will be pending until resolve or reject is called.

```js
const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    const rand = Math.random();
    setTimeout(() => {
      if (rand < 0.7) {
        resolve('YOUR FAKE DATA HERE');
        console.log('RESOLVED@!!');
      }
      reject('Request Error!');
      console.log('REJECTEDD');
    }, 5000)
  })
}
```

```js
fakeRequest('/dogs/1')
	.then((data) => {
  	console.log('DONE WITH REQUEST!!', data);
	})
	.catch((err) => {
  	console.log('OH NO ERROR!!!', err);
})
```

Once resolve() or reject() is called the .then and .catch will only run one depending on which parameter/function in run in the promise.

```js
const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    resolve();
    reject();
  })
}

fakeRequest('/dogs/ok')
    .then(() => {
        console.log('OK');
    })
    .catch(() => {
        console.log('NO!');
    })

// Output
// OK
```

```js
const fakeRequest = (url) => {
  return new Promise((resolve, reject) => {
    reject();
    resolve();
  })
}

fakeRequest('/dogs/ok')
    .then(() => {
        console.log('OK');
    })
    .catch(() => {
        console.log('NO!');
    })

// Output
// NO!
```



```js
const delayedColorChange = (color, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.body.style.backgroundColor = color;
      resolve();
    }, delay)
  })
}

delayColorChange('red', 1000)
	.then(() => delayedColorChange('orange', 1000))// Implicit return
	.then(() => delayedColorChange('yellow', 1000))
	.then(() => delayedColorChange('green', 1000))
	.then(() => delayedColorChange('blue', 1000))
```

