# The Document Object Model 

## What is it?

- The DOM is a JavaScript representation of a webpage.
- It's your JS "window" into the contents of a webpage
- It's just a bunch of objects that you can interact with via JS.

Whenever we load a webpage part of the loading process is taking the incoming html and css and creating a ton of JS objects based apon those elements and styles. There is a tree structure that is built when the files are incoming and at the very top of this tree structure is a very important object called 'document'. 'document' holds everything in our webpage, html, the body, h1s, etc. We can see this in the console by doing document which gives us html tags, but its because chrome dev tools does this. If we used console.dir(document), we get to see the actual document from js.

## Document

The document object is our entry point into the world of the DOM. It contains representations of all the content on a page, plus tons of useful methods and properties. The document is the root of the tree in computer science terms.


## getElementById

### Selecting

- getElementById
- getElementsByTagName // Theses are grabbing multiple elements
- GetElementsByClassName // Theses are grabbing multiple elements

Whenever you call getElementBy...... whatever you need to pass a string and thid string needs to correspond to some ID, TagName, or ClassName on an element. If there is an element with one of ID, TagName, or ClassName it will return it, but if it can't be found then it returns null.

```js
document.getElementById('dick'); // null
document.getElementbyId('banner');
```

We can save our elements into variables to use them later.

```js
const banner = document.getElementById('banner');
```



## getElementsByTagName & ClassName

### GetElementsByTagName

Whenever you grab all elements you get a HTMLCollection which is different from an array, but looks like an array. You can use array syntax like square brackets ( [0] ) and indices (Every element as an index).

```js
const allImgs = document.getElementsByTagName('img');
allImgs[0]; // 0: img#banner
```

HTMLCollections don't have access to map and other array methods cause they aren't arrays. You get undefined if you try to use one of theses methods on HTMLCollections because those methods doesn't exist within HTMLCollections. HTMLCollections are interable collections so, you can use for of to loop through them. You also, can you .length () to find out the length of an HTMLCollection.

```js
const allImages = document.getElementsByTagName('img');

for(let img of allImages) {
  console.log(img.src);
};
```



### So What do HTMLCollections return?

Element are returned and an element in JavaScript is an object that we're getting back that have all these properties that represent a single HTML element. The actual name in JavaScript for the type of objects is 'Element' with a Capital E.



## getElementsByClassName

Rather selecting by ID or by tag name, we're selecting by a class.

```js
const squareImages = document.getElementsByClassName('sqaure');
```

If you do getElementsByClassName and nothing is found, you don't get null. Instead,

you get an empty collection.



## querySelector & querySelectorAll

### querySelector

- A newer, all-in-one method to select a single element.

- ```js
  // Finds first h1 element:
  document.querySelector('h1');
  // Finds first element with ID of red:
  document.querySelector('#red');
  // Finds first element with class of:
  document.querySelector('.big');
  ```



### querySelectorAll

Same idea, but returns **a collection** of matching elements.

```js
document.querySelectorAll('p a');
```



## InnerHTML, textContent, & innerText

### Properties & Methods

- classList
- getAttribute()
- setAttribute()
- appendChild()
- append()
- prepend()
- removeChild()
- remove()
- createElement
- innerText
- textContent
- innerHTML
- value
- parentElement
- children
- nextSibling
- perviousSibling
- style



## innerText

innerText property of the HTMLElement interface represents the "rendered" text content of a node and its descendants. innerText is aware of the rendered appearance of the text, while textContent is not.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>innerText & textContent</title>
  </head>
  <body>
    <p>
      The chicken was crossing the road.
         I cant beathe, waiting for report cards....
      <span style="display: none;">Mine Diamonds</span> I dont care......
    </p>
  </body>
</html>
```



```js
const p = document.querySelector('p');
p.innerText; // "The chicken was crossing the road. I cant beathe, waiting for report cards...."
p.textContent; // "      The chicken was crossing the road./n"
```



## textContent

Is grabbing from the markup of the source code or the files it self. If there is spacing in the file there will be spacing in the textContent. Also, if an element is hidden, innerText won't be able to see it, but textContent will be able to see the hidden element.



## innerHTML

Lets say we wanna write actually html code within our text, how can we do that?

```js
const h1 = document.querySelector('h1');
h1.innerText = '<i>askdfs</i>';
h1; // '<i>askdfs</i>'
```

The innerText is treating everything within it as text. If you want the entirety of the markup contained in an element which can detect html code we can use innerHTML. innerHTML will grab even the tags that around the text of the elements within the markup. There is security issues with innerHTML so, avoid as you can. The use of innerHTML creates a potential security risk for your **website**. Malicious users can use cross-site scripting (XSS) to add malicious client-side scripts that steal private user information stored in session cookies. You can read the MDN documentation on innerHTML.



## Attributes

We can change all html attributes within JavaScript.

```js
document.querySelector('#banner').id = 'whoops';
```

Now the id of this element is changed and any styles that were set to the id 'banner' will be removed because this element doesn't have an id of 'banner' anymore. 

## getAttribute

```js
const firstLink = document.querySelector('a');
firstLink.href; // "file:///wiki/List_of_chicken_breeds"
firstLink.getAttribute; // "/wiki/List_of_chicken_breeds"
```

Whenever you use getAttribute, getAttribute is getting directly from the HTML itself. It's looking at that attribute and just taking the text in between the quotes. 

Whenever you access a property directly on an element like Dot href (.href) that is going through the JavaScript object. firstLink.href has been appended or prepend it with file. You can think of it as the computed value.

```js
document.querySelectorAll('input[type="text"]');
```

This is just a css attribute selector.

```js
input.type = 'password';
input.type = 'color';
input.setAttribute('type', 'text');
```



## Style

On any element theres a property called style. It's a massive object that contains a lot of properties corresponds to all of the individual properties. font-size color, but the big difference between styles in JS and css is that, in JS dash, hyphen etc is not valid in the identifier, instead it is camel cased.

```html
<h1>
  Color ME PLZ!!
</h1>
```

```css
h1 {
  color: olive;
}
```

```js
const h1 = document.querySelector('h1');
h1.style.color; // ""
```

Why is style not showing that the h1 element has a color of olive? The style object is JS does not contain styles from the css stylesheets. It will contain any inline styles that are assigned to the element. 

```html
<h1 style="color: magenta">
  Color ME PLZ!!
</h1>
```



```js
const h1 = document.querySelector('h1');
h1.style.color; // "magenta"
```

The style object is going to be empty string unless we assigned them inline, which is not recommended to do. We can use the style object to change the values.

```js
const h1 = document.querySelector('h1');
h1.style.color = 'green'; // "green"
h1.style.fontSize = '3em'; // "3em"
h1.style.border = '2px solid pink'; // "2px solid pink"
```

When using the style object in JS we have to use strings cause we can't type css units in JS, its not valid JS code. This is one way of changing styles within the DOM, we are writing a bunch of inline styles when we use the style object.

```html
<h1 style="color: green; font-size: 3em; border: 2px solid pink;">
  Color ME PLZ!!
</h1>
```

This is not perferred, but if you have a lot of styles to change through JS, having to do them one at a time is tedious. Also, making a bunch of inline styles isn't ideal, inline styles are very specific.

## window.getComputedStyle()

There's another way of getting the actual computed style once everything's been applied or loaded. It's not simple to just look at a style sheet and copy the styles over from the JS perspective because there might be multiple style sheets and they all might have conflicting styles, the whole cascade of specifity to consider. JS has to wait until things are loaded and everthing has ben computed by the browser to then actaully style elements. 

There is a method on the window object the get all of the computed styles. 

```js
window.getComputedStyle(h1);
```

With window.getComputedStyle(), you have to pass in an element, you can select it and save it into a variable to do this. window.getComputedStyle() will give you a massive object that has the computed styles of the element we specified. It's technically is an object, but its called a text style declaration, there is an order to it.

## classList 

Is an object that we can interact with to control the classes on an element and also to retrieve them and manipulate them. There are methods built into the class list like add.

### classList.add()

```js
h2.classList.add('purple');
```

If you want to add a second class, you can just add it again. No need to worry about what was there before, its like pushing onto an array, but instead we are just adding the clas to the element. 

### classList.remove()

```js
h2.classList.remove('purple');
```

This will just remove the class that we specify.

### classList.contains()

This will return you a true or false Boolean value to determine if that element has that class or not.

```js
h2.classList.contains('border'); // false
h2.classList.add('border');
h2.classList.contains('border'); // true
```



### classList.toggle()

A lot of the time you may not know if a certain class is activated or not on an element. You could use the method classList.contains() to test to see if the classList contains that class, but what is really common to use is classList.toggle(). Lets say we toggle the border class on the h2, because it already has the class of border it will just remove it.

```js
h2.classList.toggle('border'); // false
h2.classList.toggle('border'); // true
```

You can just add and remove with the same syntax or method.



## Traversing Parent/Child/Sibling

### parentElement

If you want to grab the parent of the element we are specifying, you can use parentElement.

```js
const firstBold = document.querySelector('b');
firstBold.parentElement; // <p>...</p>
firstBold.parentElement.ParentElement; // <body>...</body>

```



### childElementCount

Tells how many child elements there are on the specified element. 

```js
const paragraph = firstBold.parentElement;
paragraph.childElementCount; // 8
```



### children

```js
paragraph.children;
// HTMLCollections(8) [b, b, a, a, a, a, a, a]
```

You can only have one parent, but you can have mutiple children within an element. If you look at children, it is not an array its a HTMLCollection. It does not have array methods, but it does have indices, it is iterable. The HTMLCollection is in order in which they were found in the Dom. 

```js
paragraph.children[0]; // <b>Silkie</b>
```



### nextSibling, nextElementSibling, perviousSibling, perviousElementSibling

### nextSibling & perviousSibling

They are going to give the corresponding node. Nodes can represent as text. Some browsers automatically makes white space, they make new lines into a text node. It is not a HTML element, it is a DOM node.

```js
const squareImg = document.querySelector('.square');
squareImg.nextSibling; // #text
```



### nextElementSibling, perviousElementSibling

Theses give the next and pervious element sibling or the next and pervious adjacent sibling.

```js
squareImg.nextElementSibling;
// <img class="square"></img>
```

```js
squareImg.perviousElementSibling;
// <p>...</p>
```



## append(), prepend() & appendChild()

### appendChild()

```js
Const h3 = document.createElement('h3');
h3.innerText = 'DICK';
```

We need to specify the element that we are going to append to, lets say the body. 

```js
document.body.appendChild(h3);
// <h3>DICK</h3>
```

This will append the element as the last child of the body or whatever you are appending to. Usually you add everything to the element before appending so, that once you append its done.



### append()

Allows us to insert more than one thing at a time so I can have two different nodes or 5 elements that where created. Also, can just pass in a string.

```js
const p = document.querySelector('p');
p.append('I am new text');
// <p>I was already here..... I am new text</p>
p.append(' I am even newer', ' I am super new');
// <p>I was already here..... I am new text I am even newer I am super new</p>
```

This will just append the element we specified to the end within the parapgraph. This is an easy way of adding text to an element.



### prepend()

Allows to insert something as the first child of some elements. 

```js
const newB = document.createElement('b');
newB.append('Hi');
// <b>Hi.....</b>
```



### insertAdjacentElement()

Needs to specify if the element will be inserted 'beforebegin': before the targetElement itself, 'afterbegin': inside the targetElement, before it's first child, 'beforeend': inside the targetElement, after it's last child, and 'afterend': after the targetElement itself. Then you specify the targetElement.

```js
const h1 = document.querySelector('h1');
const h2 = document.createElement('h2');
h2.append('Are adorable chickens');
h2.insertAdjacentElement('afterend', h2);

// <h1>Silkie Chickens</h1>
// <h2>Are adorable chickens</h2>

```



### removeChild() & remove()

### removeChild()

removeChild doesn't remove the specific element selected, it removes a child from the specified element.

```js
const firstLi = document.querySelector('li');
const ul = firstLi.parentElement;
ul.removeChild(firstLi);
firstLi.parentElement.removeChild(firstLi);
```



### remove()

remove() removes the element that is specified.

```js
const firstLi = document.querySelector('firstLi');
firstLi.remove();
```

