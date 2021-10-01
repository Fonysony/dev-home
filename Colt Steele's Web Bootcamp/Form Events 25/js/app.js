const tweetForm = document.querySelector('#tweetForm');
const tweetsContainer = document.querySelector('#tweets');


tweetForm.addEventListener('submit', function (e) {
    // Instead of having to make a variable and storing to get username
    // we can grab the form element
    // const username = document.querySelector('#user');
    // console.log(username.value);
    e.preventDefault();
    const userbane = tweetForm.elements.username;
    const tweetInput = tweetForm.elements.tweet;
    addTweet(userbane.value, tweetInput.value);
    userbane.value = '';
    tweetInput.value = '';
});

const addTweet = (username, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');
    bTag.append(username);
    newTweet.append(username);
    newTweet.append(`: ${tweet}`);
    tweetsContainer.append(newTweet);
    console.log(newTweet);
}