# Function Methods

# .bind() Method

.bind() creates a new function that, when called, it's `this` keyword binds to the provided value.

## .bind() Parameters

`thisArg` Required
    The value to be passed as the `this` parameter in the target function or the function that called the .bind() method. This happens when the bound function is called.

    If no arguments are provided to .bind(), or if the `thisArg` is null or undefined, the this of the executing scope is treated as the `thisArg` for the new function.
`arg1, arg2, ...argN` Optional
    Arguments to be prepend, add to the beginning of something, to the bound function when it's called.

## .bind() Examples

```js
const person = {
    firstName: 'Joji', 
    lastName: 'Frank',
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};

person.fullName(); // 'Joji Frank'
```
When the function is used as a callback the `this` keyword is lost.

```js
const person = {
    firstName: 'Joji', 
    lastName: 'Frank',
    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};

setTimeout(person.fullName, 3000); // Timeout {}
```

To fix this, the .bind() method can bind the the `person` object to the new function.

```js
const person = {
    firstName: 'Joji', 
    lastName: 'Frank',
    fullName() {
        const str = `${this.firstName} ${this.lastName}`;
        console.log(str);
        return str;
    }
};

const entireName = person.fullName.bind(person);
setTimeout(entireName, 3000);
```

## .some() and .bind() COMBO!!

```js
const object = {
    array: [{x: 2, y: 4}, {x: 7, y: 6}, {x: 6, y: 8}, {x: 6, y: 7}],
    x: 1,
};

const test = {
    water: 'ok',
    x: 2,
};

console.log(object.array.some(positionsMatch.bind(test)));

function positionsMatch(element, index, array, extra) {
    console.log('Element:', element);
    console.log('Index:', index);
    console.log('Array:', array);
    console.log('Extra:', extra);
    console.log('This:', this);
    console.log('This Keyword:', this.x);
}
```

```shell
macbook % node test.js
Element: { x: 2, y: 4 }
Index: 0
Array: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
Extra: undefined
This Keyword: 200
Element: { x: 7, y: 6 }
Index: 1
Array: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
Extra: undefined
This Keyword: 200
Element: { x: 6, y: 8 }
Index: 2
Array: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
Extra: undefined
This Keyword: 200
Element: { x: 6, y: 7 }
Index: 3
Array: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
Extra: undefined
This Keyword: 200
false
```

This example, .some() method processes each element in the array, which requires a callback function, and provides 3 parameters to the callback function. The 3 parameters are value, index, and array. .bind() `thisArg`, first parameter, provides the `test` object to the `this` keyword.


```js
const object = {
    array: [{x: 2, y: 4}, {x: 7, y: 6}, {x: 6, y: 8}, {x: 6, y: 7}],
    x: 1,
};

const test = {
    water: 'ok',
    x: 2,
};

console.log(object.array.some(positionsMatch.bind(null, test)));

function positionsMatch(element, index, array, extra) {
    console.log('Element:', element);
    console.log('Index:', index);
    console.log('Array:', array);
    console.log('Extra:', extra);
    console.log('This:', this);
    console.log('This Keyword:', this.x);
}
```

```shell
Element: { water: 'ok', x: 200 }
Index: { x: 2, y: 4 }
Array: 0
Extra: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
This Keyword: undefined
Element: { water: 'ok', x: 200 }
Index: { x: 7, y: 6 }
Array: 1
Extra: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
This Keyword: undefined
Element: { water: 'ok', x: 200 }
Index: { x: 6, y: 8 }
Array: 2
Extra: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
This Keyword: undefined
Element: { water: 'ok', x: 200 }
Index: { x: 6, y: 7 }
Array: 3
Extra: [ { x: 2, y: 4 }, { x: 7, y: 6 }, { x: 6, y: 8 }, { x: 6, y: 7 } ]
This Keyword: undefined
false
```

You can see here that `thisArg` is null which means it won't pass anything to the `this` keyword in the bound function instead, the `this` keyword will be from to the bound function.

the `test` object is getting prepended into the bound function as an argument which means that `test` will be the first parameter in the bound function.
In this example the first parameter in the bound function is `element` which will be the `test` object, because of this, the .some()'s parameters will basically be all pushed down one making `index` be the value parameter, `array` be the index parameter, and `extra` be the array parameter.


## this keyword

In JavaScript, the this keyword refers to an object.

Which object depends on how this is being invoked (used or called).

The this keyword refers to different objects depending on how it is used:

In an object method, this refers to the object.
Alone, this refers to the global object.
In a function, this refers to the global object.
In a function, in strict mode, this is undefined.
In an event, this refers to the element that received the event.
Methods like call(), apply(), and bind() can refer this to any object.


