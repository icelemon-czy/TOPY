import express from "express";
import {getTimeSlots,addTimeSlot,getPC,getP,getC,getPick,addTimeSlotParent,deleteTimeSlotParent} from "../controllers/timeslot.js";

const router = express.Router();
router.get("/",getTimeSlots);
router.post("/",addTimeSlot);
router.post("/parent/",addTimeSlotParent);
router.delete("/parent/",deleteTimeSlotParent);
router.get("/pet/",getP);
router.get("/child/",getC);
router.get("/petchild/",getPC);
router.get("/pick/",getPick);

export default router;