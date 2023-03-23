const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const subreddit = 'node';
const scrapeReddit = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.reddit.com/r/${subreddit}/`);

    let results = [];
    let count = 0;

    while (results.length < 100) {
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
            if (results.length >= 100 || count >= 100) {
                break;
            }
        }
        if (results.length >= 100 || count >= 100) {
            break;
        }
        const lastElement = elements[elements.length - 1];
        await page.evaluate((el) => el.scrollIntoView(), lastElement);
        await page.waitForTimeout(1000);
    }

    await browser.close();
    return results;
};

const saveToCsv = async (data) => {
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

(async () => {
    const results = await scrapeReddit();
    await saveToCsv(results);
    console.log('Data scraped and saved to csv!');
})();
