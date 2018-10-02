const {twit} = require('../../config/credentials')

//Parameters
const getTweets=(tweetParams)=> {
twit.get('search/tweets',tweetParams,(err,data)=>{
  let tweet_array = []
    if(err){
      return console.log(err)
    }
    const tweets = data.statuses  
    tweets.map(tweet => {
      tweet_array.push({
        text: tweet.text,
        user: tweet.user.name
      })
    })
    return tweet_array
})}

module.exports={
    getTweets
}