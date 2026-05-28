import express from "express";
import { loginUser, registerUser, getUserById, updateUser, deleteUser } from "../controllers/AuthController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.put("/:id", authMiddleware, updateUser);
router.get("/:id", authMiddleware, getUserById);
router.delete("/:id", authMiddleware, deleteUser);

export default router;