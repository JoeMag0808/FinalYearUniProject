import { landmarkNames } from "../utils/LandmarkNames";
import { calculateAngle } from "../utils/AngleCalculation";

export const bicepcurlAngleLogic = (landmarks, state) => {

    if (!landmarks) {
        return state;
    };

    const leftWrist = landmarks[landmarkNames.Left_Wrist]
    const leftElbow = landmarks[landmarkNames.Left_Elbow]
    const leftShoulder = landmarks[landmarkNames.Left_Shoulder]

    const angle = calculateAngle(leftElbow, leftWrist, leftShoulder);

    let reps = state.reps || 0;
    let stage = state.stage || "down";

    if (angle < 40) {
        stage = "up"
    };

    if (angle > 160 && state.stage === "up") {
        reps += 1;
        stage = "down"
    } 

    return {
        reps,
        stage,
    };
}