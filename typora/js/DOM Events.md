## the onclick Property

onclick is a property of the GlobalEvenHandler. The click event is triggers when the user clicks on an element. It fires after the mouse down and mouseup events are done, in that order.

```js
target.onclick = functionRef;

const button = document.querySelector('button');
button.onclick = function() {
  console.log('The button was pressed');
};
```



## onmouseenter

onmouseenter is a property of the GlobalEventHandler. It fires when a pointing device (usually a mouse) is moved over the element that has the listener attached.

```js
const btn = document.querySelector('button');

function scream() {
  console.log('AHHHHHH');
  console.log("Stop Touching me!");
}
btn.onmouseenter = scream; 
```

Once you move your pointing device over the button, the scream() function will be called.

```js
document.querySelector('h1').onclick = alert('You clicked me');
```

This wont work out because you have to wrap the code you will be executing within a function, the code will execute right away. It needs to reference a function so it can call it back later on once a pointing device clicks on the h1.

```js
document.querySelector('h1').onclick = () => {
  alert('You clicked me');
};
```



## addEventListener()

Specify the event type and callback to run.

```js
const button = document.querySelector('h1');
button.addEventListener('click', () => {
  alert('You clicked me!!');
});
```

With addEventListener(), we can specify the type of event we want to listen for, wether it's for a click, double click, mouse enter, etc.. The first required parameter is the type, which is case-sensitive and its a string that represents the event type to listen for. The second required parameter is the listener, the object that receives a notification when an event of the specified type occurs. This must be an object implementing the EventListener interface or a JavaScript function.

```js
const button = document.querySelector('button');
button.addEventListener('click', function() {
  alert('CLICKED');
}); // When button is clicked: 'CLICKED'
```

You can go onto MDN Event Reference to see all types events that you can listener for. 

```js
const tasButton = document.querySelector('button');

tasButton.onclick = twist();
tasButton.onclick = shout();

function twist() {
  console.log('Twist');
};
function shout() {
  console.log('SHOUT!');
};
// When button is clicked: 'SHOUT!'
```

Why are we only getting shout()? We can't have more than one event listener, it's just a property. Lets say we have an object with a property of color and we start out as purple, right when I change it to red, purple is lost.

```js
object = {
  color: 'purple';
};

object.color = 'red';
object.color; // 'red'
```

This is just showing that you can't have two different callback functions for this property event, onclick. 

```js
tasButton.addEventListener('click', twist);
tasButton.addEventListener('click', shout);
// When button is clicked: Twist
//                         SHOUT!
tasButton.addEventListener('click', twist, {once: true});
```

There are other parameters for addEventListener() that aren't required such as, once. If we sent once equal to true, it will only run the callback once. Then, it will remove the event listener entirely.



## Events & The Keyword This

```js
const buttons = document.querySelectorAll('button');

for (let button of buttons) {
  button.addEventListener('click', function() {
    button.style.backgroundColor = 'green';
  });
};

const h1s = document.querySelectorAll('h1');
for (let h1 of h1s) {
  h1.addEventListener('click', function() {
    h1.style.backgroundColor = 'green';
  });
};
```

You see here my code is becoming DRY (Don't Repeat Yourself), I'm doing the same thing. The only difference is that I'm doing it to a button versus to a h1.

```js
const buttons = document.querySelectorAll('button');

for (let button of buttons) {
  button.addEventListener('click', colorize);
};

const h1s = document.querySelectorAll('h1');
for (let h1 of h1s) {
  h1.addEventListener('click', colorize);
};

function colorize() {
  this.style.backgroundColor = 'green';
  this.style.color = 'yellow';
}
```

Inside an event handler callback, the keyword 'this' is going to refer to whatever the event click called on which is the element that has the addEventListener() attached to it. Remember that this keyword 'this' is dependent upon the execution context or the invocation context. The keywords won't always refer to the element.



## Keyboard Events & Event Objects

```js
document.querySelector('button').addEventListener('click', function(event) {
  console.log(event); // MouseEvent {}
});
```

There is an event object that is automatically passed in to our callback, we aren't using it cause there isn't a parameter to store it into. You can put a parameter in there and often people call it 'e' or 'evt' for event. When we console.log() it an object event shows up called 'MouseEvent{}' and it contains informatino about the object. It has things like 'ClientX' and 'ClientY' which is relative to the window where you clicked on. We can use this MouseEvent{} when using with keyboard events, because frequently we want to know what key was pressed and taht information is in the KeyboardEvent{}.

```js
const input = document.querySelector('input');
input.addEventListener('keydown', function(e) {
	console.log(e); // KeyboardEvent{}
});
```

There are two important things inside this KeyboardEvent{}, one property called 'code' and another one called 'key'. 

```js
const input = document.querySelector('input');
input.addEventListener('keydown', function(e) {
	console.log(e.key); // ' '
  console.log(e.code); // Space
});
```

```js
const input = document.querySelector('input');
input.addEventListener('keydown', function(e) {
	console.log(e.key); // a
  console.log(e.code); // KeyA
});
```

If you want to listen for a key anywhere on a page, lets say for a game we can window.

```js
window.addEventListener('keydown', function(evt) {
  console.log(evt.code);
});
```

Where are looking at event code cause if we are making a game we want to look at the key code on the keyboard people are using. It's the location where they press, somebody else might have the same keyboard with a different language setting.

```js
window.addEventListener('keydown', function(evt) {
  switch (evt.code) {
    case 'ArrowUp':
      console.log('UP!');
      break;
    case 'ArrowDown':
      console.log('DOWN!');
      break;
    case 'ArrowLeft':
      console.log('LEFT!');
      break;
    case 'ArrowRight':
      console.log('RIGHT!');
      break;
    default:
      console.log('IGNORED!');
  }
});
```



## Form Events & PreventDefault

How forms work, we specify an action, which is a URL a loction that the data should be sent to.

```html
<form action="/dogs" id='tweetForm'>
  <input type="text" name="username" placeholder="username">
  <input type="text" name="tweet" placeholder="tweet">
  <button>
    Post Tweet
  </button>
</form>
```

We can use JS to stop the data from sending and do something with that data. So, the default behaviors for that form to submit and for the page to reload and take you somewhere else, stop that. The event that we need to listen to is a form submission. 

```js
const tweetForm = document.querySelector('#tweetForm');
tweetForm.addEventListener('submit', function() {
  console.log("SUBMITED");
});
```

Here we are trying to console.log right as the submit event fires, but once the submit event fires by default it directs us to another page. We could try to remove action from the form, but then the action just defaults to the current page, which will refresh the page. Instead we can grab the event object from tweetForm and use a method called 'preventDefault()'.

```js
const tweetForm = document.querySelector('#tweetForm');
tweetForm.addEventListener('submit', function(e) {
  e.preventDefault();
});
```

This will prevent the default behavior of the form being submited and directing us to another page.

When we have a lot of information in our form, it can be kind of annoying to have to select every input individually. On every form object, there is a property called 'elements' which is a HTMLCollection of the form elements in there. It is an order collection so, you can single out elemtents within the form, but if you change the order of the form then you might run into issues with getting the right element. So, instead you can give each element a name and that name is set up as a property name in elements. 

```js
console.log(tweetForm.elements.username);
const usernameInput = tweetForm.elements.username.value;
```



## Input & Change Events

## Input

The input event, fires whenever the input changes. Click and unclicking doesn't fire, just when you impact the value of input.

## Change

The change input, only fires when you blur the input, which basically means leaving it.

```js
const input = document.querySelector('input');
input.addEventListener('change', function() {
  console.log('IT HAS CHANGED!');
});
```



## Event Bubbling

```html
<div id="container">
  Hide me
  <button>
    Change Color
  </button>
</div>
```

```css
.hide {
  display: none;
}
```

```js
const button = document.querySelector('button');
const container = document.querySelector('#container');

button.addEventListener('click', function() {
  container.style.backgroundColor = makeRandColor();
});

container.addEventListener('click', function() {
  container.classList.toggle('hide');
});

function makeRandColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
```

You see here that we have a button on our container and that container holds a button that will change the backgroundColor of the container. The problem is that we cant click on the button without having to click on the container which is making the whole thing hide because we sent a listener on the container to be triggered once you click on  it and then hide right after the click event. We can avoid this by adding a method called 'stopPropagation()' on the event object. This will prevent the event from bubbling up or stop the execution.

```js
const button = document.querySelector('button');
const container = document.querySelector('#container');

button.addEventListener('click', function(e) {
  container.style.backgroundColor = makeRandColor();
  e.stopPropagation();
});

container.addEventListener('click', function() {
  container.classList.toggle('hide');
});

function makeRandColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
```



## Event Delegation

```html
<h1>Post Tweet</h1>
        <form action="/dogs" id='tweetForm'>
            <input type="text" name="username" placeholder="username">
            <input type="text" name="tweet" placeholder="tweet">
            <button>
                Post Tweet
            </button>
        </form>
        
        <h2>Tweets:</h2>
        <ul id="tweets">
            <li>I AM A LI!!</li>
        </ul>
```

```js
const lis = document.querySelectorAll('li');
for (let li of lis) {
    li.addEventListener('click', function() {
        li.remove();
    });
};

const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');

tweetForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const usernameInput = tweetForm.elements.username;
  const tweetInput = tweetForm.elements.tweet;
  addTweet(usernameInput.value, tweetInput.value);
  usernameInput.value = '';
  tweetInput.value = '';
});

function addTweet(username, tweet) {
  const newTweet = document.createElement('li');
  const bTag = document.createElement('b');
  bTag.append(username);
  newTweet.append(bTag);
  newTweet.append(` - ${tweet}`);
  tweetsContainer.append(newTweet);
};
```

Why isn't the newly created lis being deleted once you click on the new li? The lis that is hard coded in our html file were on the page when the code ran and when we added those event listeners on them, but the new lis don't have event listeners cause they weren't there at the start to be added on them. We can use event delegation, which adds event listeners to some elements that are a parent. 

```js

const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');

tweetForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const usernameInput = tweetForm.elements.username;
  const tweetInput = tweetForm.elements.tweet;
  addTweet(usernameInput.value, tweetInput.value);
  usernameInput.value = '';
  tweetInput.value = '';
});

function addTweet(username, tweet) {
  const newTweet = document.createElement('li');
  const bTag = document.createElement('b');
  bTag.append(username);
  newTweet.append(bTag);
  newTweet.append(` - ${tweet}`);
  tweetsContainer.append(newTweet);
};

tweetsContainer.addEventListener('click', function(e) {
  console.log("Click on ul");
  console.log(e);
});
```

One cool thing about the event object is that even though we are clicking on the ul container, the event object can know which target we clicked on. In the PointerEvent{} when you click on the lis within the ul, it saves the li that we clicked on to a property called 'target'. If you just click on the ul itself, it will save the ul to target. 

```js

const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');

tweetForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const usernameInput = tweetForm.elements.username;
  const tweetInput = tweetForm.elements.tweet;
  addTweet(usernameInput.value, tweetInput.value);
  usernameInput.value = '';
  tweetInput.value = '';
});

function addTweet(username, tweet) {
  const newTweet = document.createElement('li');
  const bTag = document.createElement('b');
  bTag.append(username);
  newTweet.append(bTag);
  newTweet.append(` - ${tweet}`);
  tweetsContainer.append(newTweet);
};

tweetsContainer.addEventListener('click', function(e) {
 e.target.nodeName === 'LI' && e.target.remove();
});
```

If node name is li, then do this because remember, in a boolean & (and), if the left side is false, then next code never runs.