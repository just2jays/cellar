var config = require('../../config/config.js');
var request = require('request');

module.exports = function(app, db) {
    app.post('/artist', (req, res) => {

    });

    app.get('/artist/:name', (req, res) => {
        request({
            url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+encodeURIComponent(req.params.name)+'&api_key='+config.lastfm.API_KEY+'&format=json',
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