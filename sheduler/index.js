// const functions = require("firebase-functions");
// const firestore = require('@google-cloud/firestore')
// exports.consoleEvery1Min = functions.pubsub
//     .schedule("*/1 * * * *")
//     .onRun(async(context) => {
//     const db = new firestore()
//     const date = new Date()
//    await db.collection('time').doc(date.toISOString()).set({
//         timestamp:date.toLocaleDateString(),
//     })
//     return null;
//     });
