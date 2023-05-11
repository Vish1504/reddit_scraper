# Reddit Scraper

This code is a Reddit scraper that allows users to enter a subreddit and the number of records they want to scrape. The scraper uses the Puppeteer library to scrape the subreddit's page and extract the titles, scores, and comments of the posts. The data is then saved to a CSV file using the csv-writer library.

The scraper has three files: Index.html, server.js, and redditScraper.js.

 - *Index.html* contains the HTML and CSS code for the user interface. The
   form allows users to enter the subreddit and the number of records   
   they want to scrape.
  
  - *server.js* contains the Express.js code for handling HTTP requests.    The code listens for GET requests on the root URL and responds by    sending the index.html file. It also listens for POST requests on the    /scrape URL, extracts the subreddit and the number of records from    the request, and calls the scrapeReddit function in redditScraper.js    to scrape the data. It then saves the data to a CSV file using the saveToCsv function in redditScraper.js and sends the CSV file back to    the client as a download.

- redditScraper.js contains the code for the scrapeReddit function,    which uses Puppeteer to scrape the data from the subreddit page. It    extracts the titles, scores, and comments of the posts and saves the    data to an array. If the number of records scraped is less than the    number requested by the user, it scrolls down the page and continues    scraping until it has scraped the requested number of records. Finally, it uses the csv-writer library to save the data to a CSV file.

**Installation**

To use this project, you need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine. Then, clone the repository and install the dependencies by running the following commands in your terminal:

    git clone https://github.com/Vish1504/reddit_scraper.git
    npm install

**Usage**

 1. To use the scraper, run the server by typing the following command
    in your terminal:
    
        node server.js
        
 2. Then, open your web browser and go to [http://localhost:3000](http://localhost:3000/) to access the
    scraper's interface.
    
 3. Enter the name of the subreddit you want to scrape and the number of records you want to retrieve
 
 4. click the *"Scrape"* button

 5. The results will be saved to a CSV file in the project's root directory and you can download the file by clicking the link that appears on the screen.
