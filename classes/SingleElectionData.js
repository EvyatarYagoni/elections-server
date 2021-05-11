import Scraper from "./Scraper.js";

/*
 * Create scraper that take all official
 * data from official election sites
 * for Single Election event.
 */
class SingleElectionData {
  constructor() {
    this.data = [];
    this.scraper = new Scraper();
  }

  /*
   * Creating scraper that brings All data
   * from specific Election number.
   * @params  {Number}  num  Election Number
   * @return  {Array}
   */
  async getSpecificElectionData(num) {
    if (num > 0 && num < 21) {
      this.data = await this.scraper.fetchData1To20(num);
    } else {
      this.data = await this.scraper.fetchData21To24(num);
    }
    return this.data;
  }
}

export default SingleElectionData;
