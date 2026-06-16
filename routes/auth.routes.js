import { Router } from "express";
import {
  signup,
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth/auth.controller.js";

import { isAuthenticated } from "../middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getCurrentUser);

export default router;