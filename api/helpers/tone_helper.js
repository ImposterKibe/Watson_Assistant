const {tone_analyzer} = require('../../config/credentials')
const tweets = require('../helpers/get_tweets')


let tweet_array = tweets.getTweets

const toneParams= {
   utterances:tweet_array
}

const get_chat_tone =()=>{
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

    console.log("Positive_score: %s",positive_sum/tweets_array.length)
    console.log("Negative_score: %s",negative_sum/tweets_array.length,'\nNeutral Count:'+neutral_count)
})
}

const get_text_tone = (obj) => {
    let response
    tone_analyzer.tone(obj, (err,data) => {
        if(err){
            console.log(err)
        }
        const cats = data.document_tone.tone_categories
        response = cats.map(cat=>{
            let catValues = {
                "categoryName": cat.category_name,
                "categories" : []
            }
            //console.log(cat.category_name)
            cat.tones.map(tone=>{    
               const toneObj = {
                   "toneName": tone.tone_name,
                   "score": tone.score
               }
             catValues.categories.push(toneObj)
            })
    
            return catValues
        })/*
        const cats = data.document_tone.tone_categories
        cats.map(cat=>{
            console.log(cat.category_name)
            cat.tones.map(tone=>{
                console.log('%s:%s',tone.tone_name,tone.score)
            })
        })
        */
    })
    console.log(response)
    return response
}

// const analyzer=()=>{
//     var lang_parameters = {
//       'text': tweet_array[i],
//       'features': {
//         'entities': {
//           'emotion': true,
//           'sentiment': true,
//           'limit': 2
//         },
//         'keywords': {
//           'emotion': true,
//           'sentiment': true,
//           'limit': 2
//         }
//       }
//     }
//     watson_lang_analyzer.analyze(lang_parameters, langData)
    
//     function langData (err,result){
//       console.log(result.entities)
//     }
//   }

module.exports= {
    get_chat_tone,
    get_text_tone
}