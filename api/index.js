import express from "express";
import serverless from 'serverless-http';
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";


const app = express();
dotenv.config()
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/test', (req, res) => {
  const a = req.query.a;

  if (a) {
    res.send(`Hello World! Test. Value of a: ${a}`);
  } else {
    res.send('Hello World! Test.  No "a" parameter provided.');
  }
})

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PHONE_NUMBER_ID= process.env.PHONE_NUMBER_ID;
// Webhook Verification (WhatsApp requires this)
app.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === VERIFY_TOKEN) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(403);
  }
});

// Handle Incoming WhatsApp Messages
app.post("/webhook", async (req, res) => {
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  
  if (message) {
    const from = message.from;  // Sender's phone number
    const text = message.text?.body;  // Message content

    console.log(`Received message: ${text} from ${from}`);
    console.log(JSON.stringify(req.body, null, 2));
    //  Auto-reply based on message received
    let replyText = "Sorry, I didn't understand that.";
    if (text.toLowerCase().includes("hello")) {
      replyText = "Hi! How can I help you?";
    }

    await sendMessage(from, replyText);
  }

  res.sendStatus(200);
});

app.post("/sendMessage", async (req,res) => {
    var message = req.body.message;
    if (message) {
        await sendMessage(62816996023, message);
        console.log(JSON.stringify(req.body, null, 2));
    }
    res.sendStatus(200);
})

//  Function to Send a WhatsApp Message
async function sendMessage(to, message) {

    await axios.post(
        `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
        {
            messaging_product: "whatsapp",
            to: to,
            type: "text",
            text: { body: message }
        },
        { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
    );
}

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default (req, res) => {
  // Log original URL for debugging
  console.log("Original req.url:", req.url);
  
  // Remove '/api' prefix if present
  if (req.url.startsWith("/api")) {
    req.url = req.url.replace(/^\/api/, "") || "/";
  }
  
  console.log("Modified req.url:", req.url);
  return app(req, res);
};