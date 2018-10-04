const util = require('util')
const tone_helper = require('../helpers/tone_helper')
const tweet_handler = require('../helpers/get_tweets')
const response_handler = require('../helpers/response_handler')

const getTone=  (req,res,err)=>{
    if(err){
        console.log(err)
    }
    const text =  req.swagger.params.text.value
    //console.log(text)
    const toneParams = {
        'tone_input':{'text':text},
        'content_type':'application/json'
    }
    const result = tone_helper.get_text_tone(toneParams)
    console.log(result)
    //const message = response_handler.pick_data(result)
    res.status(200).send({message})
}
const getTweets = (req,res)=>{
    const tweetParams= {
        q:'safaricom',
        count:2
     }
const result = tone_helper.getTweets(tweetParams)//array of tweets
//const result1= tweet_handler.getTweets(tweetParams)//array of utterances

}
module.exports={
    getTone,
    getTweets
}