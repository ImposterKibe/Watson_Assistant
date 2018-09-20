'use strict';

const prompt = require('prompt')
const AssistantV1 = require('watson-developer-cloud/assistant/v1')


var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

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


// Set up Assistant service wrapper.
const service = new AssistantV1({
  username: '3a48d38a-8e14-44d6-94c9-40914d026b59', // replace with service username
  password: '27X8NaUUktNX', // replace with service password
  version: '2018-09-18'
});

const workspace_id = 'bb207c13-f34d-4b47-a8c9-f4b1c2b5fd23'; // replace with workspace ID

// Start conversation with empty message.
service.message({
  workspace_id: workspace_id
}, processResponse);

// Process the service response.
function processResponse (err, response) {
  if (err) {
    console.error(err); // something went wrong
    return;
  }

  // If an intent was detected, log it out to the console.
  if (response.intents.length > 0) {
    console.log('Detected intent: #' + response.intents[0].intent);
  }

  // Display the output from dialog, if any.
  if (response.output.text.length != 0) {
      console.log(response.output.text[0]);
  }

  // Prompt for the next round of input.

  prompt.start()
  const newMessageFromUser = prompt.get('user_input', (err,result)=>{
    service.message({
      workspace_id: workspace_id,
      context : response.context,
      input: { text: result.user_input }
      }, processResponse)

  })
}
