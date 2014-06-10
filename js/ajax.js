(function($) {
  $(function() {
    var twitter = $('.t-feed');
    var yahoo = $('.y-feed');
    // Create promise.
    var requests = {
      twitter: function() {
        return $.ajax({
          url: 'data/twitter.json',
        });
      },
      yahoo: function() {
        return $.ajax({
          url: 'data/yahoo.json'
        });
      }
    }
    // Handle success
    // See this link for how this works
    // http://collaboradev.com/2014/01/27/understanding-javascript-promises-in-jquery/
    $.when(requests.twitter(), requests.yahoo())
    .done(function(twitterData, yahooData) {
      var twitterHtml = '';
      var yahooHtml = '';
      // Simple data. For somereason jquery puts the data in arrays.
      twitterData[0].forEach(function(item) {
        twitterHtml += item.text + '-' + item['created-at'] + '<br /><br />';
      });

      // Yahoo data is buried in value.items
      yahooData[0].value.items.forEach(function(item) {
        yahooHtml += item.title + '-' + item['pubDate'] + '<br /><br />';
      });
      twitter.html(twitterHtml);
      yahoo.html(yahooHtml);
    });
  });
})(jQuery);
