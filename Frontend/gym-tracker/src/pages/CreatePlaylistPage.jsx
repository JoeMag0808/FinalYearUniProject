import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ExerciseEditor from "../components/ExerciseEditor";

const CreatePlaylistPage = () => {
    const [playlistName, setPlaylistName] = useState("");
    const [exercises, setExercises] = useState([]);
    
    const navigate = useNavigate();

    const createPlaylist = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch("/api/playlists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: playlistName, exercises }),
        });

        if (res.ok) {
            toast.success("Playlist created successfully!");
            navigate("/playlists");
        } else {
            toast.error("Failed to create playlist.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-start">
            <div className="w-full max-w-2xl bg-zinc-900 p-6 mt-10 rounded-xl shadow">
            <h1 className="text-4xl font-bold mb-6 text-center text-white">Create New Playlist</h1>
            <input
                type="text"
                placeholder="Enter Playlist Name..."
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                className="border border-grey-300 rounded p-2 gap-4 mb-4 w-full bg-zinc-800 text-white"
            />
            <ExerciseEditor
                editExercises={exercises}
                setEditExercises={setExercises}
                editMode={true}
            />
            <div className="flex gap-4">
            <button onClick={() => navigate("/playlists")} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors duration-200 max-w-20">Cancel</button>
            <button onClick={createPlaylist} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200">Create Playlist</button>
            </div>
            </div>
        </div>
    );
};

export default CreatePlaylistPage;