// import Elections from "../classes/Elections.js";
import { data } from "../index.js";

/*
 * return all elections data to end point/client.
 * @return  {Array}
 */
export const getData = async (req, res) => {
  res.json(data);
};
