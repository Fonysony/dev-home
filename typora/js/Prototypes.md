## What On Earth Are Prototypes

Object prototypes are the mechanism by which JS objects inherit features from one another. Objects can have a prototype object, which acts like a template object that inherited methods and properties. Arrays have a thing called __proto__ and it's a property that references the array prototype. A prototype is a template object so for this case, arrays. It will contain a bunch of methods of arrays. Rather than defining them all individually apart they share a property called proto which references to the array blueprint object.

```js
Array.prototype // this will show you the array proto object 
String.prototype // strings have them too, console.log() to see it
console.log(Array.prototype);
```

You can actually had new methods to the prototype so that all other protos will have it or share it too. 

```js
String.prototype.grumpus = () => alert('GO AWAY!!');
const cat = 'blue';
cat.grimpus(); // GO AWAY!!
```

```js
String.prototype.yell = function() {
  return `OMG!!! ${this.toUpperCase()}!!!!`;
}

'HELLO'.yell(); // OMG!!! HELLO!!!!
```

The this keyword references to what string we called yell with which is 'hello' or can be a variable that contains a string. We used a function instead of an arrow function because the this keyword in arrow function references the object window. The this keyword in normal function will refer to the thing that called it.

```js
String.prototype VS __proto__ property on a string
```

The String.prototype is the acutal prototype object or the blueprint, but __proto is only a references of String.prototype. 

