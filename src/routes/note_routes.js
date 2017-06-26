module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
        // You'll create your note here.
        console.log(req.body)
        res.send('Hello')
    });

    app.get('https://archive.org/advancedsearch.php?q=collection%3A%28DeadAndCompany%29&fl%5B%5D=avg_rating&fl%5B%5D=collection&fl%5B%5D=date&fl%5B%5D=description&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=addeddate+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json', (req, res) => {
        
    });
};