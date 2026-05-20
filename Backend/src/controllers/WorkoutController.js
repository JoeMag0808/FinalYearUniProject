import mongoose from "mongoose";
import WorkoutResults from "../models/WorkoutResults.js";

export const saveWorkoutResults = async (req, res) => {
  try {
      const workout = await WorkoutResults.create({
          userId: req.user.id,
          playlistId: req.body.playlistId,      
          exerciseResults: req.body.exerciseResults,
          durationSeconds: req.body.workoutDuration,       
          startTime: Date.now(),       
          endTime: Date.now(),
      });
      res.status(201).json(workout);
  } catch (error) {
      res.status(500).json({ message: "Failed to save workout" });
    }
  };

export const getWorkoutStats = async (req, res) => {
    
    const userId = new mongoose.Types.ObjectId(req.user.id);

    //Exercise rep amount for each exercise overall
    const exerciseRepTotals = await WorkoutResults.aggregate([
        { $match: { userId }},
        { $unwind: "$exerciseResults"},
        { $group: {_id: "$exerciseResults.exerciseId", totalReps: {$sum : "$exerciseResults.totalReps"}}},
        { $lookup: {from: "exercises", localField: "_id", foreignField: "_id", as: "exerciseInfo"}},
        { $project: {_id: 0, exerciseId: "$_id", exerciseName: {$arrayElemAt: ["$exerciseInfo.name", 0]}, totalReps: 1}}]);

    //Daily exercise rep amount
    const exerciseRepTotalsDaily = await WorkoutResults.aggregate([
        { $match: { userId }},
        { $unwind: "$exerciseResults"},
        { $group: {_id: { date: { $dateToString: {format: "%Y-%m-%d", date: "$startTime"}}, exerciseId: "$exerciseResults.exerciseId"}, totalReps: {$sum : "$exerciseResults.totalReps"}}},
        { $lookup: {from: "exercises", localField: "_id.exerciseId", foreignField: "_id", as: "exerciseInfo"}},
        { $project: {_id: 0, date: "$_id.date", exerciseId: "$_id", exerciseName: {$arrayElemAt: ["$exerciseInfo.name", 0]}, totalReps: 1}},
        { $sort: { date: 1 }}]);
        
    //Total workout time aggregatiion
    const workoutTimeTotal = await WorkoutResults.aggregate([
        { $match: { userId }},
        { $group: {_id: null, totalWorkoutTime: { $sum: "$durationSeconds" }}}]);
     
    const totalWorkoutTime = workoutTimeTotal[0]?.totalWorkoutTime || 0 

    const workoutTimeDaily = await WorkoutResults.aggregate([
        { $match: { userId }},
        { $group: {_id: { $dateToString: {format: "%Y-%m-%d", date: "$startTime"}}, totalDuration: { $sum: "$durationSeconds"}}}, { $sort: { _id: 1 }}]);

    //Count the amount of workout results
    const totalWorkouts = await WorkoutResults.countDocuments({ userId });

    //Average time spent on a full workoutt
    const averageWorkoutTime = totalWorkouts > 0 ? (totalWorkoutTime / totalWorkouts) : 0;

    return res.json({ exerciseRepTotals, exerciseRepTotalsDaily, totalWorkoutTime, averageWorkoutTime, workoutTimeDaily, totalWorkouts })
    };