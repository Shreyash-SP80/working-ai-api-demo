const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LLM Express Server is running' });
});

// Chat completion endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, model = 'gpt-3.5-turbo' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    res.json({
      success: true,
      message: response,
      usage: completion.usage,
      model: completion.model
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from LLM',
      details: error.message 
    });
  }
});

// Text completion endpoint (legacy)
app.post('/api/completion', async (req, res) => {
  try {
    const { prompt, model = 'gpt-3.5-turbo-instruct' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.completions.create({
      model: model,
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    });

    const response = completion.choices[0].text;

    res.json({
      success: true,
      completion: response,
      usage: completion.usage,
      model: completion.model
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get completion from LLM',
      details: error.message 
    });
  }
});

// Image generation endpoint
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, size = '256x256' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const image = await openai.images.generate({
      model: 'dall-e-2',
      prompt: prompt,
      size: size,
      n: 1,
    });

    res.json({
      success: true,
      imageUrl: image.data[0].url,
      prompt: prompt
    });

  } catch (error) {
    console.error('OpenAI Image API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LLM Express Server running on http://localhost:${PORT}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/chat`);
  console.log(`   POST /api/completion`);
  console.log(`   POST /api/generate-image`);
});