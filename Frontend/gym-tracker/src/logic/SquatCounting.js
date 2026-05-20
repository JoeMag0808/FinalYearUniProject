import { landmarkNames } from "../utils/LandmarkNames";
import { calculateAngle } from "../utils/AngleCalculation";

export const squatAngleLogic = (landmarks, state) => {

    if (!landmarks) {
        return state;
    };
    
    const leftHip = landmarks[landmarkNames.Left_Hip]
    const leftKnee = landmarks[landmarkNames.Left_Knee]
    const leftAnkle = landmarks[landmarkNames.Left_Ankle]

    const angle = calculateAngle(leftHip, leftKnee, leftAnkle);

    let reps= state.reps || 0;
    let stage = state.stage || "up"
    let advice = "";

    if (angle > 140) {
        advice = "Go lower";
    } else if (angle < 70) {
        advice = "Dont go too low";
    }

    if (angle < 100) {
        stage = "down";
    }
    if (angle > 160 && state.stage === "down") {
        reps += 1;
        stage = "up";
    }

    return {
        reps,
        stage,
        advice,
    };
}