Arrays

- Collections of ordered values

*// To make an empty array*

let students = [];

*// An array of strings*

let colors = ['red', 'orange', 'yellow'];



*// An array of numbers*

let lottoNums = [19,22,56,12,51];



*// A mixed array*

let stuff = [true, 68, 'cat', null];



Arrays are indexed

Each element has a corresponding index (counting starts at 0)

You can grab any element within an array and grab its inner element. Example:

let colors = ['red', 'orange', 'yellow'];

colors[0][1]; // This will grab red cause its the first element and arrays start with 0, then we can grab red and look into red and find that 1 will grab 'e' cause we start with 0.

You can also can the element, but you only can change the whole value and not just part of it. Example:

colors[3] = 'blue';

colors['red', 'orange', 'blue']



Array Methods

- Push - add to the end
- Pop - remove from the end
- Shift - remove from the start
- Unshift - add to the start



Push requires one parameter which will send that parameter to the end of the array. Example:

colors.push('black');

colors['red', 'orange', 'yellow', 'black'];

Push activates right when the line of code is read, but only requires one parameter to be met.



Examples:

colors.pop();

colors['red', 'orange'];

Pop does not require any parameters and is activited right when the code runs. Unlike .toUpperCase() .pop() actually does the action and you dont need to save in a variable like .toUpperCase(). If you keep using .pop() till there is no more elements within the array, it will returned undefined. Pop is a distructive method

Let str = 'wow';

str.toUpperCase(); // 'WOW'

console.log(str); // 'wow';

You see that the value of str doesnt save unless you save it to a new variable like this

let newStr = str.toUpperCase();

console.log(newStr); // 'WOW'



Shift is just like pop, but it is removing from the start of the array and it returns the element that was removed. Shift is a distructive method. Example:

colors.shift(); // 'red'

colors['orange', 'yellow'];

You can see that shift can be used to store values that are removed from the array.

Let nextColor = colors.shift(); // 'red';

olors['orange', 'yellow'];

You can see that shift can be stored in another value and the value that is removed is removed even if you save the removed value in another value. If you keep using .shift() till there is no more elements within the array, it will returned undefined



Unshift is the same thing as push, but instead it is pushing the element to the start of the array. Example:

colors.unshift('black');

colors['black', 'red', 'orange', 'yellow'];



MORE METHODS

- concat - merge arrays
- includes - look for a value
- indexOf - just like string.indexOf
- join - creates a string from an array
- reverse - reverses an array
- slice - copies a portion on an array
- splice - removes/replaces elements
- sort - sorts an array

Concat is used to merge two or more arrays, this method is not a distructive one/it does not cahnge the existing arrays, but instead it returns a new array.

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]



Slice is a method that returns a portion of an array into a new array object selected from the one required parameter start, which grabs the index (starting from 0) of an array and starts to cut it from their to the end. Splice will not modify the original array, but instead return the spliced with a new array object. Example:

const animals = ['ant', 'bison', 'camel', 'duck'];

animals.splice(1);

// animals['bison', 'camel', 'duck'];

You could use the other parameter, end, to end at a sertain index. Example:

animals.splice(1,3);

// animals['bison', 'camel'];

The end index is not included into the new array object.



Splice is a distructive method that changes the contents of an array by removing, replacing existing elements or by adding new elements in a place. 

Splice has one required parameter, start. Start is the index at which to start changing the array. If the start value is greater than the length of the array, no element will be deleted and the method will behave as an adding function, adding as many elements as provided. Example:

const months = ['Jan', 'March', 'April', 'June'];
months.splice(5, 0, 'Feb');
console.log(months);
// expected output: months["Jan", "March", "April", "June", "Feb"]

or

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

If the start parameter is greater than the array delete can be any number and it will still be used as a adding function.

deleteCount is another parameter that is optional. The integer indicates the number of elements in the array to be removed from the start parameter. If deleteCount is 0 or negative, no elements are removed.

`item1, item2, ...` Optional

The elements to add to the array, beginning from `start`. If you do not specify any elements, `splice()` will only remove elements from the array.



Const With Arrays

Const can be used with arrays and you still can use methods the change the value within the array, but right when you try to reassign the value you get an error. Example:

Const nums = [1, 2, 3];

nums.push(4); // nums[1, 2, 3, 4];

nums = 1; // TypeError: Assignment to contsant variable.

nums = [1, 2, 3, 4]; // ypeError: Assignment to contsant variable.



Nested Arrays

Arrays can contain arrays within them. Example:

const gameBoard = [['X', 'O', 'X', ], ['O', null , 'X'], ['O', 'O', 'X']];

gameBoard[1]; // ['O', null, 'X'];

gameBoard[1][0]; // O