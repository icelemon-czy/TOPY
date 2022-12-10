import express from "express";
import {getMatches, getPMatches, deleteMatch, addMatch} from "../controllers/match.js";

const router = express.Router();
router.get("/senior/",getMatches);
router.get("/parent/",getPMatches);
router.delete("/parent/",deleteMatch);
router.post("/",addMatch);
export default router;