## Default Params

# This is THE OLD WAY



```js
function multiply(a, b) {
  b = typeof b !== 'undefined' ? b : 1;
  return a * b;
};

multiply(7); // 7
multiply(7, 3); // 21
```

Lets go back to the rollDie function as an example:

```js
function rollDie(numSides) {
  if (numSides === undefined) {
    numSides = 6;
  }
  return Math.floor(Math.random() * numSides) + 1;
}
rollDie(20); // 14
rollDie(); // 3
```

# The new way

```js
function multiply(a, b = 1) {
  return a * b;
};
multiply(); // NaN
multiply(4); // 4
multiply(4, 5); // 20
```



```js
function rollDie(numSides = 6) {
  return Math.floor(Math.random() * numSides) + 1;
}
rollDie(20); // 7
rollDie(); // 2
```

If you dont provide a argument the default value of numSides is 6. There can be problems with this though.

```js
function greet(msg = 'Hi', person) {
  console.log(`${msg}, ${person}`);
};
greet("Hello", "Will"); // "Hello, Will"
greet("Will"); // "Will, undefined"
```

JS doesn't know the first argument will be for the first persons name, js is going off of the order of the arguments being provided. The first thing we passed in was the string "Will", js will put that into the msg parameter. Then, because we dont provide any other argument, person becomes undefined. So, its better to have our default parameter has a second parameter or more. 



## Spread

Spread syntax allows an iterable such as an array to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

```js
const nums = [9, 3, 2, 8];
Math.max(nums); // NaN
// Use spread!
Math.max(...nums);
// Same as calling:
// Math.max(9, 3, 2, 8)
```

Here spread is being used to separate the array of elements into Math.max which uses separate arguments with each one being a number to get the max of all of them.

```js
const nums = [9, 3, 2, 8];
// This is the same as
Math.max(...nums); // 9
// Doing this:
Math.max(9, 3, 2, 8); // 9
```

```js
const nums = [7, 6, 5, 3];
console.log(nums); // [7, 6, 5, 3]
console.log(...nums); // 7 6 5 3
console.log(...'hello'); // "h e l l o"
console.log('h', 'e', 'l', 'l', 'o'); // "h e l l o"
```



## Spread with Array Literals

```js
const cats = ['Blue', 'Scout', 'Rocket'];
const dogs = ['Rusty', 'Wyatt'];

const allPets = [...cats, ...dogs]; // ['Blue', 'Scout', 'Rocket', 'Rusty', 'Wyatt']
console.log(cats); // ['Blue', 'Scout', 'Rocket']
console.log(dogs); // ['Rusty', 'Wyatt'];
```

The original arrays cats and dogs do not get affect from the spread, spread is just merely copying them and spreading them out. Order does matter and if we change the order of the spread:

```js
const cats = ['Blue', 'Scout', 'Rocket'];
const dogs = ['Rusty', 'Wyatt'];

const allPets = [...dogs, ...cats]; // ['Rusty', 'Wyatt', 'Blue', 'Scout', 'Rocket']
```



## Spread with Objects

```js
const feline = {legs: 4, family: 'Felidae'};
const canine = {family: 'Caninae', furry: true};

const dog = {...canine, isPet: true};
// {family: "Caninae", furry: true, isPet: true}
const lion = {...feline, genus: 'Panthera'};
// {legs: 4, family: "Felidae", genus: "Panthera"}
const catDog = {...feline, ...canine};
// {legs: 4, family: "Caninae", furry: true}
```

Copies properties from one object into another object literal. Order also matters here, if you spread an object with the same property name the last one being spread will overwrite the one with the same property name.

```js
const badFriend = {firstName: 'Aaron', strength: 20};
const goodFriend = {firstName: 'Justin', agility: 50};

const allFriends = {...badFriend, ...goodFriend};
// {firstName: 'Justin', strength: 20, agility: 50}
const allFriend = {...goodFriend, ...badFriend, agility: 100};
//{firstName: 'Aaron', agility: 100, strength: 20}
```

You see here that the first object being spreaded will be overwrited by any other spread after and will be stored where ever that same porperty name is. 

Spread can be used for huge data that would take forever to type out, you can istead just spread them.

```js
const dataFromForm = {
  email: 'blueman@gmail.com',
  password: 'tobias123!',
  username: 'tfunke'
};
const newUser = {...dataFrom, id: 2345, isAdmin: false};
```



# Rest Params



## The Argument Object



- Available inside every function. 
- It's an array-like object 
  - Has a length property
  - Does not have array methods like push/pop
- Contains all the arguments passed to the function
- Not avaiable inside of arrow functions!

The argument object can automatically collect all of the arguments we put inside of a traditional function, but the only problem is that arguments looks like an array, but its not.

```js
function sum() {
  return arguments.reduce((total, el) => total + el);
}; // arguments.reduce is not a function
```



## Rest Params

Collects all remaining arguments into an actual array

```js
function sumALl(...nums) {
  let total = 0;
  for (let n of nums) total += n;
  return total;
}

sumAll(1, 2); // 3
sumAll(1, 2, 3, 4, 5); // 15
```

Here you can see that the rest params is collecting all of the arguments we specify and puts it into the nums making it into an array. If we took out Rest (...) the first argument will be taken, but everything after the first argument won't be taken in.

```js
function sum(nums) {
  console.log(nums);
};

sum(2); // 2
sum(2, 3); // 2
sum(3, 2); // 3
```

```js
function sum(...nums) {
  console.log(nums);
};

sum(2); // [2]
sum(2, 3); // [2, 3]
sum(5, 6, 5, 3, 7); // [5, 6, 5, 3, 7]
```

Now lets use reduce to get the sum of all arguments

```js
function sum(...nums) {
  return nums.reduce((total, el) => total + el);
};

sum(9, 7, 7, 5, 6, 1); // 35
```

```js
function raceResults(gold, silver, ...everyoneElse) {
  console.log(`GOLD METAL GOES TO: ${gold}`);
  console.log(`SILVER MEDAL GOES TO: ${silver}`);
  console.log(`AND THANKS TO EVERYONE ELSE: ${everyoneElse}`);
};

```

We called out the first two arguments specify and collect the 'Rest' (...) into 'everyoneElse'. If we did this with the arguments object we couldn't do this, we would have to call out arguments[0] or arguments[1] in order to grab the right argument. Also, arguments don't work in arrow functions.

## Destructuring Arrays

A Short, clean syntax to 'unpack':

- Values from arrays

- Properties from objects into distinct variables.

  

  ## Array Destructuring

```js
const raceResults = ['Eliud Kipchoge', 'Feyisa Lelisa', 'Galen Rupp'];

const [gold, silver, bronze] = raceResults;
gold; // "Eliud Kipchoge"
silver; // "Feyisa Lelisa"
bronze; // "Galen Rupp"

const [fastest, ...everyoneElse] = raceResults;
fastest; // "Eliud Kipchoge"
everyoneElse; // ["Feyisa Leisa", "Galen Rupp"]
```



```js
const friends = ['Aaron', 'Justin', 'Matt', 'Jared', 'Coco', 'Rocky'];

const [first, second, third, ...everyoneElse] = friends;

first; // "Aaron"
second; // "Justin"
third; // "Matt"
everyoneElse; // ["Jared", "Coco", "Rocky"]
```

Destructuring from arrays aren't so common, but destructuring from objects are common

## Restructuring Objects

Object Destructuring

```js
const runner = {
  first: 'Eliud',
  last: 'Kipchoge',
  country: 'Kenya',
  title: 'Elder of the Order of the Golden Heart of Kenya'
};
const {frist, last, country} = runner;
first; // "Eliud"
last; // 'Kipchoge'
country; // 'Kenya'
```

Lets say we wanna single out a couple of properties pretty frequently we would have to call the dot operator.

```js
const friend = {
  email: 'rjholewa@gmail.com',
  password: 'password', // Dang Justin
  firstName: 'Justin',
  lastName: 'Holewa',
  born: 2001,
  died: 'soon?',
  bio: 'Horny Asian guy who like Korean girls and hot anime girls',
  city: 'Bloomington',
  state: 'Minnesota'
};

const firstName = friend.firstName; // "Justin"
const lastName = friend.lastName; // "Holewa";
const email = friend.email;// "rjholewa@gmail.com"
```

 We could go on and on grabbing each properties, but this is tedious. We instead can destructure them.

```js
const friend = {
  email: 'rjholewa@gmail.com',
  password: 'password', // Dang Justin
  firstName: 'Justin',
  lastName: 'Holewa',
  born: 2001,
  died: 'soon?',
  bio: 'Horny Asian guy who likes Korean girls and hot anime girls',
  city: 'Bloomington',
  state: 'Minnesota'
};

// const firstName = friend.firstName; // "Justin"
// const lastName = friend.lastName; // "Holewa";
// const email = friend.email;// "rjholewa@gmail.com"
const {email, firstName, lastName, city, bio} = friend;
email; // "rjholewa@gmail.com"
firstName; // "Justin"
lastName; // "Holewa";
```

You see here that we are singled out the properties by calling their name, if we provided the wrong property name in the destructure we would get undefined.

```js
const friend = {
  email: 'rjholewa@gmail.com',
  password: 'password', // Dang Justin
  firstName: 'Justin',
  lastName: 'Holewa',
  born: 2001,
  died: 'soon?',
  bio: 'Horny Asian guy who likes Korean girls and hot anime girls',
  city: 'Bloomington',
  state: 'Minnesota'
};

const {FirstName} = friend;
FirstName; // undefined
```

We can also rename the variable that we will be singling out from the object.

```js
const friend = {
  email: 'rjholewa@gmail.com',
  password: 'password', // Dang Justin
  firstName: 'Justin',
  lastName: 'Holewa',
  born: 2001,
  died: 'soon?',
  bio: 'Horny Asian guy who likes Korean girls and hot anime girls',
  city: 'Bloomington',
  state: 'Minnesota'
};

const {born: birthYear, died: deathYear} = friend;
birthYear; // 2001
deathYear; // "soon?"
```

We also can give it a default value if the object doesn't have the property we sepecify. 

```js
const friend = {
  email: 'rjholewa@gmail.com',
  password: 'password', // Dang Justin
  firstName: 'Justin',
  lastName: 'Holewa',
  born: 2001,
  died: 'soon?',
  bio: 'Horny Asian guy who likes Korean girls and hot anime girls',
  city: 'Bloomington',
  state: 'Minnesota'
};

const {city = 'Richfield', state, job = 'Target'} = friend;
city; // "Bloomington"
job; // "Target"
```

Because city already has a value it doesn't get change even if we give it a default value. Also, the job variable doesn't change the original object because it's only singling out the values from the object, we aren't adding things to it we are simply destructuring or singling out the property names or value into variables.

## Param Destructuring

```js
const fullName = ({first, last}) => {
  return `${first} ${last}`;
};
const runner = {
  first: "Eliud",
  last: "Kipchoge",
  country: "Kenya",
};

fullName(runner); // "Eliud Kipchoge"
```

When we are defining our function we can destructure the values being passed in, this is most frequently used by objects. 

```js
const user = {
  firstName: "Nafi",
  lastName: "Verbwa",
};

function fullName(user) {
  return `${user.firstName} ${user.lastName}`;
};

fullName(user); // "Nafi Verbwa"
```

```js
function fullName(user) {
  const {firstName, lastName} = user;
  return `${firstName} ${lastName}`;
};
fullName(user); // "Nafi Verbwa"
```

Destructuring our objects can be nicer if we are doing a lot with our variables that we destructured, but if plan on not using any other the other things within user we can destructure in the way in of our function.

```js
function fullName({firstName, lastName}) {
  return `${firstName} ${lastName}`;
};
fullName(user); // "Nafi Verbwa"
```

You can also give it a default value if you can not find one within the object or whatever you are calling.

```js
function fullName({firstName, lastName, city = 'Bloomington'}) {
  return `${city}`;
};
fullName(user); // "Bloomington"
```

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

movies.filter((movie) => movie.score >= 90);
// 0: {title: 'Amadeus', score: 99, year: 1984}
// 1: {title: 'Parasite', score: 95, year: 2019}
// 2: {title: 'Alien', score: 90, year: 1979}
```

If we are only grabbing movie.score we can destructure from the arrow function.

```js
movies.filter(({score}) => score >= 90);
// 0: {title: 'Amadeus', score: 99, year: 1984}
// 1: {title: 'Parasite', score: 95, year: 2019}
// 2: {title: 'Alien', score: 90, year: 1979}
```

```js
movies.map(movie => {
  return `${movie.title} (${movie.year}) is rated ${movie.score}`;
});
// 0: "Amadeus (1984) is rated 99"
// 1: "Sharknado (2013) is rated 35"
// 2: "13 Going on 30 (2004) is rated 70"
// 3: "Stand By Me (1986) is rated 85"
// 4: "Waterworld (1995) is rated 62"
// 5: "Jingle All The Way (1996) is rated 71"
// 6: "Parasite (2019) is rated 95"
// 7: "Notting Hill (1999) is rated 77"
// 8: "Alien (1979) is rated 90"

```

Instead of grabbing movie dot (movie.) we could destructure in our way in the function.

```js
movies.map(({title, score, year}) => {
  return `${title} (${year}) is rated ${score}`;
});
// 0: "Amadeus (1984) is rated 99"
// 1: "Sharknado (2013) is rated 35"
// 2: "13 Going on 30 (2004) is rated 70"
// 3: "Stand By Me (1986) is rated 85"
// 4: "Waterworld (1995) is rated 62"
// 5: "Jingle All The Way (1996) is rated 71"
// 6: "Parasite (2019) is rated 95"
// 7: "Notting Hill (1999) is rated 77"
// 8: "Alien (1979) is rated 90"

```

