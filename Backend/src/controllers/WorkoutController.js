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

    //Calcuklate the date from a week ago
    const oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7));

    //Calculate todays date from the beginning to the end
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //Calculate tomorrows date
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    //Exercise rep amount for each exercise today
    const exerciseRepTotalsToday = await WorkoutResults.aggregate([
        { $match: { userId, startTime: { $gte: today, $lt: tomorrow }} },
        { $unwind: "$exerciseResults"},
        { $group: {_id: "$exerciseResults.exerciseId", totalReps: {$sum : "$exerciseResults.totalReps"}}},
        { $lookup: {from: "exercises", localField: "_id", foreignField: "_id", as: "exerciseInfo"}},
        { $project: {_id: 0, exerciseId: "$_id", exerciseName: {$arrayElemAt: ["$exerciseInfo.name", 0]}, totalReps: 1}}]);

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
        { $project: {_id: 0, date: "$_id.date", exerciseId: "$_id.exerciseId", exerciseName: {$arrayElemAt: ["$exerciseInfo.name", 0]}, totalReps: 1}},
        { $sort: { date: 1 }}]);

     //Exercise rep amount for each exercise per week
    const exerciseRepTotalsWeekly = await WorkoutResults.aggregate([
        { $match: { userId, startTime: { $gte: oneWeekAgo } }},
        { $unwind: "$exerciseResults"},
        { $group: {_id: "$exerciseResults.exerciseId", totalReps: {$sum : "$exerciseResults.totalReps"}}},
        { $lookup: {from: "exercises", localField: "_id", foreignField: "_id", as: "exerciseInfo"}},
        { $project: {_id: 0, exerciseId: "$_id", exerciseName: {$arrayElemAt: ["$exerciseInfo.name", 0]}, totalReps: 1}}]);
        
    //Total workout time aggregatiion
    const workoutTimeTotal = await WorkoutResults.aggregate([
        { $match: { userId }},
        { $group: {_id: null, totalWorkoutTime: { $sum: "$durationSeconds" }}}]);
     
    //Calculate total workout time
    const totalWorkoutTime = workoutTimeTotal[0]?.totalWorkoutTime || 0 

    //
    const workoutTimeDaily = await WorkoutResults.aggregate([
        { $match: { userId }},
        { $group: {_id: { $dateToString: {format: "%Y-%m-%d", date: "$startTime"}}, totalDuration: { $sum: "$durationSeconds"}}}, { $sort: { _id: 1 }}]);

    //Count overall amount of user workouts
    const totalWorkouts = await WorkoutResults.countDocuments({ userId });

    //Count the amount of workout results for today
    const totalWorkoutsForToday = await WorkoutResults.countDocuments({ 
        userId, 
        startTime: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    //Average time spent on a full workoutt
    const averageWorkoutTime = totalWorkouts > 0 ? (totalWorkoutTime / totalWorkouts) : 0;

    return res.json({ exerciseRepTotals, exerciseRepTotalsDaily, totalWorkoutTime, totalWorkouts, averageWorkoutTime, workoutTimeDaily, 
        totalWorkoutsForToday, exerciseRepTotalsWeekly, exerciseRepTotalsToday });
    };