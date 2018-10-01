'use strict'
const SwaggerExpress = require('swagger-express-mw');//Import Swagger server dependences
const app = require('express')();


module.exports = app; // for testing
var config = {
  appRoot: __dirname // required config
};

//Server
SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('Server Running.....');
  }
});

