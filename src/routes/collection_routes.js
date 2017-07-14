var request = require('request');

module.exports = function(app, db) {
    app.post('/collection', (req, res) => {

    });

    app.get('/collection/:name', (req, res) => {
        request({
            url: 'https://archive.org/advancedsearch.php?q=collection%3A%28etree%29format%3A%28VBR+MP3%29creator%3A%28'+encodeURIComponent(req.params.name)+'%29&sort%5B%5D=date+desc&output=json',
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