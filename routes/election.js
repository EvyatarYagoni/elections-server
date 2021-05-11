import express from "express";
const router = express.Router();
//import controllers
import { getData } from "../controllers/election.js";

//http://localhost:5000/election

router.get("/", getData);

export default router;
