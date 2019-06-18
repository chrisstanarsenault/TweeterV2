/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": {
  //       "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //       "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //     },
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // }

  // Fake data taken from tweets.json
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": {
  //         "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //         "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //       },
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Johann von Goethe",
  //       "avatars": {
  //         "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //         "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //       },
  //       "handle": "@johann49"
  //     },
  //     "content": {
  //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //     },
  //     "created_at": 1461113796368
  //   }
  // ];

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

