import express from "express";
const router = express.Router();
import { getTrafficRules } from "../controllers/getTrafficRules.controller.js";
router.get("/trafficrule", getTrafficRules);
export default router;