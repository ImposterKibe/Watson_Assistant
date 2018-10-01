const assistant = require('../helpers/assistant_helper')
const util = require('util');
const startChat = (req,res)=>{
    assistant.startConvo()
    const message= util.format('Success')
    res.status(200).send({message})
}
const respond = (req,res)=>{
    const text= req.swagger.params.text.value
    assistant.getResponse(text)
    const message= util.format('Success')
    res.status(200).send({message})
}
module.exports={
    startChat
}