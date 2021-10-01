const container = document.querySelector('#container');
let random = Math.random();

if (random < 0.5) {
    toDisplay('YOUR NUMBER IS LESS THAN 0.5!!!')
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const day = daysOfWeek[Math.floor(Math.random() * 7)];

if (day === 'Monday') {
    toDisplay('UDGGGGDG Monday sucksss');
} else if (day === 'Tuesday') {
    toDisplay('Well I got band practice today');
}

// 0-5 FREE
// 5 - 10 CHILD $10
// 10 - 65 ADULT $20
// 65+ SENIOR $10

const age = Math.floor(Math.random() * 65) + 1;
toDisplay(age);
if (age <= 5) {
    toDisplay('Well You are quite young, you enter in for free');
} else if (age < 10) {
    toDisplay('You are young, you get in for $10');
} else if (age < 65) {
    toDisplay('You are quite the old one, you get in for $20');
} else {
    toDisplay('65 wow, you are really old, you get in for $10');
}


function toDisplay(toAppend) {
    let p = document.createElement('p');
    p.append(toAppend);
    container.append(p);
}





// NESTED CONDITIONALS

const password = prompt('Please enter your password');
// Password must be +6 characters
if (password.length >= 6) {
    console.log(password.indexOf(' ')); // indexOf looks for the search and finds wherever it is and outputs the index number in the string starting with 0.
    if (password.indexOf(' ') === -1) {
        toDisplay('Valid Password');
    } else {
        toDisplay('Password cannot include spaces');
    }
} 
// Password cannot include spaces