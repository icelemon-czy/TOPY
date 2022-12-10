import express from "express";
import {getChildren,addChild} from "../controllers/child.js";

const router = express.Router();
router.get("/",getChildren);
router.post("/",addChild);

export default router;