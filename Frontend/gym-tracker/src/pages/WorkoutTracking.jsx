import { useParams } from "react-router-dom";
import WorkoutTracking from "../components/PoseTracker";
import { LogicMain } from "../logic/LogicMain"
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function WorkoutTrackingPage () {
  const [playlist, setPlaylist] = useState(null);
  const [currentSet, setCurrentSet] = useState(1);
  const [reps, setReps] = useState(0);
  const [totalReps, setTotalReps] = useState({});
  const [advice, setAdvice] = useState("");
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useParams();

  //Set starting state to 0 reps and starting position (before down and up stage)
  const stateRef = useRef({ stage: "up", reps: 0});

  const startTime = useRef(Date.now());
  const hasSaved = useRef(false);

  //Fetching specifcic playlist
  useEffect(() => {
        const fetchPlaylist = async () => {
          try {
            const token = sessionStorage.getItem("token");

            const res = await fetch(`http://localhost:5001/api/playlists/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
              toast.error("Failed to fetch playlist");
          }

          const data = await res.json();

        setPlaylist(data);
      } catch (error) {
        console.error(error);
      }
    };

        fetchPlaylist();
    }, [id]);

    const handlePose = (landmarks) => {

    const item = playlist.exercises[currentIndex];
    if (!item) return;

    const exercise = item.exerciseId;
    if (!exercise) return;

    const logic = LogicMain[exercise.name?.replace(/\s/g, "")];
    if (!logic) return;

    const result = logic(landmarks, stateRef.current);

    stateRef.current = result;

    setReps(result.reps);

    setAdvice(result.advice);

    //Start rest time when current reps meet playlist reps
    if (result.reps >= item.reps) {
        startRest(item.restSeconds);
      }
    };

    //Start rest by setting rest time
    const startRest = (seconds) => {
      setIsResting(true);
      setRestTime(seconds);
    };

    useEffect(() => {
        if (!isResting) return;

        //Decrese time by 1 every second
        const timer = setTimeout(() => {
          setRestTime((t) => t - 1);
        }, 1000);

        //Once seconds reaches 0, end rest
        if (restTime <= 0) {
          endRest();
          return
        }

        //Cancel the timer once finished
        return () => clearTimeout(timer);
      }, [isResting, restTime]);

    //End rest by setting isResting to fasle
    const endRest = () => {
      setIsResting(false);

    const item = playlist.exercises[currentIndex];

    //Add a set if current sets have not met playlist sets
    if (currentSet < item.sets) {
      setCurrentSet((s) => s + 1);
    } else {
      setCurrentIndex((i) => i + 1);
      setCurrentSet(1);
    }

    //Reset to strarting state of 0 reps and starting position
    stateRef.current = {stage: null, reps: 0};

    setAdvice("");
    };

    if (!playlist) return <p>Loading Workout Playlist...</p>

    const currentItem = playlist.exercises[currentIndex];

    //Save workout data for user dashboard
    const saveWorkoutData = async () => {
      const token = sessionStorage.getItem("token");

    //Calulate workout time
      const workoutDuration = Math.floor(
        (Date.now() - startTime.current) /1000
      );

        if (hasSaved.current) return;

        hasSaved.current = true;

        await fetch("http://localhost:5001/api/workouts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            playlistId: playlist._id,
            workoutDuration,
            exerciseResults: playlist.exercises.map((ex) => ({
              exerciseId: ex.exerciseId._id,
              exerciseName: ex.exerciseId.name,
              setsCompleted: ex.sets,
              totalReps: ex.reps * ex.sets
            }))
          })
        })
      };

    //Once the current index becomes equal or greater than playlist length, save workout and show finsish message
    if (currentIndex >= playlist.exercises.length) {
      saveWorkoutData();
      return <h2 className="lg:text-8xl font-semibold font-inter text-gray-300 flex items-center justify-center h-screen">Workout Finished!</h2>
    }

    const exercise = currentItem.exerciseId;
    
  return (
      <div className="text-gray-300 font-inter">
        <h1 className="text-center lg:text-7xl gap-y-4 underline pb-10">Playlist: {playlist.name}</h1>

        <div className="fixed bottom-4 left-0 w-full flex flex-wrap justify-center">
          <div className="flex flex-row gap-12 mb-4">
        <h2 className="lg:text-5xl font-semibold">Current Exercise: {exercise.name}</h2>
      <h3 className="lg:text-5xl font-semibold"> Set: {currentSet} / {currentItem.sets}</h3>

      <h2 className="lg:text-5xl font-semibold">Reps: {reps} / {currentItem.reps}</h2>
      <p className="lg:text-5xl font-semibold">Advice: {advice}</p>
      </div>
      </div>

      {!isResting && (
        <WorkoutTracking onResults={handlePose}/>
      )}

      {isResting && (
        <div className="fixed  left-0 w-full flex flex-wrap justify-center">
          <h2 className="lg:text-5xl font-semibold">Rest: {restTime}</h2>
        </div>
      )}
      </div>
    );
  }
