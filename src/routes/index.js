const collectionRoutes = require('./collection_routes');
const showRoutes = require('./show_routes');

module.exports = function(app, db) {
  collectionRoutes(app, db);
  showRoutes(app, db);
  // Other route groups could go here, in the future
};