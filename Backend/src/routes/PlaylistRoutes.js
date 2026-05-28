import express from "express";
import { createPlaylist, getPlaylists, getPlaylistById, updatePlaylist, deletePlaylist } from "../controllers/PlaylistController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", authMiddleware, createPlaylist);
router.get("/", authMiddleware, getPlaylists);
router.get("/:id", authMiddleware, getPlaylistById);
router.put("/:id", authMiddleware, updatePlaylist);
router.delete("/:id", authMiddleware, deletePlaylist);

export default router;
