import Exercise from "../models/Exercise.js";

export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();

        res.json(exercises);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get exercises",
        });
    }
};

//Create new exercise (admin only)
export const createExercise = async (req, res) => {
    const exercise = await Exercise.create(req.body);
    res.json(exercise);
}