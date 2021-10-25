const { v4: uuid } = require('uuid');

const tweets = [
    {
        id: uuid(),
        username: 'Fonysony',
        comment: 'Bitch, I love my sushi though',
    },
    {
        id: uuid(),
        username: 'Mattlovescupcakes',
        comment: 'Not with that additude',
    },
    {
        id: uuid(),
        username: 'Just_holywater',
        comment: `Why didn't you pay for that beat though?`,
    },
    {
        id: uuid(),
        username: 'Scrublord720',
        comment: `Girls ain't shit! Girls ain't SHIT!!!`,
    },
    {
        id: uuid(),
        username: 'Crummyplane',
        comment: 'Simply get better',
    },
    {
        id: uuid(),
        username: 'alexthebuttslayer',
        comment: 'Ya, I built my castle in a day',
    },
    {
        id: uuid(),
        username: 'loveliveloveserve',
        comment: `You ain't gonna rap over this one!`,
    },
    {
        id: uuid(),
        username: 'girlISHOE',
        comment: 'OHHHH, HE NEED SOME MILK!!!',
    },
    {
        id:uuid(),
        username: 'cowBoybeat',
        comment: `THAT'S A BIG BOI!!`,
    },
    {
        id: uuid(),
        username: 'Bigray',
        comment: 'I only get bitches',
    },
];

module.exports = tweets;