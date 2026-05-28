import express from "express";
import "dotenv/config";
import authRoutes from "./routes/AuthRoutes.js";
import playlistRoutes from "./routes/PlaylistRoutes.js";
import exerciseRoutes from "./routes/ExerciseRoutes.js";
import workoutRoutes from "./routes/WorkoutRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/workouts", workoutRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../../Frontend/gym-tracker/dist")));

app.get((req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/gym-tracker/dist/index.html"));
});