/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  let createTweetElement = (tweetData) => {
    let $tweets = $('<article>').addClass("new-tweet-container");

    function escape(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML
    }

    const safeHTML = `<p>${escape(tweetData.content.text)}</p>`

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
      ${safeHTML}
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
      $('#tweets-container').prepend($($tweet))
    }
  }

  $(function() {
    let $tweetSubmit = $('#tweet-form');
    $tweetSubmit.on('submit', (event) => {
      event.preventDefault();
      console.log('Button clicked, performing ajax call...')

      let dataRequest = $tweetSubmit.serialize();
      if ($('#text-area').val() == "" || $('#text-area').val() == null) {
        alert("this is blank");
      } else if ($('#text-area').val().length > 140) {
        alert("this is too long")
      }

        $.ajax('/tweets', {
          method: 'POST',
          data: dataRequest,
        })
        .then(
          $('#text-area').val(''),
          $('.counter').text(140),
          loadTweets()
        )
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

  //let composeSlide = () => {
    $("#compose-button").click(function() {
      $(".compose-tweet").slideToggle("slow", function() {
        if ($(this).is(':visible')) {
          $('textarea').focus();
        }
      })
    })
  //}

});

