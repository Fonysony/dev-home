const sercet = 'WOW';
let guess = prompt("What is the password?");
while (guess !== sercet) {
    guess = prompt('What is the password');
}

let input = prompt("Hey, say something!");
while (true) {
    input = prompt(input);
    if (input.toLowerCase() === "stop copying me") break;
}