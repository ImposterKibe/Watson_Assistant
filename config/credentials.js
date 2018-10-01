    require('dotenv').config()

    const Tweet = require('twit')
    const AssistantV1 = require('watson-developer-cloud/assistant/v1') //Import Watson Assistant dependencies
    const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3') //Import Watson Tone Analyzer
    const language_translatorV3 = require('watson-developer-cloud/language-translator/v3') //Import Watson Language Translator
    const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1') //Import Watson Lang Analyser
    const speechToTextV1 = require('watson-developer-cloud/speech-to-text/v1')

    // Set up Speech-to-Text service wrapper
    const speechToText= new speechToTextV1({
        username: process.env.SPEECH_USERNAME ,
        password: process.env.SPEECH_PASSWORD,
        url:process.env.SPEECH_URL
    })

    

    //Set Up Translator service
    const language_translator= new language_translatorV3({
        username: process.env.TRANSLATOR_USERNAME ,
        password: process.env.TRANSLATOR_PASSWORD,
        url:process.env.TRANSLATOR_URL,
        version: '2018-09-20'
    })

    // Set up Assistant service wrapper.
    const assistant = new AssistantV1({
        username: process.env.ASSISTANT_USERNAME, // replace with service username
        password: process.env.ASSISTANT_PASSWORD, // replace with service password
        version: '2018-09-18'

    })
    const workspace_id = process.env.WORKSPACE_ID

    //Watson Natural Language Understander service wrapper
    const watson_lang_analyzer = new NaturalLanguageUnderstandingV1({
        version: '2018-03-16',
        username: process.env.LANGUAGE_UNDERSTANDER_USERNAME,
        password: process.env.LANGUAGE_UNDERSTANDER_PASSWORD,
        url:process.env.LANGUAGE_UNDERSTANDER_URL
    })

    //Twitter service wrapper
    const twit = new Tweet({
        consumer_key:process.env.TWITTER_API_KEY,
        consumer_secret:process.env.TWITTER_SECRET_KEY,
        access_token:process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET
    })

    //Watson Tone Analyzer Service wrapper
    const tone_analyzer= new ToneAnalyzerV3({
        username: process.env.TONE_USERNAME, // replace with service username
        password: process.env.TONE_PASSWORD, // replace with service password
        version: 'V1',
        version_date:'2016-05-19',
        url: process.env.TONE_URL
    })  

    module.exports={
        twit,
        tone_analyzer,
        language_translator,
        watson_lang_analyzer,
        watson_assistant:assistant,
        speechToText,
        workspace_id
    }