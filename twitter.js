let tweetsElement = document.getElementById("tweets");
let newTweetTextElement = document.getElementById("newTweetText");
let submitTweetButton = document.getElementById("submitTweet");

function addNewTweet(tweetHandle, tweetText) {
  let newHandleElement = document.createElement("p");
  newHandleElement.classList.add("handle");
  newHandleElement.innerText = tweetHandle + ":";
  tweetsElement.appendChild(newHandleElement);

  let newTweetElement = document.createElement("p");
  newTweetElement.innerText = tweetText;
  tweetsElement.appendChild(newTweetElement);
}

submitTweetButton.onclick = function() {
  addNewTweet(newTweetTextElement.value);
};

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('2829cd349660dac0cd79', {
  cluster: 'eu',
  encrypted: true
});

var channel = pusher.subscribe('my-channel');
channel.bind('my-event', function(data) {
  addNewTweet(data.name, data.message);
});
