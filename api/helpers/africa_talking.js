require('dotenv').config()
// We need this to build our post string
const querystring = require('querystring');
const https       = require('https');
const AfricasTalking = require('africastalking')
// Your login credentials
const userName = process.env.AFRICAS_SANDBOX_USERNAME
const apikey   = process.env.AFRICAS_SANDBOX_API_KEY
const axios = require('axios')
 
const sendMessage= () =>{
    const to = '+254706229743'   
    const message = "Hi, Have a safe journey today";

    const post_data = querystring.stringify ({
        'username' : userName,
        'to'       : to,
        'message'  : message
     });

    const post_options = {      
        host   : 'api.sandbox.africastalking.com',
        path   : '/version1/messaging',
        method : 'POST',

        rejectUnauthorized : false,
        requestCert        : true,
        agent              : false,
                       
        headers: {
                           'Content-Type' : 'application/x-www-form-urlencoded',
                            'Content-Length': post_data.length,
                            'Accept': 'application/json',
                            'apikey': apikey
                        }
                    };



    const post_req = https.request(post_options, (res)=> {
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
            console.log("chunk_Output: ",chunk)
            const jsObject   = JSON.parse(chunk)
            const recipients = jsObject.SMSMessageData.Recipients
            
            if ( recipients.length > 0 ) {
                for (let i = 0; i < recipients.length; ++i ) {
                     let logStr  = 'number=' + recipients[i].number
                     logStr     += ';cost='   + recipients[i].cost
                     logStr     += ';status=' + recipients[i].status // status is either "Success" or "error message"
                     logStr     += ';statusCode=' + recipients[i].statusCode
                       console.log(logStr)
                            }
                        } else {
                            console.log('Error while sending: ' + jsObject.SMSMessageData.Message)
                    }
                })
            })
            
            // Add post parameters to the http request
            post_req.write(post_data)
            
            post_req.end()
        }
        //Call sendMessage method
        sendMessage()

        module.exports={
            sendMessage
        }