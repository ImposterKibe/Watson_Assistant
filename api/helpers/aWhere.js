const axios = require('axios')
require('dotenv').config()

const awhereKey = process.env.AWHERE_KEY
const post_params = {
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic' + awhereKey
  }
}
const post_body = {
  grant_type:'client_credentials'
}

axios.post('https://api.awhere.com/oauth/token',post_body,post_params).then((res)=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})

