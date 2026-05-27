import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ExerciseEditor from "../components/ExerciseEditor";

const PlaylistDetailsPage = () => {
    const [playlist, setPlaylist] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [editExercises, setEditExercises] = useState([]);
    
    const navigate = useNavigate();

    const { id } = useParams();

    const fetchPlaylistDetails = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            toast.error("Failed to fetch playlist details");
            return;
        }

        const data = await res.json();
        setPlaylist(data);
        setPlaylistName(data.name);
        setEditExercises(data.exercises);
    };

    useEffect(() => {
        fetchPlaylistDetails();
    }, [id]);

    
    if (!playlist) return <div>Loading...</div>;


    const updatePlaylist = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/playlists/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                name: playlistName,
                exercises: editExercises, 
            }),
        });

        const data = await res.json();
        setPlaylist(data);
        setEditMode(false);
        toast.success("Playlist updated successfully!");
    };


    const deletePlaylist = async () => {
        const token = sessionStorage.getItem("token");

        const confirmDeletion = window.confirm("Are you sure you want to delete this playlist?");
        if (!confirmDeletion) return;

        const res = await fetch(`http://localhost:5001/api/playlists/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            navigate("/playlists");
            toast.success("Playlist deleted successfully!");
        } else {
            toast.error("Failed to delete playlist");
        }
    };

    const savePlaylist = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch(`http://localhost:5001/api/playlists/${id}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    name: playlistName,
                    exercises: editExercises, 
                }),
            }
        );

        if (res.ok) {
            toast.success("Playlist updated successfully!");
            setEditMode(false);
            navigate("/playlists");
        }
    };

    return (
        <div className="flex justify-center items-start">
            <div className="w-full max-w-2xl bg-zinc-900 p-6 mt-10 rounded-xl shadow border border-white border-opacity-50">
            {editMode ? (
                <div>
                    <input 
                    value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        className="border border-grey-300 rounded p-2 gap-4 mb-4 w-full bg-[#2a2a2c] text-white"
                    />
                </div>
            ) : (
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-300">{playlist.name}</h1>
            )}
            <ExerciseEditor
                editExercises={editExercises}
                setEditExercises={setEditExercises}
                editMode={editMode}
            />
            <div className="flex gap-3 justify-center">
            <button onClick={() => {setPlaylistName(playlist.name); setEditMode(true);}} className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600 transition-colors duration-200">
                Edit Playlist
            </button>
            <button onClick={deletePlaylist} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-200">
                Delete Playlist
            </button>
            <div className="ml-auto">
            <button onClick={() => navigate(`/workout-tracking/${id}`)} className="bg-cyan-500 text-white p-2 rounded hover:bg-cyan-600 transition-colors duration-200">Start Workout</button>
            </div>
            </div>
            <div className="flex gap-6">
            {editMode && (<button onClick={savePlaylist} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-200 mt-4">Save Changes</button>)}
            </div>
            </div>
            </div>
    );
}

export default PlaylistDetailsPage;
