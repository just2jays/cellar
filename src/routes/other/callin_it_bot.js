var config = require('../../../config/config.js');
var request = require('request');
var axios = require('axios');
var Discord = require("discord.js");
var _ = require("lodash");

module.exports = function(app, db) {
    var client = new Discord.Client;
    var firebaseDB = db;
    var cracksRef = firebaseDB.ref("cracks");
    var userStats = cracksRef.child("userStats");
    var userStatsRef = firebaseDB.ref("cracks/userStats");

    function sendMessage(message, content, asMention = true) {
        if(asMention) {
            message.reply(content);
        }else{
            message.channel.send(content);
        }
        
    }

    function sendBeerMessage(message, content, asMention = true) {
        if(asMention) {
            message.reply('Great choice, cheers! 🍻 \n'+content);
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

    function sendBeerHistoryMessage(message, content, asMention = true) {
        if(asMention) {
            message.reply('here is your last 5 beers 🗓 \n'+content);
        }else{
            message.channel.send(content);
        }
    }

    function sendBeerStatsToDiscord(message, beerHistory) {
        sendBeerHistoryMessage(message, beerHistory);
    }

    /**
     * FETCH USER BEER STATS FROM FIREBASE (NO UNTAPPD API NECCESARY!)
     */
    async function fetchCrackStats(message, user, callback) {
        // console.log('🔶 fetching for user: ', '\n', user);
        const HISTORY_LIMIT = 5;
        let historyResponse = 'No history found :(';
        var ref = userStatsRef.child(user);
        let beerArray = [];
        const finaleSnap = await ref.once('value');
        finaleSnap.forEach(function(item) {
            var itemVal = item.val();
            // console.log('🔶 itemVal', '\n', itemVal);
            beerArray.push(itemVal);
        });

        // Sort results DESC (Firebase always returns ASC by default)
        beerArray.reverse();

        if(beerArray.length > 0) {
            historyResponse = '';
            for(let i = 0; i < beerArray.length; i++){
                if(beerArray[i]){
                    historyResponse += (i+1)+') **NAME:** '+beerArray[i].name+'\n';
                }
            }
        }

        callback(message, historyResponse);
    }

    /*
    * FETCH BEER FROM UNTAPPD
    */
    function fetchBeerInfo(message, query, user, callback) {
        var client_id = config.untappd.UNTAPPED_CLIENT_ID;
        var client_secret = config.untappd.UNTAPPED_CLIENT_SECRET;
        var userRef = userStats.child(user);

        request('https://api.untappd.com/v4/search/beer?client_id='+client_id+'&client_secret='+client_secret+'&q='+query+'&limit=1&sort&offset',
            function (error, response, thebody) {
                var firstdata = JSON.parse(thebody);
                var timestamp = firstdata.timestamp;
                var foundBeer = "Beer Not Found :("

                if(firstdata.response.beers.count >= 1){
                    // we found something
                    var matchedItem = firstdata.response.beers.items[0];
                    foundBeer = '**NAME:** '+matchedItem.beer.beer_name+'\n**BREWERY:** '+matchedItem.brewery.brewery_name+'\n**LOCATION:** '+matchedItem.brewery.location.brewery_city+', '+ matchedItem.brewery.location.brewery_state +'\n**STYLE:** '+matchedItem.beer.beer_style+'\n**ABV:** '+matchedItem.beer.beer_abv+'%\n**MORE INFO:** https://untappd.com/b/'+matchedItem.beer.beer_slug+'/'+matchedItem.beer.bid;

                    userRef.once("value", function(snapshot) {
                        var beerStatRef = userStats.child(user).push({
                            name: matchedItem.beer.beer_name,
                            brewery: matchedItem.brewery.brewery_name,
                            abv: matchedItem.beer.beer_abv,
                            style: matchedItem.beer.beer_style
                        });
                    });

                }else{
                    foundBeer = "Beer Not Found :("
                }
                
                callback(message, foundBeer);
            }
        );
    }

    function postToSlack(message, url) {
        request(url, function (err, resp, body) {
            var data = JSON.parse(body);
            sendMessage(message, data.response.posts[0].photos[0].original_size.url)
        });
    }

    function sendToDiscord(message, timestamp) {
        // request(url, function (err, resp, body) {
            // var data = JSON.parse(body);
            sendMessage(message, 'https://worldisending.com/callinit/gifs/out_'+timestamp+'.gif');
        // });
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
        // request.post({url:'/var/www/html/labs/generate.py', formData: {
        //     subject: 'hotdog',
        //     font: 'impact',
        //     rainbow: 'false',
        //     crazy: 'false',
        //     no_need: 'true'
        // }}, function (err, resp, body) {
        //     if (err) {
        //         console.log(err);
        //     }else{
        //         callback(message, "test no need 2");
        //     }
        // });

        axios.get('/var/www/botback/generate.php', {
            params: {
                subject: 'hotdog',
                font: 'impact',
                rainbow: 'false',
                crazy: 'false',
                no_need: 'true'
            }
        })
        .then(function (response) {
            // console.log(response);
            callback(message, "test no need 4");
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
            // callback(message, "test no need 3");
        });
    }

    /*
    * RANDOM CALLIN IT BOT SCRIPT
    */
    function getRandomCallinIt(message, query, callback, asNoNeed = false, useQueryText = false) {
        // console.log('✅', '\n', query);
        // console.log('🔶', '\n', 'https://worldisending.com/callinit/generate.php?query='+query+'&font=impact&rainbow=false&crazy=false&no_need='+asNoNeed+'&use_query_text='+useQueryText);
        request('https://worldisending.com/callinit/generate.php?query='+query+'&font=impact&rainbow=false&crazy=false&no_need='+asNoNeed+'&use_query_text='+useQueryText,
            function (error, response, thebody) {
                var firstdata = JSON.parse(thebody);
                console.log('🚨', '\n', firstdata);
                var timestamp = firstdata.timestamp;
                callback(message, timestamp);
            }
        );
    }

    /*
    * CALLIN IT BOT FUNCTION
    */
    function getTotalCount(message, callback) {
        request('https://api.tumblr.com/v2/blog/imcallinit.tumblr.com/info?api_key=bQLV4Cnl5qRFGhHT7cn23k7YXAkmxnZpKCM2eLLFE3kARBi9LD', function (error, response, thebody) {
            var firstdata = JSON.parse(thebody);
            var allposts = firstdata.response.blog.posts;
            var offset = Math.floor(Math.random() * (allposts - 0) + 0);
            callback(message, "https://api.tumblr.com/v2/blog/imcallinit.tumblr.com/posts?api_key=bQLV4Cnl5qRFGhHT7cn23k7YXAkmxnZpKCM2eLLFE3kARBi9LD&offset=" + offset + "&limit=1");
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

    function addToSharedSpotifyPlaylist(message, playlistId, uriType, uriId, dangerousToken) {
        console.log('%c URL ', 'background: orange; color: black; display: block;', `https://api.spotify.com/v1/playlists/${playlistId}/tracks`);
        console.log('%c uris ', 'background: green; color: white; display: block;', `${uriType.trim()}:${uriId.trim()}`);


        axios.post(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                uris: [`${uriType}:${uriId}`]
            },
            {
                headers: {
                    Authorization: "Bearer " + dangerousToken,
                },
            }
        )
        .then(function (response) {
            // console.log(response);
            // callback(message, "test no need 4");
            message.reply('Should be added?');
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
            // callback(message, "test no need 3");
        });
    }

    client.on("message", message => {
        // console.log('🔶 MESSAGE RECEIVED', '\n', message);
        if(message.channel.name === 'testing-123' && message.content.startsWith('https://open.spotify.com/')) {
            const dangerousAuthTokenIsDangerous = 'BQC2SHcX7eMuexUjoQe8xsbnY6hNFYsUTa2-SBc5s_E0MnDTCu1CNjrRVW8dfIboB8AgIkFMucn8Ttk0maCL07Gc61eKQUdjclyB2cJqK_SBQGZjwCFL5GGgt3mAZ-bm4A2OIGI--7-06bDBRZiwRx7Zxe_e7kj4dJigw7WhjYDurKtX7g';
            const playlistId = '2s2fkoFaRJ6CptbGxu8ZGt'; // Playlist ID as of 5/31/2022
            const messageItem = new URL(message.content);
            let uriData = messageItem.pathname.split('/')
            let uriType = uriData[1];
            let uriId = uriData[2];
            addToSharedSpotifyPlaylist(message, playlistId, uriType, uriId, dangerousAuthTokenIsDangerous);
        }

        if(message.content.startsWith("!rando")) {
            var queryArray = message.content.split(" ");
            // console.log(queryArray);
            var joinedQuery = queryArray.slice(1,queryArray.length).join('+').toLowerCase();
            // console.log(joinedQuery);
            // var message_array = message.content.split(" ");
            // var joinedQuery = message_array.slice(1,message_array.length).join('+');
            getRandomCallinIt(message, joinedQuery, sendToDiscord, false, false);
        }
        if(message.content.startsWith("!crando")) {
            var queryArray = message.content.split(" ");
            // console.log(queryArray);
            var joinedQuery = queryArray.slice(1,queryArray.length).join('+').toLowerCase();
            // console.log(joinedQuery);
            // var message_array = message.content.split(" ");
            // var joinedQuery = message_array.slice(1,message_array.length).join('+');
            getRandomCallinIt(message, joinedQuery, sendToDiscord, false, true);
        }
        if(message.content == "!callinit") {
            getTotalCount(message, postToSlack);
        }
        if(message.content == "!rollin") {
            rollTheDice(message, postRollToDiscord);
        }
        if(message.content.startsWith("!noneed")) {
            var queryArray = message.content.split(" ");
            // console.log(queryArray);
            var joinedQuery = queryArray.slice(1,queryArray.length).join('+').toLowerCase();
            // console.log(joinedQuery);
            // var message_array = message.content.split(" ");
            // var joinedQuery = message_array.slice(1,message_array.length).join('+');
            getRandomCallinIt(message, joinedQuery, sendToDiscord, true, false);
        }

        if(message.content.startsWith("!icracked")) {
            var queryArray = message.content.split(" ");
            var authorName = _.get(message, 'author.username');
            var authorId = _.get(message, 'author.id');
            var authorHash = `${authorName}-${authorId}`;
            var beerQuery = queryArray.slice(1, queryArray.length).join(' ').toLowerCase();
            // console.log(joinedQuery);
            // var message_array = message.content.split(" ");
            // var joinedQuery = message_array.slice(1,message_array.length).join('+');
            // getRandomCallinIt(message, beerQuery, sendToDiscord, false, false);
            fetchBeerInfo(message, beerQuery, authorHash, sendBeerToDiscord);
        }

        if(message.content.startsWith("!mycracks")) {
            var authorName = _.get(message, 'author.username');
            var authorId = _.get(message, 'author.id');
            var authorHash = `${authorName}-${authorId}`;
            // var queryArray = message.content.split(" ");
            // console.log(queryArray);
            // var beerQuery = queryArray.slice(1, queryArray.length).join(' ').toLowerCase();
            // console.log(joinedQuery);
            // var message_array = message.content.split(" ");
            // var joinedQuery = message_array.slice(1,message_array.length).join('+');
            // getRandomCallinIt(message, beerQuery, sendToDiscord, false, false);
            fetchCrackStats(message, authorHash, sendBeerStatsToDiscord);
        }
    });

    client.login(config.discord.TOKEN);
};