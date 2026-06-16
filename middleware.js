import jwt from "jsonwebtoken";
import prisma from "./config/prisma.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.userId,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
};
