## Intro to Object Oriented Programming

In OOP there are a ton of tops like factory functions, constructor functions, the new class, constructors in a class, the new keyword, super inheritance. It all comes done to one idea, organizing our code, designing and structuring our applications by breaking things up into distinct patterns of objects. It's like recipes for objects.



## Factory Functions



```js
function hex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

hex(255, 100, 25); // This will give a hexidecimal color
```

```js
function rgb(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}
```

We can now switch from hex to rgb, but if I wanted to make a nice little object where I can covert back and forth from rgb to hex without having to pass in numbers each time, I could use a factory function, which would make an object that automatically had a hex method and an rgb method and stored the rgb values in the object.

```js
function makeColor(r, g, b) {
  const color = {};
  color.r = r;
  color.g = g;
  color.b = b;
  color.rgb = function() {
    return `rgb(${r}, ${g}, ${b})`;
  }
  return color;
}
```

So instead of calling this.r or this.b to get access to the color properties (cause we are making a function and we aren't defining anything with the function, only color so, we don't have access to thoses r, g, b cause it's not created in the function) we could use the this keyword to create and r g b.

```js
function makeColor(r, g, b) {
  const color = {};
  color.r = r;
  color.g = g;
  color.b = b;
  color.rgb = function() {
    const {r, g, b} = this;
    return `rgb(${r}, ${g}, ${b})`;
  };
  color.hex = function() {
    const {r, g, b} = this;
  	return '#' + ((1 << 24) + (r << 16) + (g << 8) + 				b).toString(16).slice(1);
}
  return color;
}
```

The this keyword refers to the thing that called our function that hold the this keyword so, the color object would be the this keyword in this moment.

So, this isn't the most common method. Everytime we make a new color object, we start with an empty object and have three unique properties. The functions that we have created are recreated and a unique copy is added to each color object that we make, but there is no reason to have a unique copy of the function itself. 

```js
function rgb() {
  
}

function rgb2(){
  
}
```

It's like if we were writing a regular function called rgb(), we don't need to have two rgb() functions to pass in different values, we just make one function and create parameters, but that's what's not happening in our color factory function. 

```js
function makeColor(r, g, b) {
  const color = {};
  color.r = r;
  color.g = g;
  color.b = b;
  color.rgb = function() {
    const {r, g, b} = this;
    return `rgb(${r}, ${g}, ${b})`;
  };
  color.hex = function() {
    const {r, g, b} = this;
  	return '#' + ((1 << 24) + (r << 16) + (g << 8) + 				b).toString(16).slice(1);
}
  return color;
}



const black = makeColor(0, 0, 0);
const blue = makeColor(0, 0, 255);
black.hex === blue.hex // false
'hi'.slice === 'bye'.splice // true
```

Why is black.hex === blue.hex not a true boolean, but splice is? What's happening is that the splice method is not defined on every stringle string, instead they are defined on the prototype. Lets say arrays, every array gets built-In array methods from one prototype array object, this contains all of the methods we are used to like pop(), shift(), push(), splice(). They are references one function and it's contained in a prototype. 



## Constructor Function

So constructor functions are kind of a weird thing in JS, but it has something to do with the new operator. The new operator lets devs create an instance of an built object that has a constructor function. The new keyword does the following things:

- Creates a blank, plain JS object.
- Adds a property to the new object (`__proto__`) that links to the constructor function's prototype object.
- Binds the newly created object instance as the `this` context
- Returns this if the function doesn't return its own object.

We defining a constructor function they use a capital letter to indicate that it's a constructor function or a function that create things and not a regular function. 

```js
function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
  console.log(this); // window Object{}
}

const black = new Color(0, 0, 0);
```

Because this constructor function in not inside any other object, the this keyword will refer to the global scope, the nearest object, which is the window object. The thing is, with the new operator, when we call this it will refer to the newely blank object that is create when you use the new operator. It then uses the constructor function that we called with new and uses it as a blueprint to the newely created object, linking the the keyword to the new object. The new operator then returns that newely created object with the blueprints or values we stored in our constructor function. It's like how we did it with the factory function, but new is doing some of the thing behind the scenes.

```js
function Color(r, g, b) {
  const object = {}; // same as the new operator
  this.r = r;
  this.g = g;
  this.b = b;
  console.log(this); // window Object{}
  return object; // same as the new operator
}

const black = new Color(0, 0, 0); // Same thing 
```

Color() is just a regular function that is using the the this keyword (which changes at times) so, inside (`__proto__`) of the newely created object, there is a constructor property that is set to the Color() function which allows us to add methods not to the individual objects like a factory function, not to the instances, but to the prototype.

```js
function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
  this.rgb = function() {
    const {r, g, b} = this;
    return `rgb(${r}, ${g}, ${b})`;
  };
}

new Color(255, 0, 0); // rgb: f ()
```

Instead of color, it still has rgb() defined on the individual object, and not on the prototype (`__proto__`), but we have a work around.

```js
function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

Color.prototype.rgb = function() {
	const {r, g, b} = this;
  return `rgb(${r}, ${g}, ${b})`;
};
```

Anytime we call Color() with the new keyword, it makes a new object. It then sets the constructor to the Color() function and then it sets the value of the this keyword to that newly created object. It returns that object, to wherever it was created or called with the new operator. 

```js
function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

Color.prototype.rgb = function() {
	const {r, g, b} = this;
  return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function() {
  const {r, g, b} = this;
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const color1 = new Color(40, 50, 60);
const color2 = new Color(0, 0, 0);

color1.hex(); // #28323c
color2.hex(); // #000000
color1.hex === color2.hex; // true
```



```js
Color.prototype.rgba = function(a=1.0) { // a defaults to 1
  const {r, g, b} = this;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
```

