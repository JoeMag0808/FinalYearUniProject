import { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const playlistDashboardPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [searchPlaylist, setSearchPlaylist] = useState("");
    
    const navigate = useNavigate();

    const fetchPlaylists = async () => {
        const token = sessionStorage.getItem("token");

        const res = await fetch("/api/playlists", {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await res.json();
        setPlaylists(data);
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    // Search function for playlsits
    const filteredPlaylists = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchPlaylist.toLowerCase())
    );
    
    return (
        <div className="p-5 font-inter min-h-screen">
            <h1 className="font-bold font-inter text-white text-4xl">Playlist Dashboard</h1>

            <div className="my-5">
                <input 
                    type="text" 
                    placeholder="Search Playlists..." 
                    value={searchPlaylist} 
                    onChange={(e) => setSearchPlaylist(e.target.value)} 
                    className="p-2 w-[300px] mr-2 border border-grey-300 rounded bg-zinc-900 text-white"
                /> 
                <button onClick={() => navigate("/playlists/create")} className="bg-green-500 text-white p-2 rounded-xl text-lg absolute right-4 hover:bg-green-600 transition-colors duration-200">
                    Create Playlist
                </button>
            </div>

            {filteredPlaylists.length === 0 ? (
                <p className="text-white mt-4">No playlists found. Create one to get started!</p>
            ) : (
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-xl font-semibold text-center text-gray-100">
                        <p>Playlist Name</p>
                        <p>Exercises Featured</p>
                        <p>Date Created</p>
                        <p>Updated</p>
                    </div>
                    <hr className="-mt-8 border-gray-500"/>
                {filteredPlaylists.map((playlist) => (
                    <div 
                        key={playlist._id}
                        onClick={() => navigate(`/playlists/${playlist._id}`)}
                        className="relative grid grid-cols-3 sm:grid-cols-4 gap-0 py-1 px-2 items-center text-gray-300 hover:bg-zinc-800 cursor-pointer">
                        <h3 className="text-xl font-semibold text-center text-gray-100">{playlist.name}</h3>
                        <h3 className="text-xl font-semibold text-center text-gray-100">{playlist.exercises.length}</h3>
                        <h3 className="text-xl font-semibold text-center text-gray-100">{new Date(playlist.createdAt).toLocaleDateString()}</h3>
                        <h3 className="text-xl font-semibold text-center text-gray-100">{new Date(playlist.updatedAt).toLocaleDateString()}</h3>
                    </div>
                ))}
                </div>
            )}
        </div>
)
}

export default playlistDashboardPage;