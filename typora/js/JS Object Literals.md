Objects

- Objects are collections of properties.
- Properties are a key -value pair
- Rather than accessing data using an index, we use custom keys.

const fitBitData = {

​	totalSteps        : 308727,

​	totalMiles.        : 211.7

};

Property = Key + Value

Key-Value Pairs

username: 'crazyCatLady'

upvotes: 7

text: 'great post'

You can create an object literal, but you need a key and a value. Like username is the key and crazyCatLady is the value.

All keys are coverted to strings (Except for Symbols). There are two types of accessing data of objects, The dot syntax and double square brackets syntax. Example:

const player = {

​	username: 'Peen',

​	101: 'WIZARD 101'

};

player.username; // Peen

player['username']; // Peen, THIS does not work if its no quotes '' in it, but number values do.

player.101 // ERROR, THIS does not work

player.[101]; // WIZARD 101

Update Objects

Objects can be updated by equaling it into a value. Example:

player.username = 'Fony'; // Fony

player['username'] = 'Fony'; // Fony

New keys can be added into an existing object. Example:

const fruits = {

​	banana: '20hp';

​	apple: '40hp';

};

fruits.grape = '70hp';

// fruits {banana: '20hp', apple: '40hp', grape: '70hp'}