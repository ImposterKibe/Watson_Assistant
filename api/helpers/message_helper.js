    require('dotenv').config()
    // We need this to build our post string
    const querystring = require('querystring');
    const https       = require('https');
    const AfricasTalking = require('africastalking')
    // Your login credentials
    const userName = process.env.AFRICAS_TALKING_USERNAME
    const apikey   = process.env.AFRICAS_TALKING_API_KEY

    
    const gateway = AfricasTalking({
        apiKey:apikey,
        username:userName
    })
    
    
    /*
    gateway.VOICE.call({callFrom: from, callTo: to})
    .then(res =>{
        results.forEach(r => {
            //console.log("status:"+ r.status + "phoneNumber:" + r.phoneNumber)
        });
    }).catch(err=>{
        //console.log("Encountered an error wile making the call:" + err)
    })
    */
    
    const makeCall=(from_,to_) =>{
        //Build postData from object
        const post_data = querystring.stringify({
            'username':userName,
            'from':from_,
            'to':to_
        })
        //Build request parameters
        const request_params = {
            host: ' voice.sandbox.africastalking.com',
            post: 443,
            path: '/call',

            method: 'POST',

            rejectUnauthorized:false,
            requestCert: true,
            agent: false,

            headers: {
                'Content-Type'     : 'application/x-www-form-urlencoded',
                'Content-Length'   : post_data.length,
                'apikey'           : apikey,
                'Accept'           : 'application/json'
            }
        }
        request = https.request(request_params,(res)=>{
            res.setEncoding('utf8')
            res.on('data', (data_chunk)=>{
                try{
                    const jsObject= JSON.parse(data_chunk)
                    console.log('call_data',data_chunk)
                    if(jsObject.errorMessage !='None'){
                        throw jsObject.errorMessage
                    }
                    const entries = jsObject.entries
                    let logStr = ""

                    //Loop through all numbers to be called
                    for(result in entries){
                        //Only status Queue means the call was sucessfully placed
                        logStr += '\nStatus: ' + entries.status,
                        logStr += ';phoneNumber : ' + entries.phoneNumber
                    }
                    console.log(logStr)
                    console.log('Call initiated')
                }
                catch(error){
                    console.log('Error: '+ error)
                }
            })
        })
        request.write(post_data)
        request.end()
    }
    const from = '+254712473957'
    const to = '+254729473917'
    //Call 
    //makeCall(from,to)

    const sendMessage= () =>{
            
    // Define the recipient numbers in a comma separated string
    // Numbers should be in international format as shown
            const to = '+254706229743'
           
            // And of course we want our recipients to know what we really do
            const message = "Hi, Have a safe journey today";
            
            // Build the post string from an object
            
            const post_data = querystring.stringify({
                'username' : userName,
                'to'       : to,
                'message'  : message
            });
            
            const post_options = {
                host   : 'api.africastalking.com',
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
        //sendMessage()

        module.exports ={
            //sendMessage,
            makeCall
        }