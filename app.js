'use strict';
// Audio

// Load Environment Variable
require('dotenv').config()

//Watson Assistant dependencies
//Swagger server dependencies
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

const prompt = require('prompt')
const AssistantV1 = require('watson-developer-cloud/assistant/v1')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
// const speechToTextV1 = require('watson-developer-cloud/text-to-speech/v1')
const language_translatorV3 = require('watson-developer-cloud/language-translator/v3')
const workspace_id = process.env.WORKSPACE_ID; // replace with workspace ID

// Set up Speech-to-Text service wrapper
/*
const speechToText= new speechToTextV1({
  username: process.env.SPEECH_USERNAME ,
  password: process.env.SPEECH_PASSWORD,
  url:process.env.SPEECH_URL
})
*/
//Set Up Translator service
const language_translator= new language_translatorV3({
  username: process.env.TRANSLATOR_USERNAME ,
  password: process.env.TRANSLATOR_PASSWORD,
  url:process.env.TRANSLATOR_URL,
  version: '2018-09-20'
})

// Set up Assistant service wrapper.
const assistant = new AssistantV1({
  username: process.env.ASSISTANT_USERNAME, // replace with service username
  password: process.env.ASSISTANT_PASSWORD, // replace with service password
  version: '2018-09-18'
});

//Watson Tone Analyzer Service wrapper
const tone_analyzer= new ToneAnalyzerV3({
  username: process.env.TONE_USERNAME, // replace with service username
  password: process.env.TONE_PASSWORD, // replace with service password
  version: 'V1',
  version_date:'2016-05-19',
  url: process.env.TONE_URL
})


const my_text= 'Hi, partner'

//Parameters
const toneParams= {
  'tone_input':{'text':my_text},
  'content_type':'application/json'
}
const translatorParams= {
  text: 'Hello',
  model_id: 'en-es'
}

//Tone Analyser instance
tone_analyzer.tone(toneParams,(err,result)=>{
  if(err){
    return console.log(err)
  }
  const cats = result.document_tone.tone_categories;
  cats.forEach((cat)=>{
    console.log('\n'+cat.category_name)
    cat.tones.forEach((tone)=>{
      console.log("%s: %s",tone.tone_name, tone.score)
    })
  })
})
//Translator instance
language_translator.translate(translatorParams,(err,result)=>{
  if(err){
  return  console.log(err)
  }
  console.log(result)
})

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

// Start conversation with empty message.
assistant.message({
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
    assistant.message({
      workspace_id: workspace_id,
      context : response.context,
      input: { text: result.user_input }
      }, processResponse)

  })
}
