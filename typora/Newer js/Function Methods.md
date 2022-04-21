# Function Methods

# .bind() Method

.bind() creates a new function that, when called, it's `this` keyword binds to the provided value.

```js
const person = {

};
```




```js
const object = {
    array: [{x: 2, y: 4}, {x: 7, y: 6}, {x: 6, y: 8}, {x: 6, y: 7}],
};

const test = {
    water: 'ok',
};

console.log(object.array.some(positionsMatch.bind(null, test)));

function positionsMatch(element, index, array, extra, extra2) {
    this.x = 100;
    console.log('Element:', element);
    console.log('Index:', index);
    console.log('Array:', array);
    console.log('Extra:', extra);
    console.log('Extra2:', extra2);
    
    console.log('This Keyword:', this.x);
}
```