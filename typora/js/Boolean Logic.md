Making Decisions With JavaScript

*// > greater than

*// < less than*

*// >= greater tab or equal to*

*// <= less than or equal to*

*// == eqality*

*// != not equal*

*// === strict equality*

*// !== strict non-equality*

10 > 1; // true

0.2 > 0.3; // false

-10 < 0; // true

50.5 < 5; // false

99 >= 4; // true

99 >= 99; // true 

'a' < 'b'; // true

'A' > 'a'; /// false

Equality: Triple vs. Double Equals

== (Double Equals)

- Checks for equality of value, but not equality of type.

- It coerces both values to the same type and then compares them.

- This can lead to some unexpected results.

  Examples: 

  1 == 1 // true

  1 == '1' // true, this can be a problem because they are not the same type. One is a number type and the other is a string type.

  null == undefined; // true

  0 == false // true

=== (Triple Equals)

- Checks for equality of value and type

  Examples:

  1 === 1; // true

  1 === '1' // false, this is cause they are not the same data type. Number vs string.

!= (Not Equal) 

Examples:

1 != '2' // true, this version doesnt care about type.

1 != '1'; // false

!== (Strict non-equality) 

Examples:

1 !== '1' // true, They are not the same cause of their data types

Always use triple equals and strict non-equality 

