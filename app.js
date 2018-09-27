'use strict';
// Audio

// Load Environment Variable
require('dotenv').config()
const Tweet = require('twit')

//Swagger server dependencies
var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};
//Watson Assistant dependencies
const prompt = require('prompt')
const AssistantV1 = require('watson-developer-cloud/assistant/v1')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
// const speechToTextV1 = require('watson-developer-cloud/text-to-speech/v1')
const language_translatorV3 = require('watson-developer-cloud/language-translator/v3')
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1')


const watson_lang_analyzer = new NaturalLanguageUnderstandingV1({
  version: '2018-03-16',
  username: process.env.LANGUAGE_UNDERSTANDER_USERNAME,
  password: process.env.LANGUAGE_UNDERSTANDER_PASSWORD,
  url:process.env.LANGUAGE_UNDERSTANDER_URL
})
/*
var lang_parameters = {
  'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
  'features': {
    'entities': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    },
    'keywords': {
      'emotion': true,
      'sentiment': true,
      'limit': 2
    }
  }
}
watson_lang_analyzer.analyze(lang_parameters, langData)

function langData (err,result){
  console.log(result.entities)
}
*/
const workspace_id = process.env.WORKSPACE_ID; // replace with workspace ID

// Set up Speech-to-Text service wrapper
/*
const speechToText= new speechToTextV1({
  username: process.env.SPEECH_USERNAME ,
  password: process.env.SPEECH_PASSWORD,
  url:process.env.SPEECH_URL
})
*/
//Watson Tone Analyzer Service wrapper
const tone_analyzer= new ToneAnalyzerV3({
  username: process.env.TONE_USERNAME, // replace with service username
  password: process.env.TONE_PASSWORD, // replace with service password
  version: 'V1',
  version_date:'2016-05-19',
  url: process.env.TONE_URL
})


//Parameters


//Twitter service wrapper
const twit = new Tweet({
  consumer_key:process.env.TWITTER_API_KEY,
  consumer_secret:process.env.TWITTER_SECRET_KEY,
  access_token:process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET
})

//tweet Search Parameters
const tweetParams ={
  q:'Safaricom airtel',
  count: 20
}
const tweet_array= []
const toneParams= {
  utterances:tweet_array
}

twit.get('search/tweets',tweetParams,(err,data)=>{
  if(err){
    return console.log(err)
  }
  const tweets = data.statuses
  for (let i = 0; i<tweets.length;i++){
    const new_tweet={
      text: tweets[i].text,
      user: tweets[i].user.name
    }
    tweet_array.push(new_tweet)
  }
   // console.log(tweets[i].text)
   let negative_sum = 0
   let positive_sum = 0
   let neutral_count= 0
    //Tone Analyser instance
    tone_analyzer.toneChat(toneParams,(err,result)=>{

      if(err){
        return console.log(err)
      }
   	const negatives=['frustrated','sad','impolite']
    const positives = ['satisfied','polite','excited','sympathetic']
    
    const cats = result.utterances_tone

    cats.forEach((cat)=>{
      //console.log('\n'+cat.utterance_text)
      cat.tones.forEach((tone)=>{
        //console.log('%s:%s',tone.tone_name,tone.score+'...tone')
          if( negatives.includes(tone.tone_id)){
          negative_sum += tone.score
          //console.log('Negative sum:'+ negative_sum)
          }else if( positives.includes(tone.tone_id)){
          positive_sum += tone.score
          //console.log('Positive sum:'+ positive_sum)
        }else{
          neutral_count++
        }
      })
    })

    console.log("Positive_score: %s",positive_sum/tweets.length)
    console.log("Negative_score: %s",negative_sum/tweets.length,'\nNeutral Count:'+neutral_count)
  })

})

//Set Up Translator service
const language_translator= new language_translatorV3({
  username: process.env.TRANSLATOR_USERNAME ,
  password: process.env.TRANSLATOR_PASSWORD,
  url:process.env.TRANSLATOR_URL,
  version: '2018-09-20'
})
/*const translatorParams= {
  text: 'Hello',
  model_id: 'en-es'
}
//Translator instance
language_translator.translate(translatorParams,(err,result)=>{
  if(err){
  return  console.log(err)
  }
  console.log(result)
})
*/
// Set up Assistant service wrapper.
const assistant = new AssistantV1({
  username: process.env.ASSISTANT_USERNAME, // replace with service username
  password: process.env.ASSISTANT_PASSWORD, // replace with service password
  version: '2018-09-18'
});


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

// Start conversation with empty message.
/*assistant.message({
  workspace_id: workspace_id
}, processResponse);
*/
// Process the Watson service response.
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
