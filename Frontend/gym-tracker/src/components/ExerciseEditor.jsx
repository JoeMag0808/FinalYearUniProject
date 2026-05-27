import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";

const ExerciseEditor = ({ editExercises, setEditExercises, editMode }) => {

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/exercises")
                
                const data = await res.json();
                setExercises(data);
            } catch (error) {
                toast.error("Failed to gather exercises", error);
            }
        };

        fetchExercises();
    }, []);

    const addExercise = () => {
        setEditExercises([...editExercises, { id: crypto.randomUUID(), exerciseId: "", sets: "3", reps: "10", rest: "60" }]);
    };

    const updateExercise = (index, field, value) => {
        const updatedExercises = editExercises.map((ex, i) =>
            i === index ? { ...ex, [field]: value } : ex
        );

        setEditExercises(updatedExercises);
    };

    const removeExercise = (index) => {
        const updatedExercises = editExercises.filter((_, i) => i !== index);
        setEditExercises(updatedExercises);
    };

    return (
        <div>
            {editExercises.length === 0 ? (
                    <p className="text-gray-400 mt-4">No exercises in this playlist. Try adding some!</p>
                ) : (
                 editExercises.map((exercise, index) => (
                <div key={exercise.id} className="border border-gray-300 p-4 mb-3 rounded-lg">
                    
                    <p className="font-semibold mb-2 text-gray-100">Exercise</p>
                    <select
                        disabled={!editMode}
                        value={exercise.exerciseId._id || exercise.exerciseId}
                        onChange={(e) => updateExercise(index,"exerciseId", e.target.value)}
                        className="border border-gray-300 p-2 rounded-md mb-3 text-gray-100 bg-zinc-800"
                        >
                            <option value="" disabled>
                            --- Select Exercise ---
                            </option>


                            {exercises.map((ex) => (
                                <option key={ex._id} value={ex._id}>
                                    {ex.name}
                                </option>
                            ))}
                    </select>
                    
                    <p className="text-gray-100">Sets:</p>
                    <input
                        type="number"
                        placeholder="Sets"
                        disabled={!editMode}
                        value={exercise.sets}
                        onChange={(e) => updateExercise(index, "sets", Math.max(0, parseInt(e.target.value)))}
                        className="border border-gray-300 p-2 mr-2 rounded w-20 text-gray-300 bg-zinc-800"
                        placeholder="Sets"
                    />
                    <p className="text-gray-100">Reps:</p>
                    <input
                        type="number"
                        placeholder="Reps"
                        disabled={!editMode}
                        value={exercise.reps}
                        onChange={(e) => updateExercise(index, "reps", Math.max(0, parseInt(e.target.value)))}
                        className="border border-gray-300 p-2 mr-2 rounded w-20 text-gray-300 bg-zinc-800"
                        placeholder="Reps"
                    />
                    <p className="text-gray-100">Rest (secs):</p>
                    <input
                        type="number"
                        placeholder="Rest (seconds)"
                        disabled={!editMode}
                        value={exercise.restSeconds}
                        onChange={(e) => updateExercise(index, "restSeconds", Math.max(0, parseInt(e.target.value)))}
                        className="border border-gray-300 p-2 mr-2 rounded w-20 text-gray-300 bg-zinc-800"
                        placeholder="Rest (sec)"
                    />

                   {editMode && (
                    <div className="flex justify-end">
                    <button onClick={() => removeExercise(index)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200">
                        Remove Exercise
                    </button>
                    </div>
                   )}
                </div>
                ))
            )}
            {editMode && (<button onClick={addExercise} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200 mt-4">+ Add Exercise</button>)}
            <br /><br />
            </div>
    )
}

export default ExerciseEditor