Variables

Variables are like labels for values

We can create a variable and give it a name to:

- Refer back to it later, Use that value, Or change it later.

Syntax in computer programming means the rules that control the structure of the symbols, punctuation, and words of a programming language.

JS Basic Syntax for Variables:

`let someName = value;`

Scope in programming means where the variables are available to be used. Var declartions are globally scoped or function/locally scoped.

The scope is global when the var variable is declared outside of a function. This means that any variable that is declared with `var` outside a function block is available for use in the whole window.

var is function scoped when it is declared within a function, meaning it is available and can be accessed only within that function.

```javascript
    var greeter = "hey hi";
    var times = 4;

    if (times > 3) {
        var greeter = "say Hello instead"; 
    }
    
    console.log(greeter) // "say Hello instead"
```

In this example greeter is a global variable, but because var can resign the value of the variable greeter, it will resign instead of creating a new variable. this can make you mistakenly overwrite a variable without even knowing it.

let cannot be re-declared and it will output an error if you do so // error: Identifier 'greeting' has already been declared

let is block scoped

A block is a chink of code bounded by {}. Anything within curly braces is a block.

Variables declared in a block with let is only available within that block.

You can update or change the value of let, but it cannot be re-declared like var.

There are two types of keywords or qualifier, let and const.

const stands for contant value, a constant value is an integer number, either signed or unsigned, that is created by a programmer. A contant value cannot be altered by the program during the normal execution.

const Example:

`const luckyNum = 7;`

'luckyNum += 1 // TypeError: Assignment to contant variable.' 



Booleans is a true or false value.