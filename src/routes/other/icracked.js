var config = require('../../../config/config.js');
var request = require('request');
var axios = require('axios');
var Discord = require("discord.js");
var _ = require("lodash");

var client = new Discord.Client;

function sendMessage(message, content, asMention = true) {
    if(asMention) {
        message.reply(content);
    }else{
        message.channel.send(content);
    }
    
}

function sendToDiscord(message, timestamp) {
    // request(url, function (err, resp, body) {
        // var data = JSON.parse(body);
        sendMessage(message, 'https://worldisending.com/callinit/gifs/out_'+timestamp+'.gif');
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
          // callback(message, timestamp);
      }
  );
}

client.on("message", message => {
  if(message.content.startsWith("!icracked")) {
    var queryArray = message.content.split(" ");
    // console.log(queryArray);
    var beerQuery = queryArray.slice(1, queryArray.length).toLowerCase();
    // console.log(joinedQuery);
    // var message_array = message.content.split(" ");
    // var joinedQuery = message_array.slice(1,message_array.length).join('+');
    // getRandomCallinIt(message, beerQuery, sendToDiscord, false, false);
    fetchBeerInfo(message, beerQuery, sendToDiscord);
  }
});

client.login(config.discord.TOKEN);
