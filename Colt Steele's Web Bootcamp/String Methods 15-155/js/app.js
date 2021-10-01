const container = document.querySelector('#container');
let msg = "this is lowercase but im using the method .toUpperCase()!!";
let userInput = "    HELO im a string with spaces all         ";

msg = msg.replace('lowercase', 'bitch I just got REPLACED!!!');
displayToContain(msg.toUpperCase());
displayToContain(`This msg is the length of: ${msg.length}`);
console.log(userInput);
console.log(userInput.trim());


function displayToContain(toDisplay) { // Just appens the element to the container parameter
    let p = document.createElement('p');
    p.append(toDisplay);
    container.append(p);
}
