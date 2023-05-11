// server.js
const express = require('express');
const app = express();
const { scrapeReddit, saveToCsv } = require('./redditScraper');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/scrape', async (req, res) => {
    const subreddit = req.body.subreddit;
    const num = req.body.num;
    const results = await scrapeReddit(subreddit, num);
    await saveToCsv(results, subreddit);
    res.set('Content-Disposition', `attachment; filename=${subreddit}.csv`);
    res.download(`${subreddit}.csv`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
