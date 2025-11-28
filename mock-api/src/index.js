const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/ai/generate-ideas', (req, res) => {
  const { department, budget, skills } = req.body;
  // Return a few mock idea suggestions
  const ideas = [
    { title: 'Mock Idea A', department, budget, skills, score: 0.9 },
    { title: 'Mock Idea B', department, budget: Math.max(10, (budget || 100) / 2), skills, score: 0.7 }
  ];
  res.json({ ideas });
});

app.get('/video/stub', (req, res) => {
  res.json({ url: 'https://example.com/video-stub', status: 'ok' });
});

app.listen(5001, () => console.log('Mock API running on 5001'));
