const collectionRoutes = require('./collection_routes');

module.exports = function(app, db) {
  collectionRoutes(app, db);
  // Other route groups could go here, in the future
};