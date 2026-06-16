import { Router } from "express";

import {
  getAllVolunteers,
  updateVolunteerStatus,
} from "../controllers/volunteers/volunteers.controller.js";

import {
  authorizeRoles,
  isAuthenticated,
} from "../middleware.js";

const router = Router();

router.get(
  "/volunteers",
  isAuthenticated,
  authorizeRoles("ADMIN"),
  getAllVolunteers
);

router.patch(
  "/volunteers/:id/status",
  isAuthenticated,
  authorizeRoles("ADMIN"),
  updateVolunteerStatus
);

export default router;