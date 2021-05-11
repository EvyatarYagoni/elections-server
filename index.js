import express from "express";
import cors from "cors";
import router from "./routes/election.js";
import { getData } from "./helperFunctions/getData.js";

/* All elections data for All App
 *  @type   {Array}
 */
export let data;

/*
 * initializationAllElectionsData scrape All
 * elections data from officel sites.
 * scrape from first elections up to
 * last election using getData function.
 */
async function initializationAllElectionsData() {
  data = await getData();
  console.log(data);
}
initializationAllElectionsData();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/election", router);

app.get("/", (req, res) => {
  res.send("Server is UP...");
});

app.listen(PORT, () => {
  console.log(`listen to ${PORT}...`);
});
