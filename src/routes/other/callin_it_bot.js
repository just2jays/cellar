var config = require('../../../config/config.js');
var request = require('request');
var Discord = require("discord.js");

var client = new Discord.Client;

function sendMessage(message, content) {
    message.reply(content);
}

function postToSlack(message, url) {
    request(url, function (err, resp, body) {
        var data = JSON.parse(body);
        sendMessage(message, data.response.posts[0].photos[0].original_size.url)
    });
}

function getTotalCount(message, callback) {
    request('http://api.tumblr.com/v2/blog/imcallinit.tumblr.com/info?api_key=bQLV4Cnl5qRFGhHT7cn23k7YXAkmxnZpKCM2eLLFE3kARBi9LD', function (error, response, thebody) {
        var firstdata = JSON.parse(thebody);
        var allposts = firstdata.response.blog.posts;
        var offset = Math.floor(Math.random() * (allposts - 0) + 0);
        callback(message, "http://api.tumblr.com/v2/blog/imcallinit.tumblr.com/posts?api_key=bQLV4Cnl5qRFGhHT7cn23k7YXAkmxnZpKCM2eLLFE3kARBi9LD&offset=" + offset + "&limit=1");
    });
}

module.exports = function(app, db) {
    app.get('/callinit', (req, res) => {
        client.on("message", message => {
            if(message.content == "!callinit") {
              getTotalCount(message, postToSlack);
            }
          });
          
          client.login(config.discordConfig.TOKEN);
    });
};