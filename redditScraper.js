const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const scrapeReddit = async (subreddit, num) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const navigationTimeout = 60000; // Timeout duration in milliseconds

// Set the default navigation timeout
await page.setDefaultNavigationTimeout(navigationTimeout);

    await page.goto(`https://www.reddit.com/r/${subreddit}/`);

    let results = [];
    let count = 0;

    while (results.length < num) {
        const elements = await page.$$('._1oQyIsiPHYt6nx7VOmd1sz._1RYN-7H8gYctjOQeL8p2Q7.scrollerItem._3Qkp11fjcAw9I9wtLo8frE._1qftyZQ2bhqP62lbPjoGAh');
        for (const element of elements) {
            const title = await element.$eval('h3', (node) => node.innerText.trim());
            if (title) {
                let score = await element.$eval('._1rZYMD_4xY3gRcSS3p8ODO', (node) => node.innerText.trim());
                score = score === 'Vote' ? 0 : score;
                const comments = await element.$eval('.FHCV02u6Cp2zYL0fhQPsO', (node) => node.innerText.trim());
                results.push({
                    title,
                    score,
                    comments,
                });
            }
            count++;
            if (results.length >= num || count >= num) {
                break;
            }
        }
        if (results.length >= num || count >= num) {
            break;
        }
        const lastElement = elements[elements.length - 1];
        await page.evaluate((el) => el.scrollIntoView(), lastElement);
        await page.waitForTimeout(1000);
    }

    await browser.close();
    return results;
};

const saveToCsv = async (data, subreddit) => {
    const csvWriter = createCsvWriter({
        path: `${subreddit}.csv`,
        header: [
            { id: 'title', title: 'Title' },
            { id: 'score', title: 'Score' },
            { id: 'comments', title: 'Comments' },
        ],
    });
    await csvWriter.writeRecords(data);
};


module.exports = {
    scrapeReddit,
    saveToCsv,
};
