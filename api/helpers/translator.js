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
