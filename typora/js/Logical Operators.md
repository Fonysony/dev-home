Logical Operators

&& (and), || (or), ! (not)

AND (&&)

Both sides must be true, for the entire code to be true

1 <= 4 && 'a' === 'a'; // true

9 > 10 %% 9 >= 9; // false

'abc'.length === 3 && 9+10 === 21; // false	



|| (or)

If one side is true, the entire code is true

let age = 76;

if (age < 6 || age >= 65) {

} else {

​	console.log('That will be $10 please');

}



! (not)

!expression returns true if expression is false

!null // true

!(0 === 0) // false

!(3 <= 4) // false