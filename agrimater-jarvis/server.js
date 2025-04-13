const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'https://jfolpvjnpknculrdbsrq.supabase.co'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// OpenRouter AI setup
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Jarvis API is running' });
});

// Jarvis AI endpoint
app.post("/api/jarvis", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b",
      messages: [
        { role: "system", content: "You are Jarvis, a helpful assistant for farmers." },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error("❌ Jarvis Error:", err.message);
    res.status(500).json({ error: "Failed to process request", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Jarvis API running at http://localhost:${port}`);
});