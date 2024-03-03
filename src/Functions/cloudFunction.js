const functions = require('firebase-functions')
exports.consoleEvery1Min=functions.pubsub.shedule('*/1 * * * *').onRun((context)=>{
    console.log('Hello World from serverless application');
    return null
})
