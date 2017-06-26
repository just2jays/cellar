var request = require('request');

module.exports = function(app, db) {
    app.post('/collection', (req, res) => {
        // You'll create your note here.
        console.log(req.body)
        res.send('Hello')
    });

    app.get('/collection/:name', (req, res) => {
        //console.log(req);
        // https://archive.org/advancedsearch.php?q=collection%3A%28DeadAndCompany%29&fl%5B%5D=avg_rating&fl%5B%5D=collection&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=addeddate+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json
        request({
            url: 'https://archive.org/advancedsearch.php?q=collection%3A%28'+req.params.name+'%29&fl%5B%5D=avg_rating&fl%5B%5D=collection&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=addeddate+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json',
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