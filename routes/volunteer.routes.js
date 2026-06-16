import { Router } from "express";
import { isAuthenticated } from "../middleware.js";

import {
  createVolunteerProfile,
  getMyVolunteerProfile,
  updateVolunteerProfile,
} from "../controllers/volunteers/volunteers.controller.js";

const router = Router();

router.post("/", isAuthenticated, createVolunteerProfile);
router.get("/me", isAuthenticated, getMyVolunteerProfile);
router.patch("/me", isAuthenticated, updateVolunteerProfile);

export default router;