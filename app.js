'use strict'
require('dotenv').config()
const Tweet = require('twit') //Twitter functions library
const SwaggerExpress = require('swagger-express-mw');//Import Swagger server dependences
const app = require('express')();


module.exports = app; // for testing
var config = {
  appRoot: __dirname // required config
};

// const speechToTextV1 = require('watson-developer-cloud/text-to-speech/v1')

/*
let tweet_array= []
twit.get('search/tweets',tweetParams,(err,data)=>{
  if(err){
    return console.log(err)
  }
  const tweets = data.statuses
  // for (let i = 0; i<tweets.length;i++){
  
  //   tweet_array.push({
  //     text: tweets[i].text,
  //     user: tweets[i].user.name
  //   })
  // }

  tweets.map(tweet => {
    tweet_array.push({
      text: tweet.text,
      user: tweet.user.name
    })
  })
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
/*
tweet_array.forEach(tweet=>{
  var lang_parameters = {
    'text': tweet_array[i],
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
})
*/
//Parameters
const tweetParams ={
  q:'Safaricom airtel',
  count: 20
}
// const toneParams= {
//   utterances:tweet_array
// }





/*
const translatorParams= {
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

