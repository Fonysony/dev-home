// Create a loop that will exit when user types 'quit'
// const quitKey = 'quit';
let todoList = [];
let input = null;

while (input !== 'quit') {
switch (userInput('What would you like to do?', true)) {
    case 'new':
            todoList.push(userInput('What will be your todo name?'));
            console.log(`${input} was added....`);
        break;
    case 'list':
            console.log('***List***');
            listTodos();
            console.log('**********');
        break;
    case 'delete':
        console.log('***DELETE***');
        listTodos();
        console.log('************');
        removeTodo();
        break;
     case 'quit':
     console.log(`App is quitting`);
     break;
    default:
        console.log(`${input} IS NOT A VAILD COMMAND!`);
    }
}

function userInput (str, toLower) {
	if (toLower) {
		return input = prompt(str).toLowerCase();
	} else {
		return input = prompt(str);
	}
}

function listTodos() {
	for (let i = 0; i < todoList.length; i++) {
		console.log(`${i}: ${todoList[i]}`);
	}
}

function removeTodo() {
	const indexToRemove = parseInt(userInput('What todo index to delete?'));
	if (Number.isInteger(indexToRemove) && todoList.length !== 0) {
		console.log(`${todoList[indexToRemove]} was deleted....`);
		todoList.splice(indexToRemove,1);

	} else {
		console.log('NOT A VALID INDEX!');
	}
}