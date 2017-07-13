var lastfmConfig = require('../../config/lastfm.js');
var request = require('request');

module.exports = function(app, db) {
    app.post('/artist', (req, res) => {

    });

    app.get('/artist/:name', (req, res) => {
        request({
            url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+req.params.name+'&api_key='+lastfmConfig.API_KEY+'&format=json',
            headers: {
                'user-agent': 'node.js',
            },
        }, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                res.send(body);
            }
        });
    });
};