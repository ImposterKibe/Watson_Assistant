const assistant_controller = require('../controllers/credentials_controller')
const prompt= require('prompt')
// Start conversation with empty message.
const startConvo = ()=>{
    assistant_controller.watson_assistant.message({
        workspace_id: assistant_controller.workspace_id
    }, processResponse);
}

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
      assistant_controller.watson_assistant.message({
        workspace_id: assistant_controller.workspace_id,
        context : response.context,
        input: { text: result.user_input }
        }, processResponse)
    })
  }
module.exports={
    startConvo,
    processResponse
}