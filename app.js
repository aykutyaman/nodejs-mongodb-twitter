var CONFIG = require('config'),
    TweetArchiver = require('tweet-archiver');

var app = require('express').createServer();

app.get('/list/:tag', function(request, response) {
  var selector;
  if (request.params.tag) selector = {tags: request.params.tag};
  else selector = {};
  TweetArchiver.findCollectionTwitsBySelector(CONFIG.COLLECTION_NAME, selector, function(tweets) {
    response.render(__dirname+'/views/index.jade', {title: "Simple Node.js Twitter app", tweets: tweets, tags: CONFIG.TAGS});
  });
});
app.listen(3000);

// use this in order to update
CONFIG.TAGS.forEach(function(tag) {
  var tweetArchive = new TweetArchiver(tag);
  tweetArchive.update();
});

