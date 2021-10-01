let bird = 'Mocking';
function birdWatch() {
    let bird = "JO MOM";
    console.log(bird);
}
console.log(bird);
birdWatch();
console.log(bird);

var hello = 'hey hi';

function newFunction() {
	var hello = 'hello';
  console.log(hello); // "hello"
}
console.log(hello); // "hey hi"
newFunction();

function bankRobbery() {
    const heroes = ['Spiderman', 'Batman'];
    let color = 'purple';
    function cryForHelp() {
        console.log(color);
        let money = 100;
      for (let hero of heroes) {
        console.log(`PLEASE HELP US, ${hero}`);
        console.log(money);
      }
    }
    cryForHelp();
    // console.log(money);
  }
  bankRobbery();

  function callTwice(func) {
    func();
    func();
  }
  
  function rollDie() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(roll);
  }
  
  callTwice(rollDie);

  // Factory Function
  function makeBetweenFunc(min, max) {
    return function(num) {
      return num >= min && num <= max;
    }
  }
  const isChild = makeBetweenFunc(1, 17);
  isChild(50); // false
  isChild(17); // true

  const math = {
    multiply(x, y) {
      return x * y;
    },
    divide(x, y) {
      return x / y;
    },
    square(x) {
      return x * x;
    }
  };

  const cat = {
    name: 'Blue Steele',
    color: 'grey',
    breed: 'scottish fold',
    meow() {
      console.log(`${this.name} says MEOW MEOW`);
    }
  };