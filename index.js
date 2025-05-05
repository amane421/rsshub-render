const express = require('express');
const Parser = require('rss-parser');
const app = express();
const parser = new Parser();

const PORT = process.env.PORT || 3000;

app.get('/rss', async (req, res) => {
  const feedUrl = req.query.url;
  if (!feedUrl) return res.status(400).send('Missing ?url= parameter');

  try {
    const feed = await parser.parseURL(feedUrl);
    res.json(feed);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch RSS feed');
  }
});

app.get('/', (req, res) => {
  res.send('📰 Custom RSSHub (Lite) is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
