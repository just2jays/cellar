const collectionRoutes = require('./collection_routes');
const showRoutes = require('./show_routes');
const artistRoutes = require('./artist_routes');
const callin_it_bot = require('./other/callin_it_bot');

module.exports = function(app, db) {
  collectionRoutes(app, db);
  showRoutes(app, db);
  artistRoutes(app, db);
  callin_it_bot(app, db);
};