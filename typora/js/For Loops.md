## Loops

- Loops allow us to repeat code
  - Print 'hello' 10 times
    - Sum all numbers in an array
- There are multiple types:
  - for loop
  - while loop
  - for...of loop
  - for...in loop

For Loop Syntax



```
`for (`

`[initialExpression];`

`[condition];`

`[incrementExpression]`

`);`
```



```js
for (let i = 0; i <= 10; i++) {
  console.log(i);
}
// OUTPUT
1
2
3
4
5
6
7
8
9
10
```

for (let i = 0), this creates a index that starts at 0 so once the code evualuated here (i <= 10) equals true then the code in the curly brackets{} are exucuted. Once the code is ecucuted i++ is incremented. The code will stop once (i <= 10) is equal to false. 

```js
// DO NOT RUN THIS CODE!
for (let i = 20; i >= 0; i++) {
  console.log(i);
} // BADDDD!!!
```

This is an Inifite loop and if it is runned your browser or wherever you are running this will lose memory and freeze.

## Looping Over Arrays

```js
const animals = ['lions', 'tigers', 'bears'];
for (let i = 0; i < animals.length; i++) {
  console.log(i, animals[i]);
}
//0 'lions'
//1 'tigers'
//2 'bears'
```

To loop over an array, start at index 0 and continue looping to until the last index (length-1 cause arrays start on index 0).

## Nested Loops

```js
let str = 'LOL';
for (let i = 0; i <= 4; i++) {
	console.log('Outer: ', i);
	for (let j = 0; j < str.length; j++) {
		console.log('  Inner: ', str[j]);
	}
}
```

```js
Outer: 0
  Inner: L
  Inner: O
  Inner: L
Outer: 1
  Inner: L
  Inner: O
  Inner: L
Outer: 2
  Inner: L
  Inner: O
  Inner: L
Outer: 3
  Inner: L
  Inner: O
  Inner: L
Outer: 4
  Inner: L
  Inner: O
  Inner: L
```

For one interation of i we get 'Outer: 0', but once the for i loop runs the for j loop then the j loop runs until the condition is false. Once the for j loop is done, it goes back to the i for loop and runs again until for i condition is false.

## While Loop

```js
let num = 0;
while (num < 10) {
  console.log(num);
  num++;
}
```

```js
0
1
2
3
4
```

While loops continue running as long as the test condition is true.

```js
const secret = 'WOW';
let guess = prompt("What is the password?");
while (guess !== secret) {
    guess = prompt("What is the password?");
}
```

This runs until the user types the secret correct with uppercase letters cause its c sensitive. While loops are great for games cause you dont know how long a game will go so, you check a condition until it hits false.

## The Break Keyword

```js
let input = prompt("Hey, say something!");
while (true) {
    input = prompt(input);
    if (input.toLowerCase() === "stop copying me") break;
}
```

The break keyword can help us break out of a loop when needed. This will stop running right when the break keyword is executed.

```js
for (let i = 0; i < 10; i++) {
	console.log(i);
	if (i === 5) break;
}
```

```js
0
1
2
3
4
5
```



## For of Loop

We can use for of to loop through array. Example:

```js
const seatingChart = [
  ['Jared', 'Aaron', 'David'],
  ['William', 'Matt', 'Justin']
];

for (let i = 0; i < seatingChart.length; i++) {
  const row = seatingChart[i];
  for(let j = 0; i < row.length; j++) {
    console.log(row[j]);
  }
}
```

```js
Jared 
Aaron
David
William
Matt
Justin
```

This code will run through the seating chart and grab each array. Once the first array is grabbed row is grabbing the student from seatingChart[i] then for j is console logging the student on row[j]. console.log(row[j]). Instead we can use a for of loop to loop through each array.

```js
for (let row of seatingChart) {
  for (let student of row) {
    console.log(student);
  }
}
```

You already can tell that for of loop code is so much cleaner than a for loop code. This is creating a new variable (let row) from the seatingChart which will grab each array with seatingChart. Then, a new (let student) variable is created to grab from the row that was interated from row of seatingChart which will grab the elements within the array that was interated.

You can interate throught strings too:

```js
for (let char of 'Hello world') {
  console.log(char);
}
```

```js
H
e
l
l
o

w
o
r
l
d
```

## For in Loop

For in loop is used to iterate over an object literal. The for in loop will iterate through the object literal's keys. Example:

```js
const testScores = {
    aaron: 90,
    david: 87,
    jared: 77,
    matt: 92,
    justin: 86,
    william: 60
}
  
for (let person in testScores) {
    console.log(`${person} scored ${testScores[person]}`);
}
```

```js
aaron scored 90
david scored 87
jared scored 77
matt scored 92
justin scored 86
william scored 60
```

The person variable is already in testScores cause its grabbing the keys within testScores so it doesnt need the '' quotes to call the key (testScores['person']).

There is a method called "Object.keys", "Object.values" and "Object.entries". This will give us arrays of the keys and values from an object literal. Entries give a nested array of key values pairs.

```js
Object.keys(testScores);
// Output
['aaron', 'david', 'jared', 'matt', 'justin', 'william']

Object.values(testScores);
// Output
[90, 87, 77, 92, 86, 60]

Object.entries(testScores);
// Output
0: ['aaron', 90]
1: ['david', 87]
2: ['jared', 77]
3: ['matt', 92]
4: ['justin', 86]
5: ['william', 60]
 length: 6
```

All of them give you an array of the object literals. Lets take the average score of this testScores.

```js
let total = 0;
let scores = Object.values(testScores);
for (let score of scores) {
  total += score;
}
console.log(total / scores.length);
```

```js
// Output
82
```

We are creates variables to hold to total value of all the scores in testScores and the testScores array full of values in them. We then iterate through the scores array of value with the new variable score. We take total and add it with each iteration of score value. At the end, we console.log the total value of all the scores and divide it with the length of the scores array.