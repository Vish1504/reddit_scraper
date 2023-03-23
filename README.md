# reddit_scraper
**Introduction**

This is a Node.js script that uses Puppeteer to scrape the top 100 (Which can be adjusted to a required number) posts from a specified subreddit on Reddit and saves the data to a CSV file.

**Dependencies**

This script requires the following dependencies to be installed:

puppeteer: A Node.js library that provides a high-level API to control headless Chrome or Chromium over the DevTools protocol.
csv-writer: A Node.js library that provides a simple API to create CSV files.

**Usage**
The script will then launch a headless Chrome browser using Puppeteer and navigate to the subreddit specified in the subreddit variable. It will then scrape the top 100 (Which can be adjusted to a required number) posts and save the data to a CSV file with the same name as the subreddit.

**Functions**
scrapeReddit : This function navigates to the subreddit and scrapes the top posts. It returns an array of objects containing the title, score, and number of comments for each post.

saveToCsv(data) : This function takes an array of objects as input and saves it to a CSV file named after the subreddit. The CSV file will have three columns: "Title", "Score", and "Comments".


**Output**
The script will output a CSV file with the following columns:

Title: The title of the post
Score: The number of votes on the post
Comments: The number of comments on the post
