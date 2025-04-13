// api/jarvis.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    
    // Your logic or dummy response
    const reply = `You said: ${message}. I'm Jarvis!`;

    res.status(200).json({ reply });
  } else {
    res.status(405).json({ error: 'Only POST requests allowed' });
  }
}
