var config = require('../../../config/config.js');
var request = require('request');
var axios = require('axios');
var Discord = require("discord.js");
var _ = require("lodash");
var firebaseAdmin = require('firebase-admin');

// Initialize Discord
var client = new Discord.Client;

// Initialize Firebase
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.firebaseAdmin),
  databaseURL: "https://just-trying-stuff-bcd1f.firebaseio.com"
});

var firebaseDB = firebaseAdmin.database();
var cracksRef = firebaseDB.ref("cracks");
var userStats = cracksRef.child("userStats");
// var slotStatsRef = firebaseDB.ref("mvslots/slotStats");

function sendBeerMessage(message, content, asMention = true) {
    if(asMention) {
        message.reply(content);
    }else{
        message.channel.send(content);
    }
    
}

function sendBeerToDiscord(message, beer) {
    // request(url, function (err, resp, body) {
        // var data = JSON.parse(body);
        sendBeerMessage(message, beer);
    // });
}

/*
* FETCH BEER FROM UNTAPPD
*/
function fetchBeerInfo(message, query, callback) {
  var client_id = config.untappd.UNTAPPED_CLIENT_ID;
  var client_secret = config.untappd.UNTAPPED_CLIENT_SECRET;
  console.log('✅', '\n', query);
  console.log('🔶', '\n', 'https://api.untappd.com/v4/search/beer?client_id='+client_id+'&client_secret='+client_secret+'&q='+query+'&limit=1&sort&offset');
  request('https://api.untappd.com/v4/search/beer?client_id='+client_id+'&client_secret='+client_secret+'&q='+query+'&limit=1&sort&offset',
      function (error, response, thebody) {
          var firstdata = JSON.parse(thebody);
          console.log('🚨', '\n', firstdata);
          var timestamp = firstdata.timestamp;
          var foundBeer = "Beer Not Found :("

          if(firstdata.response.beers.count >= 1){
            // we found something
            var matchedItem = firstdata.response.beers.items[0];
            foundBeer = '\
            ```\
            **NAME:** '+matchedItem.beer.beer_name+'\
            **BREWERY:** '+matchedItem.brewery.brewery_name+'\
            **STYLE:** '+matchedItem.beer.beer_style+'\
            **ABV %:** '+matchedItem.beer.beer_abv+'%\
            **MORE INFO:** https://untappd.com/b/'+matchedItem.beer.beer_slug+'/'+matchedItem.beer.bid+'\
            ```\
            ';
          }else{
            foundBeer = "Beer Not Found :("
          }
          callback(message, foundBeer);
      }
  );
}

client.on("message", message => {
  console.log('✅ message', '\n', message);
  if(message.content.startsWith("!icracked")) {
    var queryArray = message.content.split(" ");
    // console.log(queryArray);
    var beerQuery = queryArray.slice(1, queryArray.length).join(' ').toLowerCase();
    // console.log(joinedQuery);
    // var message_array = message.content.split(" ");
    // var joinedQuery = message_array.slice(1,message_array.length).join('+');
    // getRandomCallinIt(message, beerQuery, sendToDiscord, false, false);
    fetchBeerInfo(message, beerQuery, sendBeerToDiscord);
  }
});

client.login(config.discord.TOKEN);
