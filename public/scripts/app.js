/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  let createTweetElement = (tweetData) => {
    let $tweets = $('<article>').addClass("new-tweet-container");

    let html = `
    <header class="tweet-header">
      <div class="tweet-header-image">
        <img src="${tweetData.user.avatars.small}" />
      </div>
      <div class="tweet-name-handle-container">
        <h2>${tweetData.user.name}</h2>
        <span>${tweetData.user.handle}</span>
      </div>
    </header>
    <div class="tweet-body">
      <p>${tweetData.content.text}</p>
    </div>
    <footer class="tweet-footer">
      <div><p>Posted ${new Date(tweetData.created_at)}</p></div>
      <div class="footer-icons">
        <img src="#" class="tweet-flag-icon" />
        <img src="#" class="tweet-retweet-icon" />
        <img src="#" class="tweet-like-icon" />
      </div>
    </footer>
  `;
    $tweets = $tweets.append(html);
    return $tweets;
  };

  function renderTweets(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (i = 0; i < tweets.length; i++) {
      let $tweet = createTweetElement(tweets[i])
      $('#tweets-container').append($($tweet))
    }
  }

  $(function() {
    let $tweetSubmit = $('#tweet-form');
    $tweetSubmit.on('submit', (event) => {
      event.preventDefault();
      console.log('Button clicked, performing ajax call...')

      let dataRequest = $tweetSubmit.serialize();
      $.ajax('/tweets', {
        method: 'POST',
        data: dataRequest,
      })
    })
  });

  let loadTweets = () => {
    $.ajax('/tweets', {
      method: 'GET'
    }).then(function(json) {
      renderTweets(json)
    })
  }

  loadTweets();
  //renderTweets(data);

});

