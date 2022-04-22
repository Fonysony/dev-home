

## Foreach Method

```js
const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];
nums.forEach(function(n) {
  console.log(n * n);
  // 81, 64, 49, 36, 25, 16, 9, 4, 1
});
```

Accept a callback function. Calls the function once per element in the array.

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function print(element) {
  console.log(element);
};
numbers.forEach(print);
```

This isn't really common to do forEach() and just pass in a function you already defined. What we mostly commonly see is defining an anonymous function expression inside of the forEach argument.

```js
numbers.forEach(function(el) {
  console.log(el);
});
```

This is usually someones first choose on doing something once per element in some array.

```js
for (let el of numbers) {
	console.log(el);
};
```

For of loop is the newer syntax to loop through an array.



```js
const movies = [
  {
    title: 'Amadeus',
    score: 85
  },
  {
    title: 'Stand By Me',
    score: 85
  },
  {
    title: 'Parasite',
    score: 90
  },
  {
    title: 'Alien',
    score: 90
  }
];

movies.forEach(function(movie) {
  console.log(`${movie.title} - ${movie.score}/100`);
});
```

For movies we are using forEach() and declaring a function to be called with movie set to it's parameter. We then, console.log() each object values as it iterates through.



## The MAP Method

Map creates a new array with the results of calling a callback on every element in the array

```js
const texts = ['rofl', 'lol', 'omg', 'ttyl'];
const caps = texts.map(function(t) {
  return t.toUpperCase();
});
texts; // ["rofl", "lol", "omg", "ttyl"]
caps; // ["ROFL", "LOL", "OMG", "TTYL"]
```

We are creating a texts array full with stringed values. We then, create a variable named 'caps' equaling to the array.map method (texts.map()) with a callback function that has a variable 't' set to it's parameter. This callback function has a return that will .toUpperCase() all of the elements with texts. Map then will create a new array with all the elements that are .toUpperCase() and store it to caps.

```js
const movies = [
  {
    title: 'Amadeus',
    score: 85
  },
  {
    title: 'Stand By Me',
    score: 85
  },
  {
    title: 'Parasite',
    score: 90
  },
  {
    title: 'Alien',
    score: 90
  }
];

const titles = movies.map(function(movie){
  return movie.title;
});
titles; // ['Amadeus', 'Stand By Me', 'Parasite', 'Alien']
```



## Arrow Functions

```js
const add = function(x, y) {
  return x + y;
};

const add = (x, y) => {
  return x + y;
};
```

Arrow function are a newer syntax to define a function expression. They are great for one time function expression, instead of having to use the function keyword.

```js
const movies = [
  {
    title: 'Amadeus',
    score: 85
  },
  {
    title: 'Stand By Me',
    score: 85
  },
  {
    title: 'Parasite',
    score: 90
  },
  {
    title: 'Alien',
    score: 90
  }
];

const titles = movies.map((movie) => {
  return movie.title;
});
titles; // ['Amadeus', 'Stand By Me', 'Parasite', 'Alien']
```

Functions expressions can't be declare on they're own, but we can give it a function statement (function add()), save them to a variable or pass them as a argument if we can return it.

```js
function (x, y) {
  return x + y;
}; // This function will not work because we have to declare it either with function statment, passing it to a variable, etc..

function add(x, y) {
  return x + y;
}; // add is the function statment being declared
```

Arrow functions are the same way, we can't declare an arrow function on it's own, we either give it a function statement, store it into a variable or pass it.

```js
(x, y) => {
	return x + y;
}; // THis wont work

const add = (x, y) => {
  return x + y;
};
```

If there is only one parameter, the parentheses aren't needed.

```js
const square = num => {
  return num * num;
};

const sqaure = num, x => {
  return num * x;
}; // You will get a syntax error because you need the parentheses when declaring more than one parameter.
```



## Arrow Function Implicit Returns

We can only do this with arrow functions and not with our typical function expression. You can leave off the return keyword in sertain situations. All these functions do the same thing;

```js
const isEven = function (num) { // regular function expression
  return num % 2 === 0;
};
const isEven = (num) => { // arrow function with parens around parameter
  return num % 2 === 0;
};
const isEven = num => { // no parens around parameter
  return num % 2 === 0;
};
const isEven = num => ( // implicit return
  num % 2 === 0;
);
const isEven = num => num % 2 === 0; // one-liner implicit return
```

 

```js
const rollDie = () => (
  Math.floor(Math.random() * 6) + 1;
);
```

Only one expression statement can be inside of the implicit's body to be return and you do not need to use the return keyword inorder to return the expression, it is done automatally with the one expression inside of the inplicit's body.

```js
const add = (a, b) => a + b;
```

You can also do it in one line, it is creating a variable add with an arrow function that has a and b as it's parameters and is returning a + b.

```js
const movies = [
  {
    title: 'Amadeus',
    score: 85
  },
  {
    title: 'Stand By Me',
    score: 85
  },
  {
    title: 'Parasite',
    score: 90
  },
  {
    title: 'Alien',
    score: 90
  }
];

const newMovies = movies.map(function (movie) {
  return `${movie.title} - ${movie.score / 10}`;
});

const newMovies = movies.map(movie => (
	`${movie.title} - ${movie.score / 10}`;
));
```



## setTimeout && setInterval

setTimeout and setInterval have to do with delaying some time, pausing execution of code for a later date. The first function is setTimeout and it requires you to pass two things in, a callback and a number of milliseconds to delay the execution of the function.

```js
setTimeout(() => {
  console.log('Delayed for 3s');
}, 3000); // 3000 millisecs is 3 whole seconds
```

After 3000 milliseconds it will execute the arrow function. You have to pass in a callback function otherwise it will execute right away.

```js
setTimeout(console.log('Not good'), 3000); // TypeError: console.log is not a function
```

setTimeout needs a callback function inorder to wait for it to be called or executed. 

```js
console.log('HELLO!!!');
setTimeout(() => {
  console.log('...are you still there?');
}, 3000);

console.log('GOODBYE!!!');
// Output
HELLO!!!
GOODBYE!!!
...are you still there?
```



The other function is setInterval. setInterval will call a function that we pass in, a callback, every x number of milliseconds. 

```js
setInterval(() => {
  console.log(Math.random());
}, 2000);
// Output
random numbers every 2 seconds
```

Every 2 seconds Math.random() will be console.log(). It will continue to call that function until we use clearInterval();. Every time setInterval is called it is given an id corresponding to whenever Interval is setup. We can save that id to a variable and use it to clearInterval()

```js
const id = setInterval(() => {
  console.log(Math.random());
}, 2000);

clearInterval(id); // This time the id was 1. Also, console.log() inside of setInterval() won't run cause clearInterval() is being executed right away.
```



## Filter

Creates a new array with all elements that pass the test implemented by the provided function. 

```js
const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const odds = numsfilter(n => {
  return n % 2 === 1; // Our callback returns true or false
  //if it returns true, n is added to the filtered array
});
// Output
// [9, 7, 5, 3, 1]

const smallNums = nums.filter(n => n < 5);
// [4, 3, 2, 1]
```



```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.filter(n => {
  return n === 4;
});
// Output
[4]
```

All this is doing is, runs all the elements within numbers array through the function and returns false until n === 4 is true. Once n === 4 is true, the whole n element that is within the array is added to the new filtered array. numbers array will be completely unchanged.



We got a movies array and lets say we just want all the good movies.

```js
const movies = [
  {
    title: 'Amadeus',
    score: 99,
    year: 1984
  },
  {
    title: 'Sharknado',
    score: 35,
    year: 2013
  },
  {
    title: '13 Going on 30',
    score: 70,
    year: 2004
  },
  {
    title: 'Stand By Me',
    score: 85,
    year: 1986
  },
  {
    title: 'Waterworld',
    score: 62,
    year: 1995
  },
  {
    title: 'Jingle All The Way',
    score: 71,
    year: 1996
  },
  {
    title: 'Parasite',
    score: 95,
    year: 2019
  },
  {
    title: 'Notting Hill',
    score: 77,
    year: 1999
  },
  {
    title: 'Alien',
    score: 90,
    year: 1979
  }
];

const goodMovies = movies.filter(movie => {
  return movie.score > 80;
});
const badMovies = movies.filter(m => m.score < 70);
const recentMovies = movies.filter(m => m.year > 2000);
// Lets say we want to grab only the good movie titles, we can use filter and map to do this
const goodTitles = goodMovies.map(m => m.title);
// You also can do a one-liner
movies.filter(m => m.score > 80).map(m => m.title);
```

You see here that filter grabs the whole object we are interacting through if the condition is true and puts it into a new array. Map then grabs that filtered array and puts all the m.title properties in the array object. If we used filtered instead of map, it would just grab the elements within the first filtered array.



## Some && Every Methods

# Every

Tests whether all elements in the array pass the provided function. It returns a Boolean value.

```js
const words = ['dogs', 'dig', 'log', 'bag', 'wag'];

words.every(word => {
  return word.length === 3;
}); // true

words.every(word => word[0] === 'd'); // false

words.every(w => {
  let last_letter = w[w.length - 1];
  return last_letter === 'g';
}); // true
```



```js
const exams = [80, 98, 92, 78, 75, 90, 89, 81, 77];
exams.every(score => score >= 75); // true
exams.every(score => score >= 80); // false
```

Every will grab each element from the exams array pass them into the score variable and checks if the number stored in score is greater than or equal to 75. If all the elements within that array callback pass that condition, it returns true, but if there is one that doesn't pass, it returns false.

# Some

Similar to every, but returns true if ANY of the array elements pass the test function

```js
const words = ['dog', 'jello', 'log', 'cupcake', 'bag', 'wag'];

// Are there any words longer than 4 characters
words.some(word => {
  return word.length > 4;
}); // true

// Do any words start with 'Z'?
words.some(word => word[0] === 'Z'); // false

// Do any words contain 'cake'?
words.some(w => w.includes('cake')); // true
```



```js
const exams = [80, 98, 92, 78, 75, 90, 89, 81, 77];
exams.some(score => score	 >= 75); // true
```

Some checks if there is at least one score that is greater than 75 and if there is, it returns true, but if there isnt any it will return false.

```js
const movies = [
  {
    title: 'Amadeus',
    score: 99,
    year: 1984
  },
  {
    title: 'Sharknado',
    score: 35,
    year: 2013
  },
  {
    title: '13 Going on 30',
    score: 70,
    year: 2004
  },
  {
    title: 'Stand By Me',
    score: 85,
    year: 1986
  },
  {
    title: 'Waterworld',
    score: 62,
    year: 1995
  },
  {
    title: 'Jingle All The Way',
    score: 71,
    year: 1996
  },
  {
    title: 'Parasite',
    score: 95,
    year: 2019
  },
  {
    title: 'Notting Hill',
    score: 77,
    year: 1999
  },
  {
    title: 'Alien',
    score: 90,
    year: 1979
  }
];

movies.some(movie => movie.year > 2015); // true
```
## .some() Parameters / Examples

The .some() method take in 3 parameters, but a callback function is required. Within the callback function the 3 parameters are:

  - value: Required, the value of the current element being processed in the array.

  - index: Optional, the index of the current element being processed in the array.

  - array: Optional, the array .some() was called upon.

```js
const object = {
    array: [{x: 2, y: 4}, {x: 7, y: 6}, {x: 6, y: 8}, {x: 6, y: 7}],
};

console.log(object.array.some(function(value, index, array) {
    console.log('Current Element:', value);
    console.log('Index:', index);
    console.log('Array:', array);
    
    // console.log('This Keyword:', this);
}));
```

```shell
Current Element: { x: 2, y: 4 }
Index: 0
Array: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
Current Value: { x: 7, y: 6 }
Index: 1
Array: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
Current Value: { x: 6, y: 8 }
Index: 2
Array: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
Current Value: { x: 6, y: 7 }
Index: 3
Array: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
false
```

In this example we have an object literals/Initializer that contains a property value of an array. We are using .some() to iterate through the array.
the first parameter is required in the callback function is the 'value' which is the current element being processed in the array. Second parameter is optional is the index, the index of the element being processed or how many times the loop has ran if plus with 1, like the for loop.
The third parameter is optional is the array .some() is being called upon.

If the .some() callback function returns true, it immediately stops the process.
.some() returns true if, in the array, it finds an element that the provided callback function returns true, otherwise it returns false at the end of the procees. .some() doesn't modify the provided array.


## The Notrious Reduce Method

Executes a reducer function on each element of the array, resulting in a single value.

```js
[3, 5, 7, 9, 11].reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
});
//[Callback | accumulator | currentValue | return]
// first    | 3           | 5            | 8
// second   | 8           | 7            | 15
// third    | 15          | 9            | 24
// fourth   | 24          | 11           | 35
```

With the reduce, they're two required parameters, the first parameter is the thing we will be reducing down to. currentValue represents each individual element. This array will be used to get the sum of the whole array. In the first call, the accumulator starts at 3 and the currentValue starts at 5. Then, 3 + 5 will be return due to "return accumulator + currentValue". Now the accumulator uses the pervous returned value which is 8 so, accumuator for the second callback will be 8. Now the currentValue is moved to 7. This process repeats until the end of the array.

```js
const prices = [9.99, 1.50, 19.99, 49.99, 30.50];

const total = prices.reduce((total, price) => {
  return total + price;
});
total; // 111.97

const total2 = prices.reduce((total, prices) => total + price);
// How to check for the min price in the array
const minPrice = prices.reduce((min, price) => {
  if (price > min) {
    return price;
  }
  return min;
});
minPrice; // 1.5

```

For the min price we are grabbing the first element in the prices array and storing it into min. The second element in the array is stored into price. We check if price > min if so return that price and now in the second callback min will be that returned value and price is the next element from where it was. Just think of price as each element iterating from the array and min is being the value from the pervous returned.

```js
const movies = [
  {
    title: 'Amadeus',
    score: 99,
    year: 1984
  },
  {
    title: 'Sharknado',
    score: 35,
    year: 2013
  },
  {
    title: '13 Going on 30',
    score: 70,
    year: 2004
  },
  {
    title: 'Stand By Me',
    score: 85,
    year: 1986
  },
  {
    title: 'Waterworld',
    score: 62,
    year: 1995
  },
  {
    title: 'Jingle All The Way',
    score: 71,
    year: 1996
  },
  {
    title: 'Parasite',
    score: 95,
    year: 2019
  },
  {
    title: 'Notting Hill',
    score: 77,
    year: 1999
  },
  {
    title: 'Alien',
    score: 90,
    year: 1979
  }
];

const highestRated = movies.reduce((bestMovie, currMovie) => {
  if (currMovie.score > bestMovie.score) {
    return currMovie;
  }
  return bestMovie;
});

highestRated; // {title: "Amadeus", score: 99, year: 1984}
```

The accumulator can start with an initial value.

```js
const evens = [2, 4, 6, 8];
const evensTotal = evens.reduce((sum, num) => sum + num, 100);
evensTotal; // 120
```

Because we set 100 to the initial value, it will start out as 100 and the num variable will start on 2. You can see here how it works:

```js
const evensTotal = evens.reduce((sum, num) => {
  console.log(`accumulator: ${sum}, element: ${num}`);
  return sum + num;
});
```

## Arrow Functions & 'this'

```js
const person = {
  firstName: 'Viggo',
  lastName: 'Mortensen',
  fullName: function() {
    console.log(this); // the person {}
    return `${this.firstName} ${this.lastName}`;
  }
};
person.fullName(); // "Viggo Mortensen"
```

The keyword this in fullName() comes from the keyword to the left of it or whatever called it which is person, but if we use a arrow function instead of a traditional function.

```js
const person = {
  firstName: 'Viggo',
  lastName: 'Mortensen',
  fullName: () => {
    console.log(this); // window {}
    return `${this.firstName} ${this.lastName}`;
  }
};
person.fullName(); // 'undefined undefined'
```

You can see here that the arrow function with the keyword 'this' is grabbing the window object. It trys to do window.firstName (this.firstName), it gets 'undefined'. With traditional function the keyword this has nothing to do with how it is scoped, it is where the function is being called or how it is being executed. This is not how arrow functions work.

```js
const person = {
  firstName: 'Viggo',
  lastName: 'Mortensen',
  fullName: function() {
    return `${this.firstName} ${this.lastName}`;
  },
  shoutName: function() {
    setTimeout(function() {
      console.log(this); // window {}
      console.log(this.fullName()); // this.fullName is not a function
    }, 3000);
  }
};
```

If we call shoutName(), we are going to set a timeout for 3 seconds (3000 millisecs) and when thoses 3 seconds are over, we are going to call 'this.fullName()' and print out the result.

setTimeout is a method on the window so, when we call setTimeout, it is using the window object (window.setTimeout). 'this' keyword will end up being from the window because traditional functions work from where they are being executed. setTimeout is the one calling  or executing this function meaning the 'this' keyword will go to the object that is containing setTimeout (window {}).

```js
const person = {
  firstName: 'Viggo',
  lastName: 'Mortensen',
  fullName: function() {
    return `${this.firstName} ${this.lastName}`;
  },
  shoutName: function() {
    console.log(this); // person {}
    setTimeout(() => {
      console.log(this); // person {}
      console.log(this.fullName()); // 'Viggo Mortensen'
    }, 3000);
  }
};
```

If we use an arrow function instead, the keyword 'this' in arrow functions are from where they're created or being scoped too. Because shoutName() is calling the traditional function, the keyword 'this' will go off of shoutName() and grab the main container holding shoutName() which is the person {}.
