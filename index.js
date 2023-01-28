const puppeteer=require('puppeteer');
const json2csv=require("json2csv").Parser;
const fs=require("fs");

(async()=>{
    const browser=await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto("https://www.reddit.com/r/node/")
    const search= await page.evaluate(()=>{
        const search_results=document.querySelectorAll("._1oQyIsiPHYt6nx7VOmd1sz._1RYN-7H8gYctjOQeL8p2Q7.scrollerItem._3Qkp11fjcAw9I9wtLo8frE._1qftyZQ2bhqP62lbPjoGAh");
        const lists=[];
        search_results.forEach(elements => {
            const votes=elements.querySelector("._23h0-EcaBUorIHC-JZyh6J  ._1E9mcoVn4MYnuBQSVDt1gC ._1rZYMD_4xY3gRcSS3p8ODO._3a2ZHWaih05DgAOtvu6cIo");
            const comments=elements.querySelector(".FHCV02u6Cp2zYL0fhQPsO");
            const question=elements.querySelector("h3");
            if(votes.innerText=='Vote')
                {
                    votes.innerText='0'
                }
            lists.push({
                vote_count:votes.innerText,
                comments_count:parseInt(comments.innerText.replace(/[^0-9\.]/g, ''), 10)
                ,question_main:question.innerText
            });
        });
        return lists;

    })
    // console.log(search);
    
    await browser.close();
    const j2cp=new json2csv();
    const csv=j2cp.parse(search);

    fs.writeFileSync("./reddit.csv",csv,"utf-8");
})()
console.log("END");