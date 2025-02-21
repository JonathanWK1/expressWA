import express from "express";
// import serverless from 'serverless-http';
// import bodyParser from "body-parser";
// import axios from "axios";
// import dotenv from "dotenv";


const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
// dotenv.config()

// app.use(bodyParser.json());

// const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
// const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
// const PHONE_NUMBER_ID= process.env.PHONE_NUMBER_ID;
// // Webhook Verification (WhatsApp requires this)
// app.get("/webhook", (req, res) => {
//   if (req.query["hub.verify_token"] === VERIFY_TOKEN) {
//     res.send(req.query["hub.challenge"]);
//   } else {
//     res.sendStatus(403);
//   }
// });

// // Handle Incoming WhatsApp Messages
// app.post("/webhook", async (req, res) => {
//   const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  
//   if (message) {
//     const from = message.from;  // Sender's phone number
//     const text = message.text?.body;  // Message content

//     console.log(`Received message: ${text} from ${from}`);
//     console.log(req.body);
//     //  Auto-reply based on message received
//     let replyText = "Sorry, I didn't understand that.";
//     if (text.toLowerCase().includes("hello")) {
//       replyText = "Hi! How can I help you?";
//     }

//     await sendMessage(from, replyText);
//   }

//   res.sendStatus(200);
// });

// app.post("/sendMessage", async (req,res) => {
//     var message = req.body.message;
//     if (message) {
//         // await sendMessage(62816996023, message);
//         console.log(req.body);
//     }
//     res.sendStatus(200);
// })

// //  Function to Send a WhatsApp Message
// async function sendMessage(to, message) {

//     await axios.post(
//         `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
//         {
//             messaging_product: "whatsapp",
//             to: to,
//             type: "text",
//             text: { body: message }
//         },
//         { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
//     );
// }

export default (req, res) => {
  return app(req, res);
};