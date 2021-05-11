import Elections from "../classes/Elections.js";
import { ALL_ELECTIONS_YEARS } from "../constants/index.js";

/*
 * getData scrape all elections data
 * from officel sties.
 * @return  {Array<Object>}
 */
export const getData = async () => {
  const elections = await new Elections();
  await elections.setElectionList(1, 24);
  const newData = elections.ListOfElections.map((election, i) => {
    return { x: ALL_ELECTIONS_YEARS[i], y: election.data.length };
  });
  return newData;
};
