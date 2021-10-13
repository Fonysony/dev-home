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



## JS Classes

Classes are another stntactic sugar of prototypes, the keyword of this, and the new keyword. We don't have to add methods to the prototype manually, we don't have to break up the constructor function and then separately add methods. 

```js
class Color {
  constructor() {
    
  }
}
```

When creating classes or constructor functions you capitalize the first letter to let you know that this object creates other objects. You the keyword class to let JS know that we are creating a class here. The next thing is the constructor, we always add this in when using classes, a constructor is a function that will execute immediately whenever a new color is created. 

```js
class Color {
  constructor(r, g, b) {
    console.log('INSIDE CONSTRUCTOR'):
    console.log(r, g, b);
  }
}

const black = new Color(0, 0, 0);

// Output
// INSIDE CONSTRUCTOR
// 0 0 0
```

the inside constructor and r g b ran immediately. I never said run the constructor, never called the constructor, it automatically runs as long it is named constructor. You need the class keyword and you need the constructor which will run immediately whenever we instantiate a new instance of a class. 

```js
class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }
}
```

You don't have to do the same exact name from the constructor parameters, you can give it it's own name, but this is the property we are adding to the object and typically we use the exact same name.

```js
class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.colorName = name; // doesn't have to be the same name
  }
}
```



```js
class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }
}

const reddy = new Color(255, 67, 89, 'tomato');
```

reddy is an object that has r, g, b, and name properties, I never made an empty object myself, the new keyword takes care of that. The (__proto__) with reddy has a constructor which is set to the Color class. We don't have to do Color.prototype like with constructor function to add our methods into the (__proto__).

```js
class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }
  greet() {
   return `Hello color ${this.name}!!`;	 
  }
}

const black = new Color(0, 0, 0, 'black');
const white = new Color(255, 255, 255, 'white');
black.greet(); // Hello color black!!
white.greet(); // Hello color white!!
```

 You see here that it's just like we did with Color.prototype in the constructor function section, we don't have to type prototype. We just put it inside the class so we can group everything together. greet() will be added to the Color class (__proto__) so that all created Color classes will have greet too. You don't need to use a function or arrow function to create a function with a class.

```js
class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
  }
  greet() {
   return `Hello color ${this.name}!!`;	 
  }
  rgb() {
    const {r, g, b} = this;
    return `rgb(${r}, ${g}, ${b})`;
  }
  rgba(a=1.0) {
    return `rgba(${this.rgb()}, ${a})`;
  }
  hex() {
  	const {r, g, b} = this;
  	return '#' + ((1 << 24) + (r << 16) + (g << 8) + 	b).toString(16).slice(1);
	}
}
```

You can call other methods within to other methods. You can actually call other methods within the constructor so that when you create a brand new class it will run.

```js
class Car {
  constructor(name, speed = 20, acc) { // default to 20 for speed
    this.name = name;
    this.speed = speed;
    this.acc = acc;
    this.speedTest(speed);
  }
  speedTest(spd) {
    const ran = Math.floor(Math.random() * spd) + 1;
    console.log(spd, ran);
    let model;
    if (spd > ran) {
      model = 2022;
    } else if (spd < ran) {
      model = 2010;
    }
    this.model = model;
  }
}
```

You can see here that I even called the speedTest() method and passed in an argument of whatever speed is equaled too. Then with the speedTest() I see if spd will be higher than a random number, if it is then make model into 2022, if it is lower than make model into 2010.  I then create a model porperty with the Car class and store model into it and it did all this right when I created a Car class. The color part is that you can make something run and use the values that the person provided in the class. 

## Extends & Super Keywords

## Extends

The extends keyword and super keyword both have to do with subclassing, essentially inheritance. This is a way of sharing functionality between classes. 

```js
class Cat {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating!`;
  }
  meow() {
    return 'MEOWW!!!';
  }
}

class Dog {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating!`;
  }
  bark() {
    return 'WOOFF!!';
  }
}
```

You see that we have a lot of duplicated functionality or DRY (Don't Repeat Yourself) code.

We could grab everything that is similar to the Cat & Dog classes and make a separate standalone class that both of these classes or Cat & Dog could extend. 

```js
class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating!`;
  }
}

class Cat {
  meow() {
    return 'MEOWW!!!';
  }
}

class Dog {
  bark() {
    return 'WOOFF!!';
  }
}
  
```

Right now cause Cat and Dog don't have constructors, when creating new Cat & Dog objects, the created objects will be empty. To extend the Pet class to Cat & Dog, it's just simply adding the extends keyword within the class name.

```js
class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating!`;
  }
}

class Cat extends Pet {
  meow() {
    return 'MEOWW!!!';
  }
}

class Dog extends Pet {
  bark() {
    return 'WOOFF!!';
  }
}

const wyatt = new Dog('Wyatt', 13);
// Dog {name: "Wyatt", age: 13}
```

Look at that, name and age is already filled out even though we didnt add a constructor within the Dog class, because we extended the Pet class to Dog, Dog gets all the things that Pet has even the constructor of Pet, but if we do add an constructor with Dog, it will use that over the Pet class constructor. All the methods that Pet has will be added to Cat & Dog like the eat() function. 

```js
class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating!`;
  }
}

class Cat extends Pet {
  meow() {
    return 'MEOWW!!!';
  }
}

class Dog extends Pet {
  bark() {
    return 'WOOFF!!';
  }
  eat() {
    return `${this.name} scarfs his food!`;
  }
}

const wyatt = new Dog('Wyatt', 13);
wyatt.eat(); // Wyatt scarfs his food!
```

If the Dog class doesn't find the function eat() within the Dog class or Dog prototype, it will look up on the pet prototype.

### Super

```js
class Cat extends Pet {
  constructor(name, age, livesLeft = 9) {
    this.name = name;
    this.age = age;
    this.livesLeft = livesLeft;
  }
  meow() {
    return 'MEOWW!!!';
  }
}
```

I could manually set this.name = name and this.age = age, but I'm already doing that within the Pet class, all I want to set is this.livesLeft = livesLeft. We instead can use the super keyword, super will references the class we are extending from. 

```js
class Cat extends Pet {
  constructor(name, age, livesLeft = 9) {
    super(name, age);
    this.livesLeft = livesLeft;
  }
  meow() {
    return 'MEOWW!!!';
  }
}
```

If I call super inside of the constructor of Cat and I pass in name & age, it's going to call the Pet class constructor.

```js
class Pet {
  constructor(name, age) {
    console.log('IN PET CONSTRUCTOR!');
    this.name = name;
    this.age = age;
  }
  eat() {
    return `${this.name} is eating!`;
  }
}

class Cat extends Pet {
  constructor(name, age, livesLeft = 9) {
    console.log('IN CAT CONSTRUCTOR!');
    super(name, age);
    this.livesLeft = livesLeft;
  }
  meow() {
    return 'MEOWW!!!';
  }
}

const gigger = new Cat('Gigger', 5);
// IN CAT CONSTRUCTOR
// IN PET CONSTRUCTOR
// gigger {name: 'Gigger', age: 5, livesLeft: 9}
```

We reused the functionality of the Pet class constructor, but we added on our own constructor for cat. Super is going to be a reference to the super class or the object that we are extending to.