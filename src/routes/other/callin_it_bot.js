var config = require('../../../config/config.js');
var request = require('request');
var Discord = require("discord.js");
var _ = require("lodash");

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

function postRollToDiscord(message, text) {
    sendMessage(message, text)
}

function postSlotsToDiscord(message, result) {
    sendMessage(message, result.visualResults);
    sendMessage(message, result.textResults);
}

/*
 * CALLIN IT BOT FUNCTION
 */
function getTotalCount(message, callback) {
    request('http://api.tumblr.com/v2/blog/imcallinit.tumblr.com/info?api_key=bQLV4Cnl5qRFGhHT7cn23k7YXAkmxnZpKCM2eLLFE3kARBi9LD', function (error, response, thebody) {
        var firstdata = JSON.parse(thebody);
        var allposts = firstdata.response.blog.posts;
        var offset = Math.floor(Math.random() * (allposts - 0) + 0);
        callback(message, "http://api.tumblr.com/v2/blog/imcallinit.tumblr.com/posts?api_key=bQLV4Cnl5qRFGhHT7cn23k7YXAkmxnZpKCM2eLLFE3kARBi9LD&offset=" + offset + "&limit=1");
    });
}

/*
 * SLOTS BOT
 */
function spinTheWheel(message, callback) {
    var emojiArray = [
        ':ceevee:',
        ':patty:',
        ':liljim:',
        ':bigjim:',
        ':jdstare:',
        ':jdtongue:',
        ':palevan:',
        ':babymic:',
        ':lorbs:',
        ':vanwink:',
        ':vanimal:',
        ':thebaby:',
        ':howie:'
    ];

    var winningSpin = false;
    var spinResult = [];

    var wheel1 = _.sample(emojiArray);
    var wheel2 = _.sample(emojiArray);
    var wheel3 = _.sample(emojiArray);

    spinResult.push(wheel1);
    if(spinResult.indexOf(wheel2) > -1){
        spinResult.push(wheel2);
    }
    if(spinResult.indexOf(wheel3) > -1){
        winningSpin = true;
    }

    if(winningSpin){
        var resultObject = {
            visualResults: "| "+wheel1+" \|\| "+wheel2+" \|\| "+wheel3+" |",
            textResults: ":cherries: JACKPOT!!"
        }
    }else{
        var resultObject = {
            visualResults: "| "+wheel1+" \|\| "+wheel2+" \|\| "+wheel3+" |",
            textResults: ":cherries: better luck next time!!"
        }
    }

    callback(message, resultObject);
}

/*
 * CEELO BOT FUNCTION(S)
 */
function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

function roll (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function rollTheDice(message, callback) {
    var matches;
    var times = 2;
    var die = 6;
    var rolls = [];
    var total = 0;

    var rollArray = [];
    for (i = 1; i <= 3; i++) {
        rollArray.push(roll(1, 6));
    }

    var originalRoll = rollArray;
    var uniqueRoll = rollArray.slice();

    var finalScore = ":game_die: ["+rollArray[0]+"]["+rollArray[1]+"]["+rollArray[2]+"] | Nothing, re-roll!";
    uniqueRoll = _.uniq(uniqueRoll);

    if ( _.includes(rollArray, 4) && _.includes(rollArray, 5) && _.includes(rollArray, 6) ) {
        // AUTO WIN
        finalScore = ":game_die: ["+rollArray[0]+"]["+rollArray[1]+"]["+rollArray[2]+"] | Boom! Auto-win congrats.";
    }

    if ( _.includes(rollArray, 1) && _.includes(rollArray, 2) && _.includes(rollArray, 3) ) {
        // AUTO LOSS
        finalScore = ":game_die: ["+rollArray[0]+"]["+rollArray[1]+"]["+rollArray[2]+"] | Ouch! Auto-loss. Better luck next time.";
    }

    if (uniqueRoll.length == 1) {
        // trips
        finalScore = ":game_die: ["+rollArray[0]+"]["+rollArray[1]+"]["+rollArray[2]+"] | Triple *" + uniqueRoll[0] + "*'s!";
    }

    if (uniqueRoll.length == 2) {
        // a scoreable roll
        _.forEach(uniqueRoll, function (val, index) {
            if (getOccurrence(originalRoll, val) == 2) {
                uniqueRoll.splice(index, 1);
                uniqueRoll.filter(function () {
                    return true;
                });
                finalScore = ":game_die: ["+rollArray[0]+"]["+rollArray[1]+"]["+rollArray[2]+"] | You got a **" + uniqueRoll[0] + "**";
            }
        });
    }

    callback(message, finalScore);
}

client.on("message", message => {
    if(message.content == "!callinit") {
        getTotalCount(message, postToSlack);
    }
    if(message.content == "!rollin") {
        rollTheDice(message, postRollToDiscord);
    }
    if(message.content == "!slots") {
        spinTheWheel(message, postSlotsToDiscord);
    }
});

client.login(config.discord.TOKEN);
