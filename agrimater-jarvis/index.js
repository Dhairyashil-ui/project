require("dotenv").config();
const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Ask Jarvis: ", async (userInput) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("\nJarvis:\n" + response.data.choices[0].message.content);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  } finally {
    rl.close();
  }
});
