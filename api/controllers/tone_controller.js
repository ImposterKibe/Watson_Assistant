const tone_helper = require('../helpers/tone_helper')

const getTone= (req,res,err)=>{
    if(err){
        console.log(err)
    }
    const text = req.swagger.params.text.value
    //console.log(text)
    const toneParams = {
        'tone_input':{'text':text},
        'content_type':'application/json'
    }
    const result = tone_helper.get_text_tone(toneParams) 

    res.status(200).send({result})
}
const getTweets = (req,res)=>{
    
}
module.exports={
    getTone,
    getTweets
}