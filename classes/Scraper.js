// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality.
// Any number of plugins can be added through `puppeteer.use()`
import puppeteerExtra from "puppeteer-extra";

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteerExtra.use(StealthPlugin());

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
puppeteerExtra.use(AdblockerPlugin({ blockTrackers: true }));
//----------------------------------------------------------------------------------//
// Puppeteer Module
import puppeteer from "puppeteer";

class Scraper {
  /*
   * Scraping Specific election data using puppeteer.
   * can only bring data from 1-20 election event.
   * @param  {Number}   electionNumber   Election numnber
   * @return   {Array<String>}   AllElectionData   data from specified election number
   */
  async fetchData1To20(electionNumber) {
    // That's it, the rest is puppeteer usage as normal
    const AllElectionData = await puppeteerExtra
      .launch({ headless: true })
      .then(async (browser) => {
        const page = await browser.newPage();
        await page.setViewport({ width: 800, height: 600 });

        console.log(`scraping data...`);
        await page.goto(
          `https://m.knesset.gov.il/mk/elections/pages/electionsresults${electionNumber}.aspx`
        );
        await page.waitForTimeout(1000);

        /*
         * scrape data from officel site.
         */
        const data = await page.evaluate(() => {
          const listOfNodes = document.querySelectorAll("tr td.ResTableTD");

          const newArrOfNodes = [...listOfNodes];
          const prserToRegularArr = newArrOfNodes.map((elm) => elm.innerText);
          return prserToRegularArr;
        });

        const newData = [];
        let chunk = 4;
        let i;
        if (electionNumber == 19) i = 2;
        if (electionNumber == 20) i = 1;

        //if elections data returned null, bring me again.
        if (electionNumber != 19 && electionNumber != 20) i = 0;

        for (i; i < data.length; i += chunk) {
          let name = data[i + 3];
          newData.push(name);
        }

        await browser.close();
        return newData;
      });

    return AllElectionData;
  }

  /*
   * Scraping Specific election data using puppeteer.
   * can only bring data from 21-24 election event.
   * @param  {Number}   electionNumber   Election numnber
   * @return   {Array<String>}   AllElectionData   data from specified election number
   */
  async fetchData21To24(electionNumber) {
    const browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto(`https://votes${electionNumber}.bechirot.gov.il/`);

    // Get the "viewport" of the page, as reported by the page.
    const data = await page.evaluate(() => {
      const listOfNodes = document.querySelectorAll(
        "table.TableData tbody tr td"
      );
      const newArrOfNodes = [...listOfNodes];
      const prserToRegularArr = newArrOfNodes.map((elm) => elm.innerText);
      const data = [];
      let i,
        chunk = 4;
      for (i = 0; i < prserToRegularArr.length; i += chunk) {
        const [name, mandates, precentageVotes, totalVotes] =
          prserToRegularArr.slice(i, i + chunk);

        /*
         * if political party has not passed
         * the blocking precentage, continue.
         */
        if (mandates === "0") continue;
        data.push(name);
      }
      return data;
    });

    await browser.close();
    return data;
  }
}

export default Scraper;
