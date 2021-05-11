import SingleElectionData from "./SingleElectionData.js";

/*
 * Hold all Elections data in
 * ListOfElections variable.
 */

class Elections {
  constructor() {
    this.ListOfElections = [];
  }

  /*
   * Goes through all the elections made during these periods
   * and for each election event brings the relevant data of
   * these election.
   *
   * @param  {Number}  startYear  intial year of the election
   * @param  {Number}  finalYear  final year of the election
   */
  async setElectionList(startYear, finalYear) {
    for (let i = startYear; i <= finalYear; i++) {
      const currentElectionData =
        await new SingleElectionData().getSpecificElectionData(i);
      if (currentElectionData == 0) i = i - 1;
      else this.ListOfElections.push({ year: i, data: currentElectionData });
    }
  }
}

export default Elections;
