# Async JavaScript

## The Call Stack

The mechanism the JS interpreter uses to keep track of it's place in a script that calls multiple functions.

How JS "knows" what function is currently being run and what functions are called from within that function, etc.

A stack is a basic data structure in computer science. It's like a LIFO (Last In, First Out) data structure, think of a stack of books where the first thing in the stack starts at the bottom and as you add you add to the top, but once you remove you remove from the top of the stack. You remove the thing that was most recently added. 

### How it Works

- When a script calls a function, the interpreter adds it to the call stack and then starts carrying out the function.
- Any functions that are called by that function are added to the call stack further up, and run where their calls are reached.
- When the current function is finished, the interpreter takes it off the stack and resumes execution where it left off in the last code listing. 

## WebAPI's & Single Threaded

Single Threaded - at any given point in time, that single JS thread is running at most one line of JS code. Basiscally meaning JS is running one line of code most of the time. 

```js
console.log('Sending request to server');
setTimeout(() => {
  console.log('')
}, 3000);
console.log('I am at the end of the file!');
```

We talked about that most of the time JS is running on line of code, does that mean if we grab something that will take awhile to load or wait for a certain amount of time stop the code from continuing on? No cause the browser is doing the work not js. The browser isn't written in JS, typically the browser is written in languages like C++. JS will hand off certain tasks to the browser to take care of. Browsers come with Web API's, they are generally methods, that we can call with JS.

- Browsers come with Web APIs that are able to handle certain taks in the background (like making requests or setTimeout)
- The JS call stack recognizes these Web API functions and passes them off to the browser to take care of
- Once the browser finishes those tasks, they return and are pushed onto the stack as a callback.

The call stack in JavaScript is able to recognize these special Web API functions and it can pass them off to the browser. Once, the browser finishes those tasks, then  they're added back to the call stack and JS takes it over again executing the appropriate code. 



## Callback Hell

 Lets say we want to make the background-color of the body change through the rainbow each time a second goes by, how can we do this?

```js
document.body.style.backgroundColor = 'red';
document.body.style.backgroundColor = 'orange';
```

This won't work because we are re-defining the body's backgroundColor which is changing so quick we can't tell that it has changed. We instead can use the windows setTimeout method or Web API to callback a function after a certain amount of time.

```js
setTimeout(() => {
  document.body.style.backgroundColor = 'red';
}, 1000)

setTimeout(() => {
  document.body.style.backgroundColor = 'orange';
}, 1000)
```

This also won't work because JS is executing the code practically at the same time so, we won't see red. We could add more time to each color we keep on adding, but this will get DRY (Don't Repeat Yourself). We instead can nest the setTimeout() within each other so that it will call after the parent one is finished. 

```js
setTimeout(() => {
  document.body.style.backgroundColor = 'red';
  setTimeout(() => {
  	document.body.style.backgroundColor = 'orange';
    setTimeout(() => {
  		document.body.style.backgroundColor = 'yellow';
      setTimeout(() => {
  			document.body.style.backgroundColor = 'green';
        setTimeout(() => {
  				document.body.style.backgroundColor = 'blue';
			}, 1000)
			}, 1000)
		}, 1000)
	}, 1000)
}, 1000)
```

We can create a function that can have different delays or have other colors that we add.

```js
const delayedColorChange = (newColor, delay) => {
  setTimeout(() => {
    document.body.style.backgroundColor = newColor;
  }, delay)
}

delayedColorChange('olive', 3000);
delayedColorChange('teal', 3000);
```

When calling the delayedColorChange() we run into the same problem with the setTimeout being set at the same time so the colors won't seem like it changes. We could add more time like I said before, but that would lead to DRY code. We can nest the setTimeouts within eachother but we need to pass in a callback to our function. 

```js
const delayedColorChange = (newColor, delay, doNext) => {
  setTimeout(() => {
    document.body.style.backgroundColor = newColor;
    	doNext && doNext(); // Just in case it passes in undefined
  }, delay)
}

delayedColorChange('red', 1000, () => {
  console.log("Inside CALLBACK!!");
});
```

 You can see that we are just passing in a function and calling it right after we change the color of the body.

```js
delayedColorChange('red', 1000, () => {
  delayedColorChange('orange', 1000, () => {
  	delayedColorChange('yellow', 1000, () => {
  		delayedColorChange('green', 1000, () => {
  			delayedColorChange('blue', 1000, () => {
				});
			});
		});
	});
});
```



We could have a movies API where we are searching for a movie, but we don't know how long it's gonna take to grab the data, to load, or even have a failure.

```js
searchMoviesAPI('amadeus', () => {
  
});
```

We are searching for a movie in a API and this function will accept a callback and execute the callback whenever it finishes searching for movies. Then when it finishes we want to send the movie to our database to use it later. We can do this by make another function within searchMoviesAPI() and give them into another function, but that could take some time. 

```js
searchMoviesAPI('amadeus', () => {
  saveToMyDB(movies, () => {
    // success
  }, () => {
    // failure 
  });
}, () => {
  // If API is down, or request failed 
});
```

