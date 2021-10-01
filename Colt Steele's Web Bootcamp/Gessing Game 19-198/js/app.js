let maxNum = parseInt(prompt('Welcome! Enter your max number:'));
while (!maxNum) {
    maxNum = parseInt(prompt('Enter a valid number:'));
}
const randomNum = Math.floor(Math.random() * maxNum) + 1;
let guess = prompt('First Guess:');
let guessAmount = 1;
console.log(randomNum);
while (parseInt(guess) !== randomNum) {
    if (guess === 'q') break;
    guessAmount++;
    console.log(guess);
    if (guess > randomNum) {
        guess = prompt('Too High. Guess again:');
    } else {
        guess = prompt('Too Low. Guess again:');
    }
    
}
if (guess === 'q') {
    console.log('QUIT!!!!!.....');
} else {
    console.log(`Amount of times you guessed: ${guessAmount}`);
}