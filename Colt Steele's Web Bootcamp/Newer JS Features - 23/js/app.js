const cats = ['Blue', 'Scout', 'Rocket'];
const dogs = ['Rusty', 'Wyatt'];

const allPets = [...cats, ...dogs]; // ['Blue', 'Scout', 'Rocket', 'Rusty', 'Wyatt']
const allPets2 = [...dogs, ...cats]; // ['Rusty', 'Wyatt', 'Blue', 'Scout', 'Rocket']
console.log(cats); // ['Blue', 'Scout', 'Rocket']
console.log(dogs); // ['Rusty', 'Wyatt'];

const nums = [7, 6, 5, 3];
console.log(nums); // [7, 6, 5, 3]
console.log(...nums); // 7 6 5 3
console.log(...'hello'); // "h e l l o"
console.log('h', 'e', 'l', 'l', 'o'); // "h e l l o"

const badFriend = {firstName: 'Aaron', strength: 20};
const goodFriend = {firstName: 'Justin', agility: 50};

const allFriends = {...badFriend, ...goodFriend};
const allFriend = {...goodFriend, ...badFriend, agility: 100};