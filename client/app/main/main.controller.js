'use strict';

angular.module('tweetWorldApp')
  .controller('MainCtrl', function ($scope, $http, socket, Tweet) {
    $scope.tweets = [];
    $scope.searchText = '';
    $scope.currentSearch = '';

    var res = Tweet.get();

    $scope.searchTweets = function() {
      if ($scope.searchText === '') {
        return;
      }

      console.log('creating new search for: ' + $scope.searchText);

      // tell the server to start a tweet stream
      socket.socket.emit('query', $scope.searchText);

      // update the current search
      $scope.currentSearch = $scope.searchText;

      // reset the tweets and search text
      $scope.tweets = [];
      $scope.searchText = '';

      // when a tweet is pushed, push it onto the list of tweets
      socket.socket.on('tweet', function(tweet) {
        console.log('tweet received: ' + tweet.id);
        /*
         if ($scope.tweets.length == 10) {
         $scope.tweets.shift();
         }
         */
        $scope.tweets.push(tweet);
      });

    };
  });
