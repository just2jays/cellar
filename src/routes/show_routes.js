var request = require('request');

module.exports = function(app, db) {
    app.post('/show', (req, res) => {

    });

    app.get('/show/:name', (req, res) => {
        request({
            url: 'https://archive.org/details/'+req.params.name+'&output=json',
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