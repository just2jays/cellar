var config = require('../../../config/config.js');
var request = require('request');
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
    sendMessage(message, result.visualResults, false);
    sendMessage(message, result.textResults);
}

/*
* NO NEED BOT
*/
function generateNoNeed(message, callback) {
    request.post({url:'/var/www/html/labs/generate.py', formData: {
        subject: 'hotdog',
        font: 'impact',
        rainbow: 'false',
        crazy: 'false',
        no_need: 'true'
    }}, function (err, resp, body) {
        if (err) {
            console.log(err);
        }else{
            callback(message, "test no need 2");
        }
    });
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
        '<:ceevee:576146714084507660>',
        '<:patty:571388280952717314>',
        '<:liljim:571387346503598099>',
        '<:bigjim:571387291843428352>',
        '<:jdstare:571387196276211723>',
        '<:jdtongue:571386881447559324>',
        '<:palevan:557638375641841666>',
        '<:babymic:553685330994135080>',
        '<:lorbs:535867144169062400>',
        '<:vanwink:525011879119028227>',
        '<:vanimal:524702569541402654>',
        '<:thebaby:524695266813542423>',
        '<:howie:490214575363588107>'
    ];

    var winningSpin = false;
    var spinResult = [];

    for (i=1; i<= 3; i++){
        spinResult.push(_.sample(emojiArray));
    }

    if(_.uniq(spinResult).length == 1){
        // WIN
        var resultObject = {
            visualResults: spinResult.join(" "),
            textResults: ":moneybag: JACKPOT!"
        }
    }else{
        // LOSE
        var resultObject = {
            visualResults: spinResult.join(" "),
            textResults: ":cherries: Better luck next time..."
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
    if(message.content.includes("!noneed")) {
        generateNoNeed(message, postRollToDiscord);
    }
});

client.login(config.discord.TOKEN);
