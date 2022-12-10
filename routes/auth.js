import express from "express";
import {parentLogin,parentRegister,seniorLogin,seniorRegister,logout,check} from "../controllers/auth.js";

const router = express.Router();

router.post("/parent/login",parentLogin)
router.post("/parent/register",parentRegister)
router.post("/senior/login",seniorLogin)
router.post("/senior/register",seniorRegister)
router.post("/logout",logout)
router.get("/senior/check/",check)

export default router;